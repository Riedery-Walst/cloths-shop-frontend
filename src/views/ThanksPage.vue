<template>
  <div class="thanks-page container">
    <div class="thanks-images">
      <img src="@/assets/male-model.png" alt="Мужская мода" class="thanks-image-left" />

      <div class="thanks-content">
        <h1>Отлично!</h1>
        <p>Скоро наш сотрудник свяжется с вами для <br> уточнения деталей заказа</p>
        <button class="continue-button" @click="continueShopping">Продолжить покупки</button>
      </div>

      <img src="@/assets/female-model.png" alt="Женская мода" class="thanks-image-right" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    continueShopping() {
      this.$router.push("/"); // Редирект на главную страницу
    },
  },
};
</script>

<style scoped>
p {
  font-size: 18px;
  line-height: 1.5;
}

h1 {
  font-size: 65px;
  font-weight: bold;
  opacity: 80%;
}

.container {
  margin: 0 140px;
}

.thanks-page {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.thanks-images {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.thanks-content {
  text-align: center;
  flex: 1 1 40%; /* Задаем ширину 40% для текста и кнопки */
  padding: 20px;
}

.thanks-image-left,
.thanks-image-right {
  max-width: 20%; /* Изображения занимают 40% ширины */
  height: auto;
}

.continue-button {
  margin-top: 20px;
  font-size: 16px;
  height: 44px;
  width: 400px;
  background-color: #db4444;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.continue-button:hover {
  background-color: #E07575;
}
</style>
