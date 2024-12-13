<template>
  <div class="product-page container">
    <div class="product-content" v-if="product">
      <!-- Галерея изображений -->
      <div class="image-gallery">
        <div class="thumbnail-list">
          <img
              v-for="(photo, index) in product.photos"
              :key="index"
              :src="getImageUrl(photo)"
              :alt="product.name"
              class="thumbnail"
              :class="{ active: currentIndex === index }"
              @click="currentIndex = index"
          />
        </div>
        <div class="main-image">
          <img :src="getImageUrl(product.photos[currentIndex])" :alt="product.name" />
        </div>
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
            <ul class="colors">
              <li v-for="color in product.colors" :key="color.id">
                <input
                    type="radio"
                    :id="'color-' + color.id"
                    v-model="selectedColor"
                    :value="color"
                    :name="`color-${product.id}`"
                    :style="{ display: 'none' }"
                />
                <label :for="'color-' + color.id">
                  <span
                      class="swatch"
                      :style="{ backgroundColor: color.hex }"
                      :title="color.name"
                  ></span>
                </label>
              </li>
            </ul>
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
      currentIndex: 0, // Индекс текущего изображения
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
  gap: 70px;
}

.image-gallery {
  display: flex;
  gap: 30px;
}

.thumbnail-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.thumbnail {
  width: 170px;
  height: 170px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s;
}

.thumbnail:hover {
  border-color: #f1d0d0;
}

.thumbnail.active {
  border-color: #DB4444;
}

.main-image img {
  width: 500px;
  height: auto;
  object-fit: contain;
  border: 1px solid #ccc;
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

.size-options {
  gap: 8px;
}

.colors {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.colors li {
  margin-right: 20px;
}

.swatch {
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  height: 20px;
  width: 20px;
  border: 2px solid #d4d4d4;
  cursor: pointer;
}

.swatch:hover {
  border-color: #888;
}

input[type="radio"]:checked + label .swatch {
  box-shadow: inset 0 0 0 2px white;
  border-color: #000;
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
  font-weight: 600;
  height: 44px;
  width: 100%;
  margin-left: 16px;
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
