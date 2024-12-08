<template>
  <header class="header">
    <div class="container">
      <div class="line"></div>
      <div class="logo" @click="goToHome">ArtShaped</div>
      <div class="icons">
        <!-- Иконка и текст для профиля -->
        <div class="icon-container" @click="handleProfileClick">
          <svg class="icon" id="profile-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 5H7L10 22H26" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 16.6665H25.59C25.7056 16.6666 25.8177 16.6266 25.9072 16.5533C25.9966 16.48 26.0579 16.378 26.0806 16.2646L27.8806 7.26463C27.8951 7.19206 27.8934 7.11717 27.8755 7.04536C27.8575 6.97355 27.8239 6.90662 27.7769 6.8494C27.73 6.79218 27.6709 6.74609 27.604 6.71446C27.5371 6.68283 27.464 6.66645 27.39 6.6665H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="profile-link">Профиль</span>
        </div>

        <!-- Иконка и текст для корзины -->
        <div class="icon-container" @click="goToCart">
          <svg class="icon" id="cart-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 27V24.3333C24 22.9188 23.5224 21.5623 22.6722 20.5621C21.8221 19.5619 20.669 19 19.4667 19H11.5333C10.331 19 9.17795 19.5619 8.32778 20.5621C7.47762 21.5623 7 22.9188 7 24.3333V27" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.5 14C18.9853 14 21 11.9853 21 9.5C21 7.01472 18.9853 5 16.5 5C14.0147 5 12 7.01472 12 9.5C12 11.9853 14.0147 14 16.5 14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="cart">Корзина</span>
        </div>
      </div>
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
  justify-content: flex-start; /* Изменено на flex-start, чтобы элементы не растягивались */
  align-items: center;
  padding: 40px 0 10px;
  position: relative;
  width: 100%;
}

/* Контейнер для хедера с отступами */
.container {
  width: 100%; /* Растягиваем контейнер на всю ширину */
  max-width: 100%; /* Максимальная ширина - 100% */
  padding-left: 135px; /* Отступ слева */
  padding-right: 135px; /* Отступ справа */
  display: flex;
  justify-content: space-between; /* Разделяем логотип и иконки */
  align-items: center;
}

/* Логотип */
.logo {
  font-size: 24px;
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

/* Контейнер для иконки и текста */
.icon-container {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: color 0.3s ease; /* Плавный переход для текста и иконки */
}

/* Иконки */
.icon {
  width: 32px;
  height: 32px;
  stroke: currentColor; /* Использование цвета текста для иконки */
  transition: stroke 0.3s ease; /* Плавное изменение цвета иконки */
}

/* Ссылка на профиль и корзину */
.profile-link,
.cart {
  font-size: 16px;
  color: #000000;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease; /* Плавный переход цвета */
}

/* Изменение цвета при наведении на контейнер */
.icon-container:hover {
  color: #DB4444; /* Цвет текста и иконки при наведении */
}

.icon-container:hover .icon {
  stroke: #DB4444; /* Меняем цвет иконки при наведении */
}

.icon-container:hover .profile-link,
.icon-container:hover .cart {
  color: #DB4444; /* Меняем цвет текста при наведении */
}
</style>
