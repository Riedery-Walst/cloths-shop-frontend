<template>
  <div class="admin-page">
    <Sidebar />
    <div class="main-content">
      <Header />
      <h2>Продукты</h2>
      <button @click="goToAddProductPage" class="add-button">Добавить</button>
      <div class="products-list">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="image-slider">
            <button @click="prevImage(product)" class="arrow-button">❮</button>
            <img :src="getImageUrl(product.photos[product.currentPhotoIndex])" alt="Product Image" class="product-image" />
            <button @click="nextImage(product)" class="arrow-button">❯</button>
          </div>
          <h3>{{ product.name }}</h3>
          <p class="price">{{ product.price }} ₽</p>

          <!-- Цветовые кружки -->
          <div class="color-options">
            <span
                v-for="color in product.colors"
                :key="color.id"
                :style="{ backgroundColor: color.hex }"
                class="color-circle"
                :title="color.name"
            ></span>
          </div>

          <!-- Названия размеров -->
          <div class="size-options">
            <span v-for="size in product.sizes" :key="size.id" class="size-badge">{{ size.name }}</span>
          </div>

          <p class="description">{{ product.description }}</p>
          <div class="actions">
            <button @click="goToEditProductPage(product)" class="edit-button">Изменить</button>
            <button @click="deleteProduct(product.id)" class="delete-button">Удалить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/AdminSidebar.vue';
import Header from '../components/AdminHeader.vue';
import axios from '../axiosInstance';

export default {
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      products: [], // Массив продуктов, загружаемый с сервера
    };
  },
  methods: {
    async loadProducts() {
      try {
        const response = await axios.get('/products');
        this.products = response.data.map(product => {
          return {
            ...product,
            photos: product.photos || ['path/to/default-image.jpg'], // Заменяем пустой массив на изображение по умолчанию
            currentPhotoIndex: 0, // Добавляем индекс текущего фото
          };
        });
      } catch (error) {
        console.error('Ошибка загрузки продуктов:', error);
      }
    },
    getImageUrl(imagePath) {
      const baseUrl = 'http://localhost:8080';
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
      }
      const formattedPath = imagePath.replace(/\\/g, '/');
      return `${baseUrl}/${formattedPath}`;
    },
    goToAddProductPage() {
      this.$router.push({name: 'AdminAddProductPage'});
    },
    goToEditProductPage(product) {
      this.$router.push({name: 'AdminEditProductPage', params: {id: product.id}});
    },
    async deleteProduct(productId) {
      try {
        await axios.delete(`/admin/products/${productId}`);
        await this.loadProducts();
      } catch (error) {
        console.error('Ошибка при удалении продукта:', error);
      }
    },
    nextImage(product) {
      product.currentPhotoIndex = (product.currentPhotoIndex + 1) % product.photos.length;
    },
    prevImage(product) {
      product.currentPhotoIndex = (product.currentPhotoIndex - 1 + product.photos.length) % product.photos.length;
    },
  },
  mounted() {
    this.loadProducts();
  },
};
</script>

<style scoped>
.admin-page {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.add-button {
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #444;
}

.products-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  width: 250px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image-slider {
  position: relative;
}

.arrow-button {
  position: absolute;
  top: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  font-size: 16px;
  transform: translateY(-50%);
}

.arrow-button:hover {
  background: rgba(0, 0, 0, 0.8);
}

.arrow-button:first-of-type {
  left: 5px;
}

.arrow-button:last-of-type {
  right: 5px;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.price {
  font-weight: bold;
  margin: 8px 0;
}

.color-options {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 8px 0;
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
  font-size: 12px;
}

.description {
  font-size: 14px;
  color: #666;
  margin: 10px 0;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.edit-button,
.delete-button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-button {
  background-color: #007bff;
  color: #fff;
}

.edit-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #dc3545;
  color: #fff;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>
