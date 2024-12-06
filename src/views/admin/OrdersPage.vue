<template>
  <div class="orders-page">
    <Sidebar />
    <div class="main-content">
      <h2>Заказы</h2>
      <OrdersTable :orders="orders" />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/admin/AdminSidebar.vue';
import OrdersTable from '@/components/admin/OrdersTable.vue';
import { fetchColors, fetchSizes, fetchProductName } from '@/services/productOptionsService'; // Импортируем функции для получения цветов, размеров и продуктов
import axios from '@axios';

export default {
  components: {
    Sidebar,
    OrdersTable,
  },
  data() {
    return {
      orders: [], // Массив для хранения заказов
      colors: [], // Массив для хранения цветов
      sizes: [],  // Массив для хранения размеров
      products: [] // Массив для хранения названий продуктов
    };
  },
  methods: {
    async loadOrders() {
      try {
        // Загружаем список цветов, размеров и заказов
        const [colorsResponse, sizesResponse, ordersResponse] = await Promise.all([
          fetchColors(),
          fetchSizes(),
          axios.get('/admin/orders', {
            params: {
              page: 0,
              size: 100, // Загружаем максимум заказов
            },
          }),
        ]);

        // Сохраняем данные о цветах и размерах
        this.colors = colorsResponse;
        this.sizes = sizesResponse;

        // Получаем уникальные ID продуктов из всех заказов
        const productIds = ordersResponse.data.content.flatMap(order =>
            order.items.map(item => item.productId)
        );

        // Убираем дубли, если один и тот же продукт встречается в разных заказах
        const uniqueProductIds = [...new Set(productIds)];

        // Получаем имена продуктов параллельно для всех уникальных продуктов
        const productNames = await Promise.all(uniqueProductIds.map(id => fetchProductName(id)));

        // Создаем отображение ID -> имя продукта для быстрого поиска
        const productNameMap = uniqueProductIds.reduce((map, id, index) => {
          map[id] = productNames[index];
          return map;
        }, {});

        // Преобразуем данные заказов с добавлением имен продуктов
        this.orders = ordersResponse.data.content.map(order => ({
          id: order.id,
          items: order.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            colorName: this.getColorName(item.colorId), // Получаем имя цвета
            sizeName: this.getSizeName(item.sizeId),    // Получаем имя размера
            productName: productNameMap[item.productId] || 'Неизвестный продукт' // Используем отображение имен
          })),
          product: order.items.map(item => `ID: ${item.productId}`).join(', '),
          size: order.items.map(item => item.sizeId).join(', '),
          quantity: order.items.reduce((sum, item) => sum + item.quantity, 0),
          color: order.items.map(item => item.colorId).join(', '),
          user: {
            name: `${order.owner.firstName} ${order.owner.lastName}`,
            email: order.owner.email,
            phone: order.owner.phone || 'Не указано',
          },
          totalPrice: order.totalPrice,
          createdDate: order.createdDate,
          status: order.status,
        }));
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    },

    // Метод для получения имени цвета по его ID
    getColorName(colorId) {
      const color = this.colors.find(c => c.id === colorId);
      return color ? color.name : 'Неизвестный цвет';
    },

    // Метод для получения имени размера по его ID
    getSizeName(sizeId) {
      const size = this.sizes.find(s => s.id === sizeId);
      return size ? size.name : 'Неизвестный размер';
    },
  },
  mounted() {
    this.loadOrders();
  },
};
</script>

<style scoped>
.main-content {
  flex: 1;
  padding: 20px;
}
</style>
