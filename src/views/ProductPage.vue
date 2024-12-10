<template>
  <div class="product-page container">
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

        <p class="description">{{ product.description }}</p>

        <div class="description-line"></div>

        <div class="product-options">
          <!-- Цвет -->
          <div class="color-selection" v-if="product.colors && product.colors.length">
            <h3>Цвет:</h3>
            <div class="color-options">
              <button
                  v-for="color in product.colors"
                  :key="color.id"
                  :style="{ backgroundColor: color.hex }"
                  class="color-button"
                  :title="color.name"
                  @click="selectedColor = color"
                  :class="{ selected: selectedColor === color }"
              ></button>
            </div>
          </div>

          <!-- Размер -->
          <div class="size-selection" v-if="product.sizes && product.sizes.length">
            <h3>Размер:</h3>
            <div class="size-options">
              <button
                  v-for="size in product.sizes"
                  :key="size.id"
                  class="size-button"
                  @click="selectSize(size)"
                  :class="{ selected: selectedSize === size }"
                  :style="getSizeButtonStyle(size)"
              >{{ size.name }}</button>
            </div>
          </div>
        </div>

        <!-- Количество и кнопка добавления -->
        <div class="quantity-and-cart">
          <QuantityControl
              :quantity="quantity"
              @update-quantity="updateQuantity"
          />
          <button
              class="add-to-cart-button"
              @click="addToCart"
              :class="{ clicked: buttonClicked }"
              @mousedown="buttonClicked = true"
              @mouseup="buttonClicked = false"
              @mouseleave="buttonClicked = false"
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuantityControl from '@components/QuantityControl.vue'; // Import the QuantityControl component
import axios from '@axios';
import { addProductToCart } from '@services/cartService';

export default {
  components: {
    QuantityControl, // Register the component
  },
  data() {
    return {
      product: null, // Информация о продукте будет загружена с сервера
      selectedColor: null,
      selectedSize: null,
      quantity: 1,
      buttonClicked: false, // Состояние для отслеживания нажатия на кнопку
    };
  },
  methods: {
    async fetchProductData() {
      try {
        const productId = this.$route.params.id;
        const response = await axios.get(`/products/${productId}`);
        this.product = response.data;
      } catch (error) {
        console.error('Ошибка загрузки данных продукта:', error);
      }
    },
    getImageUrl(imagePath) {
      const baseUrl = "http://localhost:8080";
      return `${baseUrl}/${imagePath.replace(/\\/g, "/")}`;
    },
    updateQuantity(newQuantity) {
      this.quantity = newQuantity;
    },
    selectSize(size) {
      this.selectedSize = size; // Обновляем выбранный размер
    },
    getSizeButtonStyle(size) {
      return this.selectedSize === size
          ? { backgroundColor: '#DB4444', color: '#fff' }
          : {};
    },
    async addToCart() {
      if (!this.selectedColor || !this.selectedSize) {
        alert('Пожалуйста, выберите цвет и размер.');
        return;
      }
      try {
        const productId = this.product.id;

        // Вызов метода для добавления продукта в корзину
        await addProductToCart(productId, this.quantity, this.selectedColor.id, this.selectedSize.id);
        alert('Товар добавлен в корзину!');
      } catch (error) {
        console.error('Ошибка добавления в корзину:', error);
        alert('Не удалось добавить товар в корзину.');
      }
    },
  },
  mounted() {
    this.fetchProductData();
  },
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
}

.image-gallery {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 50%;
}

.product-image {
  width: 100%;
}

.product-info {
  position: sticky;
  top: 20px;
  flex: 1;
}

h1 {
  margin: 0 0 -2px;
}

.product-options {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 24px;
}

.color-selection h3, .size-selection h3 {
  color: rgb(0, 0, 0);
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-align: left;
  margin: 0;
}

.price {
  color: rgb(0, 0, 0);
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0.03em;
  text-align: left;
}

.description {
  margin-top: 12px; /* Установите отступ после цены */
  font-size: 14px;
  color: #000000;
}

.description-line {
  display: flex;
  width: 100%;
  height: 1px; /* Толщина линии */
  background-color: rgba(0, 0, 0);
}

.color-selection, .size-selection {
  margin: 0;
  display: flex;
  align-items: center;
}

.color-selection h3, .size-selection h3 {
  font-size: 20px;
  margin-right: 24px;
  font-weight: 400;
}

.color-options, .size-options {
  display: flex;
  margin: 0;
}

.color-options {
  gap: 8px;
}

.size-options {
  gap: 8px;
}

.color-button {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.5);
  cursor: pointer;
  background-color: transparent;
  position: relative;
}

.color-button.selected {
  border-width: 2px;
  border-color: black;
}

.size-button {
  width: auto;
  height: auto;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 8px 14px;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.3s, color 0.3s;
}

.size-button.selected {
  background-color: #DB4444;
  color: #fff;
  border-color: white;
}

.size-button:hover {
  background-color: #E07575;
  color: #fff;
  border-color: white;
}

.quantity-and-cart {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.add-to-cart-button {
  height: 44px;
  padding: 10px 16px;
  background-color: #db4444;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-cart-button:hover {
  background-color: #E07575;
}
</style>
