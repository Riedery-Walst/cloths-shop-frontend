<template>
  <div class="cart-item">
    <!-- Ссылка на изображение продукта -->
    <router-link :to="`/product/${item.product.id}`" class="product-image-link">
      <img :src="getImageUrl(item.product.photos)" alt="Product Image" class="product-image" />
    </router-link>

    <!-- Данные продукта -->
    <div class="item-details">
      <router-link :to="`/product/${item.product.id}`" class="product-name">
        {{ item.product.name }}
      </router-link>
      <p>Размер: {{ getSizeName(item.sizeId) }}</p>
      <p>Цвет: {{ getColorName(item.colorId) }}</p>
      <p>{{ item.product.price }} ₽</p>
    </div>

    <!-- Управление количеством (опционально) -->
    <div v-if="!disableQuantityControls">
      <slot name="quantity-control">
        <QuantityControl :quantity="item.quantity" @update-quantity="updateQuantity" />
      </slot>
    </div>

    <!-- Кнопка удаления -->
    <slot name="remove-button">
      <button v-if="showControls && !disableQuantityControls" @click="removeItem" class="remove-button">
        Удалить
      </button>
    </slot>
  </div>
</template>

<script>
import QuantityControl from "@components/QuantityControl.vue";
import { updateCartItemQuantity } from "@/services/cartService";

export default {
  components: {
    QuantityControl,
  },
  props: {
    item: Object,
    colors: Array,
    sizes: Array,
    showControls: {
      type: Boolean,
      default: true,
    },
    disableQuantityControls: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    removeItem() {
      this.$emit("remove-item", this.item.id);
    },
    updateQuantity(newQuantity) {
      this.item.quantity = newQuantity;
      this.$emit("update-quantity", this.item);
      this.updateQuantityOnServer();
    },
    async updateQuantityOnServer() {
      try {
        await updateCartItemQuantity(this.item.id, this.item.quantity);
      } catch (error) {
        console.error("Ошибка при обновлении количества на сервере:", error);
      }
    },
    getImageUrl(photos) {
      const baseUrl = "http://localhost:8080";
      return photos && photos.length > 0
          ? `${baseUrl}/${photos[0].photoUrl.replace(/\\/g, "/")}`
          : "";
    },
    getColorName(colorId) {
      if (!this.colors || !colorId) return "Не указан";
      const color = this.colors.find((c) => c.id === colorId);
      return color ? color.name : "Не указан";
    },
    getSizeName(sizeId) {
      if (!this.sizes || !sizeId) return "Не указан";
      const size = this.sizes.find((s) => s.id === sizeId);
      return size ? size.name : "Не указан";
    },
  },
};
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
}

.product-image-link {
  display: inline-block;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex: 1;
}

.product-name {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}

.product-name:hover {
  text-decoration: none;
}

.quantity-control button {
  background: none;
  border: 1px solid #ccc;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}

.remove-button {
  background: none;
  color: red;
  border: none;
  cursor: pointer;
}
</style>
