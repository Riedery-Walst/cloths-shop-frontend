<template>
  <table class="orders-table">
    <thead>
    <tr>
      <th>ID</th>
      <th>Имя клиента</th>
      <th>Электронная почта</th>
      <th>Телефон</th>
      <th>Заказанные товары</th>
      <th>Размеры</th>
      <th>Цвета</th>
      <th>Количество</th>
      <th>Сумма</th>
      <th>Статус</th>
      <th>Дата заказа</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="order in orders" :key="order.id">
      <td>{{ order.id }}</td>
      <td>{{ order.user.name }}</td>
      <td>{{ order.user.email }}</td>
      <td>{{ order.user.phone }}</td>
      <td>{{ order.product }}</td>
      <td>{{ order.size }}</td>
      <td>{{ order.color }}</td>
      <td>{{ order.quantity }}</td>
      <td>{{ order.totalPrice }} ₽</td>
      <td>{{ order.status }}</td>
      <td>{{ order.createdDate }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.orders-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: auto;
}

.orders-table th,
.orders-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.orders-table th {
  background-color: #f4f4f4;
}

.orders-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.orders-table tr:hover {
  background-color: #f1f1f1;
}
</style>
