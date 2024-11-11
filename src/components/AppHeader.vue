<template>
  <header class="header">
    <div class="logo">Softsands</div>
    <div class="icons">
      <!-- Профиль с проверкой на авторизацию -->
      <span @click="handleProfileClick" class="profile-link">Профиль</span>
      <img src="@/assets/icons/shopping-cart.svg" alt="Cart" class="icon" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  methods: {
    handleProfileClick() {
      const isLoggedIn = localStorage.getItem('authToken');
      if (isLoggedIn) {
        this.$router.push('/account');
      } else {
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff8269;
}

.icons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-link {
  cursor: pointer;
  font-size: 1rem;
  color: #4f4f4f;
}

.icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
