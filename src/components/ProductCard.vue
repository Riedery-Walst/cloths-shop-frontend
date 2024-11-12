<template>
  <div class="product-card" @click="goToProductPage">
    <ImageSlider :photos="product.photos" :showArrows="false" />
    <h3 class="product-name">{{ product.name }}</h3>
    <p class="price">{{ product.price }} ₽</p>

    <div class="color-options">
      <span
          v-for="color in product.colors"
          :key="color.id"
          :style="{ backgroundColor: color.hex }"
          class="color-circle"
          :title="color.name"
      ></span>
    </div>

    <!-- Дополнительные данные для администратора -->
    <template v-if="isAdmin">
      <p class="quantity">Количество: {{ product.quantity }}</p>
      <p class="description">{{ product.description }}</p>
      <div class="size-options">
        <span v-for="size in product.sizes" :key="size.id" class="size-badge">{{ size.name }}</span>
      </div>
    </template>

    <div class="actions" v-if="isAdmin">
      <button @click.stop="$emit('edit-product', product)" class="edit-button">Изменить</button>
      <button @click.stop="$emit('delete-product', product.id)" class="delete-button">Удалить</button>
    </div>
  </div>
</template>

<script>
import ImageSlider from './ImageSlider.vue';

export default {
  name: 'ProductCard',
  components: { ImageSlider },
  props: {
    product: {
      type: Object,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goToProductPage() {
      this.$router.push({ name: 'ProductPage', params: { id: this.product.id } });
    }
  }
};
</script>

<style scoped>
.product-card {
  width: 220px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 10px 0 5px;
}

.price {
  font-size: 14px;
  color: #666;
  font-weight: bold;
  margin: 5px 0;
}

.color-options {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 10px 0;
}

.color-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ccc;
}

.size-options {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 8px 0;
}

.size-badge {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.edit-button,
.delete-button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.edit-button {
  background-color: #007bff;
  color: #fff;
}

.delete-button {
  background-color: #dc3545;
  color: #fff;
}
</style>
