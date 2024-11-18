<template>
  <div class="cart-item">
    <img :src="getImageUrl(item.product.photos)" alt="Product Image" class="product-image" />
    <div class="item-details">
      <p>{{ item.product.name }}</p>
      <p>Размер: {{ findSizeName(item.sizeId) || 'Не указан' }}</p>
      <p>Цвет: {{ findColorName(item.colorId) || 'Не указан' }}</p>
      <p>{{ item.product.price }} ₽</p>
    </div>

    <slot name="quantity-control">
      <QuantityControl :quantity="item.quantity" @update-quantity="updateQuantity" />
    </slot>

    <slot name="remove-button">
      <button v-if="showControls" @click="removeItem" class="remove-button">Удалить</button>
    </slot>
  </div>
</template>

<script>
import QuantityControl from '@components/QuantityControl.vue';
import {updateCartItemQuantity} from "@/services/cartService.js"; // Импортируем компонент

export default {
  components: {
    QuantityControl,
  },
  props: {
    item: Object,
    showControls: {
      type: Boolean,
      default: true,
    },
    colors: Array,
    sizes: Array,
  },
  methods: {
    removeItem() {
      this.$emit('remove-item', this.item.id);
    },
    updateQuantity(newQuantity) {
      this.item.quantity = newQuantity;
      this.$emit('update-quantity', this.item);
      this.updateQuantityOnServer();
    },
    async updateQuantityOnServer() {
      try {
        await updateCartItemQuantity(this.item.id, this.item.quantity);
      } catch (error) {
        console.error('Ошибка при обновлении количества на сервере:', error);
      }
    },
    getImageUrl(photos) {
      const baseUrl = "http://localhost:8080";
      return photos && photos.length > 0 ? `${baseUrl}/${photos[0].photoUrl.replace(/\\/g, "/")}` : '';
    },
    findColorName(colorId) {
      const color = this.colors.find(c => c.id === colorId);
      return color ? color.name : null;
    },
    findSizeName(sizeId) {
      const size = this.sizes.find(s => s.id === sizeId);
      return size ? size.name : null;
    }
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

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex: 1;
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
