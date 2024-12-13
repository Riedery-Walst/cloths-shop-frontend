<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Столбец 1: Название магазина -->
      <div class="footer-column">
        <span class="footer-logo">ArtShaped</span>
      </div>

      <!-- Столбец 2: Поддержка -->
      <div class="footer-column">
        <p class="footer-title">Поддержка</p>
        <a href="mailto:artshaped@gmail.com">artshaped@gmail.com</a>
        <a href="tel:+79961045721">+7 (996) 104-57-21</a>
      </div>

      <!-- Столбец 3: Аккаунт -->
      <div class="footer-column">
        <p class="footer-title">Аккаунт</p>
        <a href="/profile">Мой профиль</a>
        <a href="/login">Вход / Регистрация</a>
        <a href="/cart">Корзина</a>
      </div>

      <!-- Столбец 4: Быстрые ссылки -->
      <div class="footer-column">
        <p class="footer-title">Быстрые ссылки</p>
        <a href="/privacy-policy">Политика конфиденциальности</a>
        <a href="/terms-of-service">Условия использования</a>
        <a href="/faq">FAQ</a>
      </div>
    </div>

    <!-- Линия, разделяющая содержимое футера и авторские права -->
    <div class="footer-line"></div>

    <!-- Авторские права -->
    <div class="footer-copyright">
      <p>© Авторские права ArtShaped 2022. Все права защищены.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
/* Основной контейнер футера */
.footer {
  background-color: #000; /* Черный фон */
  color: #fff;
  margin-top: 140px/* Белые буквы */
}

/* Контейнер для содержимого */
.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 80px 135px 40px 135px;
}

/* Общие стили для столбцов */
.footer-column {
  flex: 1;
  min-width: 200px;
}

/* Название магазина */
.footer-logo {
  font-weight: bold;
  font-size: 24px;
}

/* Заголовки в столбцах */
.footer-title {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 24px;
  margin-top: 0;
}

/* Ссылки */
.footer-column a {
  display: block;
  color: #fff;
  text-decoration: none;
  margin-bottom: 16px; /* Отступ 16px между ссылками */
}

.footer-column a:hover {
  color: #E07575;
}

/* Линия, разделяющая содержимое футера и авторские права */
.footer-line {
  width: 100%;
  height: 1px; /* Толщина линии */
  background-color: rgba(255, 255, 255, 0.4); /* Белая линия с 40% прозрачностью */
  margin: 40px auto 0; /* Отступ сверху и центрирование по горизонтали */
  opacity: 0.4; /* Прозрачность линии */
}

/* Авторские права */
.footer-copyright {
  opacity: 40%;
  text-align: center;
  font-size: 12px;
  color: #ffffff;
  padding-top: 16px;
  padding-bottom: 24px;
}

.footer-copyright p {
  margin: 0;
}
</style>
