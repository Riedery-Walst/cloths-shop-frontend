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
import axios from '@axios';

export default {
  components: {
    Sidebar,
    OrdersTable,
  },
  data() {
    return {
      orders: [], // Преобразованные данные заказов
    };
  },
  methods: {
    async loadOrders() {
      try {
        const response = await axios.get('/admin/orders', {
          params: {
              page: 0,
            size: 100, // Загружаем максимум заказов
          },
        });
        this.orders = response.data.content.map(order => ({
          id: order.id,
          items: order.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
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
        console.error('Ошибка загрузки заказов:', error);
      }
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
