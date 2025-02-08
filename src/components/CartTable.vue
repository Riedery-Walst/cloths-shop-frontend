<template>
  <div class="cart-table">
    <table>
      <thead>
      <tr>
        <th>Продукт</th>
        <th>Размер</th>
        <th>Цвет</th>
        <th>Цена</th>
        <th>Количество</th>
        <th>Сумма</th>
      </tr>
      </thead>
      <tbody>
      <CartRow
          v-for="item in cartItems"
          :key="item.id"
          :item="item"
          @update-quantity="updateQuantity"
          @remove-item="removeItem"
      />
      </tbody>
    </table>
    <TotalSummary v-if="cartItems.length > 0" :total="totalPrice" @checkout="checkout" />
  </div>
</template>

<script>
import CartRow from "@components/CartRow.vue";
import TotalSummary from "@/components/CartSummary.vue";
import { updateCartItemQuantity, removeCartItem } from "@services/cartService.js";

export default {
  components: {
    CartRow,
    TotalSummary,
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
  },
  methods: {
    async updateQuantity(cartItemId, newQuantity) {
      try {
        await updateCartItemQuantity(cartItemId, newQuantity);
        this.$emit("update-quantity", cartItemId, newQuantity);
      } catch (error) {
        console.error("Ошибка обновления количества:", error);
      }
    },
    async removeItem(cartItemId) {
      try {
        await removeCartItem(cartItemId);
        this.$emit("remove-item", cartItemId);
      } catch (error) {
        console.error("Ошибка удаления товара из корзины:", error);
      }
    },
    checkout() {
      this.$router.push("/checkout");
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: separate; /* Убирает промежутки между ячейками */
  table-layout: fixed; /* Обеспечивает одинаковую ширину столбцов */
  border-radius: 4px;
  border-spacing: 0 40px;
  margin-top: -40px;
}

th:first-child, td:first-child {
  width: 25%;
}

tr {
  box-shadow: 0 1px 13px 0 rgba(0, 0, 0, 0.05);
}

td {
  word-wrap: break-word;

}



</style>
