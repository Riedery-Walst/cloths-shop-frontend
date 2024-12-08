<template>
  <header class="header">
    <div class="line"></div>
    <div class="logo" @click="goToHome">ArtShaped</div>
    <div class="icons">
      <!-- Иконка и текст для профиля -->
      <img src="../assets/icons/profile.svg" alt="Profile" class="icon" @click="handleProfileClick" />
      <span @click="handleProfileClick" class="profile-link">Профиль</span>
      <!-- Иконка и текст для корзины -->
      <img src="../assets/icons/cart.svg" alt="Cart" class="icon" @click="goToCart" />
      <span @click="goToCart" class="cart">Корзина</span>
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
      this.$router.push('/cart');
    },
    goToHome() {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
/* Линия */
.line {
  position: absolute;
  bottom: -1px; /* Линия ниже контейнера */
  left: 0;
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.3); /* Прозрачность */
}

/* Основной контейнер */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0 10px;
  position: relative;
}

/* Логотип */
.logo {
  font-size: 20px;
  font-weight: bold; /* Делаем текст жирным */
  color: #000000; /* Цвет текста черный */
  cursor: pointer;
  margin: 0;
}

/* Контейнер для иконок и текста */
.icons {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: 0; /* Убираем отступ от правого края */
}

/* Ссылка на профиль */
.profile-link {
  font-size: 16px;
  color: #000000;
  cursor: pointer;
  margin-left: -6px; /* Уменьшаем отступ с правой стороны */
}

/* Иконки */
.icon {
  width: 32px;
  height: 32px;
  cursor: pointer;
}

/* Активное состояние для корзины */
.cart {
  font-size: 16px;
  color: #000000;
  cursor: pointer;
}

/* Цвет при наведении */
.cart:hover, .profile-link:hover {
  color: #DB4444;
}
</style>
