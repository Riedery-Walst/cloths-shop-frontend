<template>
  <header class="header">
    <div class="logo">FIREWALK</div>
    <input type="text" placeholder="Поиск" class="search-bar" />
    <div class="icons">
      <!-- Иконка корзины -->
      <img src="@/assets/icons/shopping-cart.svg" alt="Cart" class="icon" />

      <!-- Иконка профиля с обработчиком клика для перехода на страницу входа -->
      <img src="@/assets/icons/profile.svg" alt="Profile" class="icon" @click="goToLogin" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  methods: {
    goToLogin() {
      this.$router.push('/login'); // Переход на страницу входа
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 1rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.search-bar {
  flex: 1;
  padding: 0.5rem;
  margin: 0 1rem;
}

.icons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
