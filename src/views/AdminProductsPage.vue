<template>
  <div class="admin-page">
    <Sidebar />
    <div class="main-content">
      <Header />
      <h2>Продукты</h2>
      <button @click="goToAddProductPage" class="add-button">Добавить</button>
      <div class="products-list">
        <div v-for="product in products" :key="product.id" class="product-card">
          <!-- Используем getImageUrl для формирования полного пути к изображению -->
          <img :src="getImageUrl(product.mainImage)" alt="Product Image" class="product-image" />
          <h3>{{ product.name }}</h3>
          <p class="price">{{ product.price }} ₽</p>
          <div class="color-options">
            <span
                v-for="color in product.colors"
                :key="color.id"
                :style="{ backgroundColor: color.hexCode }"
                class="color-circle"
            ></span>
          </div>
          <div class="size-options">
            <span v-for="size in product.sizes" :key="size" class="size-badge">{{ size }}</span>
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
        // Преобразуем данные, чтобы добавить mainImage с полным URL
        this.products = response.data.map(product => {
          return {
            ...product,
            mainImage: product.photos && product.photos.length > 0
                ? this.getImageUrl(product.photos[0])
                : this.getImageUrl('path/to/default-image.jpg'), // Путь к изображению по умолчанию, если фото нет
          };
        });
      } catch (error) {
        console.error('Ошибка загрузки продуктов:', error);
      }
    },
    // Метод для формирования полного URL к изображению
    getImageUrl(imagePath) {
      const baseUrl = 'http://localhost:8080'; // Укажите здесь URL вашего сервера
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath; // Если imagePath уже полный URL, возвращаем его без изменений
      }
      const formattedPath = imagePath.replace(/\\/g, '/'); // Заменяем "\\" на "/" для корректного пути
      return `${baseUrl}/${formattedPath}`;
    },
    goToAddProductPage() {
      this.$router.push({ name: 'AdminAddProductPage' });
    },
    goToEditProductPage(product) {
      this.$router.push({ name: 'AdminEditProductPage', params: { id: product.id } });
    },
    async deleteProduct(productId) {
      try {
        await axios.delete(`/admin/products/${productId}`);
        await this.loadProducts();
      } catch (error) {
        console.error('Ошибка при удалении продукта:', error);
      }
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
