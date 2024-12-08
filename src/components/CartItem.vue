<template>
  <div class="cart-item">
    <!-- Изображение товара -->
    <div class="image-container">
      <router-link :to="productLink">
        <img :src="imageUrl" alt="Product Image" class="product-image" />
      </router-link>
    </div>

    <!-- Информация о товаре -->
    <div class="product-details">
      <router-link :to="productLink" class="product-name">
        <h3>{{ item.name }}</h3>
      </router-link>
      <p>Размер: {{ item.size }}</p>
      <p>Цвет: {{ item.color }}</p>
      <p>Цена: {{ item.price }} ₽</p>
    </div>

    <!-- Управление количеством или отображение количества -->
    <div class="controls">
      <div v-if="isCheckoutPage" class="quantity-display">
        <p>Количество: {{ item.quantity }}</p>
      </div>
      <div v-else class="quantity-controls">
        <QuantityControl
            :quantity="item.quantity"
            @update-quantity="updateQuantity"
        />
      </div>
      <button
          v-if="!isCheckoutPage"
          class="remove-btn"
          @click="removeItem"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_URL } from "@config/constants";
import QuantityControl from "@components/QuantityControl.vue";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    isCheckoutPage: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    QuantityControl,
  },
  computed: {
    imageUrl() {
      if (!this.item.imageUrl) {
        return `${BASE_IMAGE_URL}default-placeholder.png`;
      }
      const normalizedPath = this.item.imageUrl.replace(/\\/g, "/");
      return `${BASE_IMAGE_URL}${normalizedPath}`;
    },
    productLink() {
      return `/product/${this.item.productId}`;
    },
  },
  methods: {
    removeItem() {
      this.$emit("remove-item", this.item.id);
    },
    updateQuantity(newQuantity) {
      this.$emit("update-quantity", this.item.id, newQuantity);
    },
  },
};
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s;
}

.product-details {
  flex-grow: 1;
}

.product-name {
  text-decoration: none;
  color: #000;
  transition: color 0.3s;
}

.product-name:hover {
  color: #ff7e5f;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.remove-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: #ff1a1a;
}
</style>
