<template>
  <div class="cart-page">
    <AppHeader />
    <div class="cart-container">
      <h1>Корзина</h1>
      <div v-if="cartItems.length">
        <CartItem
            v-for="item in cartItems"
            :key="item.id"
            :item="item"
            :colors="colors"
            :sizes="sizes"
            @remove-item="removeItem"
            @update-quantity="calculateTotal"
        />
        <CartSummary :total="total" />
        <button class="clear-cart-button" @click="clearCartItems">Очистить корзину</button>
      </div>
      <p v-else>Корзина пуста</p>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@components/AppHeader.vue";
import AppFooter from "@components/AppFooter.vue";
import CartItem from "@components/CartItem.vue";
import CartSummary from "@components/CartSummary.vue";
import {fetchColors, fetchSizes} from "@services/productOptionsService.js";
import {getCart, removeProductFromCart, clearCart} from "@services/cartService.js";

export default {
  components: {
    AppHeader,
    AppFooter,
    CartItem,
    CartSummary,
  },
  data() {
    return {
      cartItems: [],
      colors: [],
      sizes: [],
      total: 0,
    };
  },
  methods: {
    async fetchColorsAndSizes() {
      try {
        this.colors = await fetchColors();
        this.sizes = await fetchSizes();
      } catch (error) {
        console.error("Ошибка загрузки цветов и размеров:", error);
      }
    },
    async fetchCart() {
      try {
        const response = await getCart();
        this.cartItems = response.data.items;
        this.calculateTotal();
      } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
      }
    },
    async removeItem(cartItemId) {
      try {
        await removeProductFromCart(cartItemId);
        await this.fetchCart();
      } catch (error) {
        console.error("Ошибка удаления из корзины:", error);
      }
    },
    async clearCartItems() {
      try {
        await clearCart();
        this.cartItems = [];
        this.total = 0;
        alert("Корзина очищена");
      } catch (error) {
        console.error("Ошибка при очистке корзины:", error);
      }
    },
    calculateTotal() {
      this.total = this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    },
  },
  async mounted() {
    await this.fetchColorsAndSizes();
    await this.fetchCart();
  },
};
</script>

<style scoped>
.cart-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.cart-container {
  flex: 1;
  padding: 20px;
}

.clear-cart-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.clear-cart-button:hover {
  background-color: #cc0000;
}
</style>
