<template>
  <header class="header">
    <div class="logo" @click="goToHome">Softsands</div>
    <div class="icons">
      <span @click="handleProfileClick" class="profile-link">Профиль</span>
      <img src="../assets/icons/profile.svg" alt="Profile" class="icon" @click="handleProfileClick" />
      <span @click="goToCart" class="cart">Корзина</span>
      <img src="../assets/icons/cart.svg" alt="Cart" class="icon" @click="goToCart" />
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
        this.$router.push('/profile');
      } else {
        this.$router.push('/login');
      }
    },
    goToCart() {
      this.$router.push('/cart'); // Переход на страницу корзины
    },
    goToHome() {
      this.$router.push('/'); // Переход на главную страницу при клике на логотип
    }
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
  cursor: pointer;
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
