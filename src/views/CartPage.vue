<template>
  <div class="cart-page container">
    <div class="content">
      <div v-if="cartItems.length > 0" class="cart-table-container">
        <CartTable
            :cartItems="cartItems"
            :totalPrice="totalPrice"
            @update-quantity="updateQuantity"
            @remove-item="removeItem"
        />
      </div>
      <div v-else>
        <p>Ваша корзина пуста</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getFullCartData } from "@services/cartProcessingService";
import CartTable from "@components/CartTable.vue";
import { updateCartItemQuantity, removeCartItem } from "@services/cartService.js";

export default {
  components: {
    CartTable,
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
        const { items, totalPrice } = await getFullCartData();
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
