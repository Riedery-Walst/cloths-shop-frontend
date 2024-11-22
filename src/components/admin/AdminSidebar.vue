<template>
  <nav class="sidebar">
    <ul>
      <li><router-link to="/admin/orders">Заказы</router-link></li>
      <li><router-link to="/admin/products">Продукты</router-link></li>
      <li><router-link to="/admin/colors">Цвет</router-link></li>
      <li><router-link to="/admin/sizes">Размеры</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Sidebar'
};
</script>

<style scoped>
/* Add sidebar styles */
</style>
