<template>
  <div class="cart-page">
    <AppHeader />
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
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@components/AppHeader.vue";
import AppFooter from "@components/AppFooter.vue";
import { getFullCartData } from "@services/cartProcessingService";
import CartItem from "@components/CartItem.vue";
import TotalSummary from "@components/TotalSummary.vue";
import { updateCartItemQuantity, removeCartItem } from "@services/cartService.js";

export default {
  components: {
    AppHeader,
    AppFooter,
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
    async updateQuantity(cartItemId, newQuantity) {
      try {
        // Обновляем количество товара в корзине через API
        await updateCartItemQuantity(cartItemId, newQuantity);

        // После успешного обновления обновляем локальное состояние
        const item = this.cartItems.find(item => item.id === cartItemId);
        if (item) {
          item.quantity = newQuantity;
        }

        // Пересчитываем общую стоимость после изменения количества товара
        this.updateTotalPrice();
      } catch (error) {
        console.error("Ошибка обновления количества:", error);
      }
    },
    async removeItem(cartItemId) {
      try {
        // Удаляем товар из корзины через API
        await removeCartItem(cartItemId);

        // Удаляем товар из локального состояния
        this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);

        // Пересчитываем общую стоимость после удаления товара
        this.updateTotalPrice();
      } catch (error) {
        console.error("Ошибка удаления товара из корзины:", error);
      }
    },
    checkout() {
      this.$router.push("/checkout");
    },
    updateTotalPrice() {
      // Пересчитываем общую цену корзины
      this.totalPrice = this.cartItems.reduce((total, item) => {
        return total + item.quantity * item.price; // Примерный расчет, возможно, придется учесть скидки, налоги и т. д.
      }, 0);
    }
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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}

.cart-items {
  margin-bottom: 20px;
}
</style>
