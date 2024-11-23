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
    <!-- Кнопка для удаления товара (отображается только если не на странице оформления заказа) -->
    <button v-if="!isCheckoutPage" class="remove-btn" @click="removeItem">Удалить</button>
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
    // Пропс для контроля, отображать ли кнопку удаления
    isCheckoutPage: {
      type: Boolean,
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
  methods: {
    removeItem() {
      // Отправляем событие для удаления товара
      this.$emit("remove-item", this.item.id);
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

/* Стиль для кнопки удаления */
.remove-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: #e60000;
}
</style>
