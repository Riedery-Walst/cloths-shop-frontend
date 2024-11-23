<template>
  <div class="cart-item">
    <router-link :to="productLink">
      <img :src="imageUrl" alt="Product Image" class="product-image" />
    </router-link>
    <div class="product-details">
      <router-link :to="productLink" class="product-name">
        <h3>{{ item.name }}</h3>
      </router-link>
      <p>Размер: {{ item.size }}</p>
      <p>Цвет: {{ item.color }}</p>
      <p>Цена: {{ item.price }} ₽</p>
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_URL } from "@config/constants";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imageUrl() {
      if (!this.item.imageUrl) {
        // Показываем заглушку, если изображения нет
        return `${BASE_IMAGE_URL}default-placeholder.png`;
      }
      const normalizedPath = this.item.imageUrl.replace(/\\/g, "/");
      return `${BASE_IMAGE_URL}${normalizedPath}`;
    },
    productLink() {
      return `/product/${this.item.productId}`;
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
</style>
