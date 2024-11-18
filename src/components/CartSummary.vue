<template>
  <div class="cart-summary">
    <h3>Детали заказа</h3>
    <p>Всего: {{ total }} ₽</p>
    <button @click="goToCheckoutPage" class="checkout-button">Оформить заказ</button>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
  },
  methods: {
    goToCheckoutPage() {
      // Переход на страницу оформления заказа
      this.$router.push('/checkout');
    }
  }
};
</script>

<style scoped>
.cart-summary {
  margin-top: 20px;
  padding: 20px;
  border-top: 1px solid #eee;
}

.checkout-button {
  margin-top: 20px;
  padding: 10px 20px;
  background: linear-gradient(to right, #ff8269, #ff5d9e);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
