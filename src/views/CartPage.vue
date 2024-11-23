<template>
  <div class="cart-page">
    <h1>Корзина</h1>
    <div v-if="cartItems.length > 0" class="cart-items">
      <CartItem
          v-for="item in cartItems"
          :key="item.id"
          :item="item"
          @update-quantity="updateQuantity"
          @remove-item="removeItem"
      />
    </div>
    <div v-else>
      <p>Ваша корзина пуста</p>
    </div>
    <TotalSummary v-if="cartItems.length > 0" :total="totalPrice" @checkout="checkout" />
  </div>
</template>

<script>
import { getFullCartData } from "@services/cartProcessingService";
import CartItem from "@components/CartItem.vue";
import TotalSummary from "@components/TotalSummary.vue";

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
        const { items, totalPrice } = await getFullCartData();
        this.cartItems = items;
        this.totalPrice = totalPrice;
      } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
      }
    },
    updateQuantity(cartItemId, quantity) {
      // Логика обновления количества (если необходимо)
    },
    removeItem(cartItemId) {
      // Логика удаления элемента (если необходимо)
    },
    checkout() {
      this.$router.push("/checkout");
    },
  },
  async mounted() {
    await this.fetchCart();
  },
};
</script>

<style scoped>
.cart-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.cart-items {
  margin-bottom: 20px;
}
</style>
