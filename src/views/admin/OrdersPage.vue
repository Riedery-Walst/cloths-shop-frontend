<template>
  <div class="orders-page container">
    <Sidebar />
    <div class="main-content">
      <!-- Панель управления пагинацией и выбором количества заказов на странице -->
      <div class="pagination-controls">
        <label for="pageSize">Показывать заказов на странице:</label>
        <select id="pageSize" v-model="pageSize" @change="savePageSize">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>

        <div class="pagination">
          <button @click="loadOrders('prev')" :disabled="pageNumber === 0">Назад</button>
          <span>Страница {{ pageNumber + 1 }} из {{ totalPages }}</span>
          <button @click="loadOrders('next')" :disabled="pageNumber === totalPages - 1">Вперед</button>
        </div>
      </div>

      <!-- Таблица с заказами -->
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
      pageSize: localStorage.getItem('pageSize') || 25, // Загружаем значение из localStorage или 25 по умолчанию
      pageNumber: 0, // Начальная страница
      totalPages: 1, // Количество страниц
    };
  },
  methods: {
    async loadOrders(direction = '') {
      try {
        // Изменяем страницу в зависимости от действия пользователя
        if (direction === 'next') {
          if (this.pageNumber < this.totalPages - 1) {
            this.pageNumber++;
          }
        } else if (direction === 'prev') {
          if (this.pageNumber > 0) {
            this.pageNumber--;
          }
        }

        // Загружаем список цветов, размеров и заказов
        const [colorsResponse, sizesResponse, ordersResponse] = await Promise.all([
          fetchColors(),
          fetchSizes(),
          axios.get('/admin/orders', {
            params: {
              page: this.pageNumber,
              size: this.pageSize,
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

        // Преобразуем данные заказов с добавлением имен продуктов, цветов и размеров
        this.orders = ordersResponse.data.content.map(order => ({
          id: order.id,
          items: order.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            colorName: this.getColorName(item.colorId), // Получаем имя цвета
            sizeName: this.getSizeName(item.sizeId),    // Получаем имя размера
            productName: productNameMap[item.productId] || 'Неизвестный продукт' // Используем отображение имен
          })),
          product: order.items.map(item => productNameMap[item.productId] || 'Неизвестный продукт').join(', '),
          size: order.items.map(item => this.getSizeName(item.sizeId)).join(', '),
          quantity: order.items.reduce((sum, item) => sum + item.quantity, 0),
          color: order.items.map(item => this.getColorName(item.colorId)).join(', '),
          user: {
            name: `${order.owner.firstName} ${order.owner.lastName}`,
            email: order.owner.email,
            phone: order.owner.phone || 'Не указано',
            address: `${order.owner.address.street}, ${order.owner.address.city}, ${order.owner.address.country}, ${order.owner.address.postalCode}` // Добавляем адрес
          },
          totalPrice: order.totalPrice,
          createdDate: this.formatDate(order.createdDate), // Форматируем дату
          status: order.status,
        }));

        // Рассчитываем количество страниц
        this.totalPages = Math.ceil(ordersResponse.data.totalElements / this.pageSize);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    },

    // Метод для сохранения выбранного размера страницы в localStorage
    savePageSize() {
      localStorage.setItem('pageSize', this.pageSize);
      this.loadOrders(); // Перезагружаем данные после изменения количества заказов на странице
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

    // Метод для форматирования даты
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    },
  },
  mounted() {
    this.loadOrders();
  },
};
</script>

<style scoped>
.pagination-controls {
  margin-bottom: 20px;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 10px;
  cursor: pointer;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
