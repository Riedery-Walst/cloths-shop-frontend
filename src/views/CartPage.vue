<template>
  <div class="cart-page">
    <div class="content">
      <h1>Корзина</h1>
      <div v-if="cartItems.length > 0" class="cart-items">
        <CartItem
            v-for="item in cartItems"
            :key="item.id"
            :item="item"
            @update-quantity="updateQuantity"
            @remove-item="removeItem"
            :isCheckoutPage="false"
        />
      </div>
      <div v-else>
        <p>Ваша корзина пуста</p>
      </div>
      <TotalSummary v-if="cartItems.length > 0" :total="totalPrice" @checkout="checkout" />
    </div>
  </div>
</template>

<script>
import { getFullCartData } from "@services/cartProcessingService";
import CartItem from "@components/CartItem.vue";
import TotalSummary from "@components/TotalSummary.vue";
import { updateCartItemQuantity, removeCartItem } from "@services/cartService.js";

export default {
  components: {
    CartItem,
    TotalSummary,
  },
  data() {
    return {
      cartItems: [],
      totalPrice: 0,
    };
  },
  methods: {
    async fetchCart() {
      try {
        const {items, totalPrice} = await getFullCartData();
        this.cartItems = items;
        this.totalPrice = totalPrice;
      } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
      }
    },
    async updateQuantity(cartItemId, newQuantity) {
      try {
        await updateCartItemQuantity(cartItemId, newQuantity);
        const item = this.cartItems.find(item => item.id === cartItemId);
        if (item) {
          item.quantity = newQuantity;
        }
        this.updateTotalPrice();
      } catch (error) {
        console.error("Ошибка обновления количества:", error);
      }
    },
    async removeItem(cartItemId) {
      try {
        await removeCartItem(cartItemId);
        this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
        this.updateTotalPrice();
      } catch (error) {
        console.error("Ошибка удаления товара из корзины:", error);
      }
    },
    checkout() {
      this.$router.push("/checkout");
    },
    updateTotalPrice() {
      this.totalPrice = this.cartItems.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);
    }
  },
  async mounted() {
    await this.fetchCart();
  },
};
</script>

<style scoped>
</style>
