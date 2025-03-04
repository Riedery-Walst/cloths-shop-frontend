<template>
  <nav class="sidebar">
    <ul>
      <li><router-link to="/admin/orders" class="sidebar-link">Заказы</router-link></li>
      <li><router-link to="/admin/products" class="sidebar-link">Продукты</router-link></li>
      <li><router-link to="/admin/colors" class="sidebar-link">Цвет</router-link></li>
      <li><router-link to="/admin/sizes" class="sidebar-link">Размеры</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style scoped>
.sidebar ul {
  list-style: none;
  padding: 0 100px 0 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sidebar-link {
  color: #000000;
  text-decoration: none;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
}

.sidebar-link:hover {
  color: #E07575;
}

.router-link-active {
  color: #DB4444;
  font-weight: bold;
}


@media (max-width: 768px) {
  .sidebar {
    width: 200px;
    padding: 15px;
  }

  .sidebar-link {
    font-size: 14px;
    padding: 8px 12px;
  }
}
</style>
