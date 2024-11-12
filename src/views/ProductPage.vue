<template>
  <div class="product-page">
    <AppHeader />
    <div class="product-content" v-if="product">
      <div class="image-gallery">
        <img
            v-for="(photo, index) in product.photos"
            :key="index"
            :src="getImageUrl(photo)"
            :alt="product.name"
            class="product-image"
        />
      </div>
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p class="price">{{ product.price }} ₽</p>

        <div class="color-selection" v-if="product.colors && product.colors.length">
          <h3>Выберите цвет</h3>
          <div class="color-options">
            <span
                v-for="color in product.colors"
                :key="color.id"
                :style="{ backgroundColor: color.hex }"
                class="color-circle"
                :title="color.name"
                @click="selectedColor = color"
                :class="{ selected: selectedColor === color }"
            ></span>
          </div>
        </div>

        <div class="size-selection" v-if="product.sizes && product.sizes.length">
          <h3>Выберите размер</h3>
          <div class="size-options">
            <span
                v-for="size in product.sizes"
                :key="size.id"
                class="size-badge"
                @click="selectedSize = size"
                :class="{ selected: selectedSize === size }"
            >{{ size.name }}</span>
          </div>
        </div>

        <p class="description">{{ product.description }}</p>

        <div class="quantity-selection">
          <button @click="decreaseQuantity">-</button>
          <span>{{ quantity }}</span>
          <button @click="increaseQuantity">+</button>
        </div>

        <button class="add-to-cart-button">Добавить в корзину</button>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import axiosInstance from '../axiosInstance';

export default {
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      product: null, // Данные продукта будут загружены с бэкенда
      selectedColor: null,
      selectedSize: null,
      quantity: 1
    };
  },
  methods: {
    async fetchProductData() {
      try {
        const productId = this.$route.params.id;
        const response = await axiosInstance.get(`/products/${productId}`);
        this.product = response.data;
      } catch (error) {
        console.error('Ошибка загрузки данных продукта:', error);
      }
    },
    getImageUrl(imagePath) {
      const baseUrl = "http://localhost:8080";
      return `${baseUrl}/${imagePath.replace(/\\/g, "/")}`;
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--;
    },
    increaseQuantity() {
      this.quantity++;
    }
  },
  mounted() {
    this.fetchProductData(); // Загружаем данные продукта при монтировании компонента
  }
};
</script>

<style scoped>
.product-page {
  display: flex;
  flex-direction: column;
}

.product-content {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.image-gallery {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 50%;
}

.product-image {
  width: 100%;
  border-radius: 8px;
}

.product-info {
  position: sticky;
  top: 20px;
  flex: 1;
  max-width: 300px;
}

.price {
  font-size: 24px;
  font-weight: bold;
}

.color-selection, .size-selection {
  margin-top: 20px;
}

.color-options, .size-options {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.color-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
}

.color-circle.selected {
  border-color: #000;
}

.size-badge {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  cursor: pointer;
}

.size-badge.selected {
  background-color: #007BFF;
  color: #fff;
}

.description {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.quantity-selection {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.quantity-selection button {
  background: none;
  border: 1px solid #ccc;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}

.add-to-cart-button {
  margin-top: 20px;
  padding: 10px 20px;
  background: linear-gradient(to right, #ff8269, #ff5d9e);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
