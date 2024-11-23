<template>
  <div class="total-summary">
    <h3>Детали заказа</h3>
    <p class="total-price">Всего: <span>{{ total.toFixed(2) }} ₽</span></p>
    <button class="checkout-button" @click="checkout">Оформить заказ</button>
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
.total-summary {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  text-align: center;
}

.total-price {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.total-price span {
  color: #333;
}

.checkout-button {
  display: inline-block;
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background: linear-gradient(45deg, #ff7e5f, #feb47b);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.checkout-button:hover {
  background: linear-gradient(45deg, #ff6f4e, #fd9c74);
}
</style>
