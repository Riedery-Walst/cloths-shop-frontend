<template>
  <div class="order-summary">


    <!-- Блок доставки -->
    <div class="shipping-row">
      <span class="shipping-text">Доставка</span>
      <span class="shipping-price">СДЭК</span>
    </div>

    <div class="line"></div> <!-- Линия разделения -->
    <div class="total-price-container">
      <p class="total-price">Всего</p>
      <p class="total-price-amount"><span>{{ totalPrice }} ₽</span></p>
    </div>


    <div class="total">
      <button class="pay-button" @click="submitOrder">Оплатить</button>
    </div>
  </div>
</template>

<script>
import CartItem from "@components/CartItem.vue";

export default {
  components: {
    CartItem,
  },
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    submitOrder: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped>
.pay-button {
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

.pay-button:hover {
  background: #E07575;
}
</style>
