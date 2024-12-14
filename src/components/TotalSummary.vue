<template>
  <div class="order-summary-container">
    <div class="total-summary">
      <h3>Ваша корзина</h3>
      <div class="total-price-container">
        <p class="total-price">Всего</p>
        <p class="total-price-amount"><span>{{ total.toFixed(2) }} ₽</span></p>
      </div>
      <div class="line"></div> <!-- Линия разделения -->
      <div class="shipping-row">
        <span class="shipping-text">Доставка</span>
        <span class="shipping-price">СДЭК</span>
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

.total-price-container {
  height: 24px;
  display: flex;
  justify-content: space-between; /* Размещает элементы по противоположным сторонам */
  align-items: center;
  margin: 0 0 24px 0;
}

.total-price {
  font-size: 16px;
  color: #000000;
}

.total-price-amount {
  font-size: 16px;
  color: #000000;
}

.line {
  width: 100%;
  height: 1px; /* Высота линии */
  background-color: #000000; /* Цвет линии */
  margin: 0; /* Отступы сверху и снизу */
}

.shipping-row {
  display: flex;
  justify-content: space-between; /* Размещает текст по противоположным сторонам */
  align-items: center;
  margin: 16px 0;
}

.shipping-text {
  font-size: 16px;
  color: #000000;
}

.shipping-price {
  font-size: 16px;
  color: black;
}

.checkout-button {
  display: inline-block;
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
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
