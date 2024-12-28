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
      <div class="product-header">
        <router-link :to="productLink" class="product-name">
          <h3>{{ item.name }}</h3>
        </router-link>

        <!-- Отображение субтотала -->
        <div v-if="isCheckoutPage" class="subtotal">
          <p>{{ subtotal }} ₽</p>
        </div>
      </div>
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
    isCheckoutPage: {
      type: Boolean,
      required: true,
    },
    subtotal: {
      type: String,
      required: true,
    },
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
};
</script>

<style scoped>

.cart-item {
  h3 {
    font-size: 16px;
  }

  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.product-image {
  width: 54px;
  height: 54px;
  cursor: pointer;
}

.product-details {
  flex-grow: 1;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-name {
  text-decoration: none;
  color: #000;
  transition: color 0.3s;
}

.product-name:hover {
  color: #ff7e5f;
}

.subtotal {
  color: #000000;
}

</style>
