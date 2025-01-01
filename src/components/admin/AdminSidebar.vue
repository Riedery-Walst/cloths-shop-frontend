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
/* Общие стили для боковой панели */
.sidebar {
  width: 100px;
  margin-right: 100px;
  height: 100vh; /* Высота на всю страницу */
  background-color: #ffffff; /* Темный фон */
  display: flex;
  flex-direction: column;
}

/* Стили списка */
.sidebar ul {
  list-style: none; /* Убираем маркеры списка */
  padding: 0; /* Убираем внутренние отступы */
  margin: 0; /* Убираем внешние отступы */
  display: flex;
  flex-direction: column; /* Вертикальный список */
  gap: 15px; /* Расстояние между элементами */
}

/* Стили для ссылок */
.sidebar-link {
  color: #000000; /* Белый цвет текста */
  text-decoration: none;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s; /* Плавный переход для эффекта наведения */
}

/* Эффекты при наведении */
.sidebar-link:hover {
  color: #E07575; /* Светлый цвет текста */
}

/* Стили для активной ссылки */
.router-link-active {
  color: #DB4444; /* Белый текст */
  font-weight: bold; /* Жирный текст для акцента */
}

/* Адаптивность */
@media (max-width: 768px) {
  .sidebar {
    width: 200px; /* Уменьшаем ширину на мобильных */
    padding: 15px;
  }

  .sidebar-link {
    font-size: 14px; /* Уменьшаем размер текста */
    padding: 8px 12px;
  }
}
</style>
