<template>
  <nav class="sidebar">
    <ul>
      <li><router-link to="/orders">Заказы</router-link></li>
      <li><router-link to="/products">Продукты</router-link></li>
      <li><router-link to="/colors">Цвет</router-link></li>
      <li><router-link to="/sizes">Размеры</router-link></li>
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
