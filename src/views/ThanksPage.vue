<template>
  <div class="thanks-page">
    <AppHeader />
    <div class="thanks-content">
      <!-- Основной текст -->
      <h1>Отлично!</h1>
      <p>Информация о заказе и его статусах будет ждать вас на вашей электронной почте</p>
      <!-- Кнопка для продолжения покупок -->
      <button class="continue-button" @click="continueShopping">Продолжить покупки</button>
    </div>
    <!-- Образы по бокам -->
    <div class="thanks-images">
      <img src="@/assets/male-model.png" alt="Мужская мода" class="thanks-image-left" />
      <img src="@/assets/female-model.png" alt="Женская мода" class="thanks-image-right" />
    </div>
  </div>
</template>

<script>
import AppHeader from "@components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
  methods: {
    continueShopping() {
      this.$router.push("/"); // Редирект на главную страницу
    },
  },
};
</script>

<style scoped>
.thanks-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  position: relative;
}

.thanks-content {
  z-index: 2;
  background-color: white;
  padding: 20px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  color: #555;
  margin-bottom: 30px;
}

.continue-button {
  background-color: black;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.continue-button:hover {
  opacity: 0.9;
}

.thanks-images {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  z-index: 1;
}

.thanks-image-left {
  position: absolute;
  left: 10%;
  max-width: 200px;
}

.thanks-image-right {
  position: absolute;
  right: 10%;
  max-width: 200px;
}
</style>
