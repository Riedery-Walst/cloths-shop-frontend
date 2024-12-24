<template>
  <div class="order-summary">
    <h3>Детали заказа</h3>

    <CartItem
        v-for="item in cartItems"
        :key="item.id"
        :item="item"
        :disable-quantity-controls="true"
        :isCheckoutPage="true"
    />

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
.order-summary {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.total {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.pay-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.pay-button:hover {
  background-color: #45a049;
}


</style>
