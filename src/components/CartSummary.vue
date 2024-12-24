<template>
  <div class="order-summary-container">
    <div class="total-summary">
      <h3>Ваша корзина</h3>
      <div class="shipping-row">
        <span class="shipping-text">Доставка</span>
        <span class="shipping-price">СДЭК</span>
      </div>

      <div class="line"></div> <!-- Линия разделения -->
      <div class="total-price-container">
        <p class="total-price">Всего</p>
        <p class="total-price-amount"><span>{{ total.toFixed(2) }} ₽</span></p>
      </div>
      <button class="checkout-button" @click="checkout">Оформить заказ</button>
    </div>
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
    checkout() {
      this.$router.push('/checkout');
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 0 0 24px 0;
}

.order-summary-container {
  display: flex;
  justify-content: flex-end; /* Размещает содержимое вправо */
}

.total-summary {
  width: 30%;
  padding: 24px 32px;
  border: 1px solid #000000;
  border-radius: 10px;
}


.checkout-button {
  display: inline-block;
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background: #DB4444;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.checkout-button:hover {
  background: #E07575;
}
</style>
