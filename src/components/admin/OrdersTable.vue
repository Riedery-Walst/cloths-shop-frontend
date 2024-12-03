<template>
  <div class="orders-table">
    <!-- Фильтры -->
    <div class="filters">
      <input
          type="text"
          v-model="filters.search"
          placeholder="Поиск по продукту или пользователю"
      />
      <select v-model="pageSize" @change="handlePageSizeChange">
        <option value="5">5 строк</option>
        <option value="10">10 строк</option>
        <option value="25">25 строк</option>
        <option value="50">50 строк</option>
      </select>
    </div>

    <!-- Таблица заказов -->
    <table>
      <thead>
      <tr>
        <th @click="sort('id')">#</th>
        <th>Продукты</th>
        <th>Общее количество</th>
        <th>Цвет</th>
        <th>Пользователь</th>
        <th>Email</th>
        <th>Телефон</th>
        <th>Цена</th>
        <th>Статус</th>
        <th>Дата</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in paginatedOrders" :key="order.id">
        <td>{{ order.id }}</td>
        <td>
          <ul>
            <li v-for="item in order.items" :key="item.productId">
              ID: {{ item.productId }} ({{ item.quantity }} шт.)
            </li>
          </ul>
        </td>
        <td>{{ order.quantity }}</td>
        <td>{{ order.color }}</td>
        <td>{{ order.user.name }}</td>
        <td>{{ order.user.email }}</td>
        <td>{{ order.user.phone }}</td>
        <td>{{ order.totalPrice }}</td>
        <td>{{ order.status }}</td>
        <td>{{ new Date(order.createdDate).toLocaleDateString() }}</td>
      </tr>
      </tbody>
    </table>

    <!-- Пагинация -->
    <div class="pagination">
      <button
          :disabled="currentPage === 1"
          @click="currentPage--"
      >
        Назад
      </button>
      <span>Страница {{ currentPage }} из {{ totalPages }}</span>
      <button
          :disabled="currentPage === totalPages"
          @click="currentPage++"
      >
        Вперед
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrdersTable",
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      filters: {
        search: "",
      },
      sortField: null,
      sortDirection: 1, // 1 = ASC, -1 = DESC
    };
  },
  computed: {
    filteredOrders() {
      const search = this.filters.search.toLowerCase();
      return this.orders.filter(
          (order) =>
              order.product.toLowerCase().includes(search) ||
              order.user.name.toLowerCase().includes(search)
      );
    },
    sortedOrders() {
      if (!this.sortField) return this.filteredOrders;
      return [...this.filteredOrders].sort((a, b) => {
        const aValue = this.getFieldValue(a, this.sortField);
        const bValue = this.getFieldValue(b, this.sortField);
        if (aValue < bValue) return -1 * this.sortDirection;
        if (aValue > bValue) return this.sortDirection;
        return 0;
      });
    },
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.sortedOrders.slice(start, start + this.pageSize);
    },
    totalPages() {
      return Math.ceil(this.sortedOrders.length / this.pageSize);
    },
  },
  methods: {
    handlePageSizeChange() {
      this.currentPage = 1; // Сбрасываем на первую страницу при изменении размера
    },
    viewOrderDetails(orderId) {
      console.log(`Детали заказа ${orderId}`);
    },
    sort(field) {
      if (this.sortField === field) {
        this.sortDirection *= -1; // Меняем направление сортировки
      } else {
        this.sortField = field;
        this.sortDirection = 1; // Устанавливаем сортировку по возрастанию
      }
    },
    getFieldValue(object, field) {
      return field.split(".").reduce((acc, key) => acc[key], object);
    },
  },
};
</script>

<style scoped>
.orders-table {
  width: 100%;
}
.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.filters input {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 70%;
}
.filters select {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
button {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
