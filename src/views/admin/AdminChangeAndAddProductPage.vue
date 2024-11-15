<template>
  <div>
    <Header /> <!-- Header в верхней части страницы -->
    <div class="admin-layout">
      <Sidebar /> <!-- Sidebar слева -->
      <div class="main-content">
        <h2>{{ isEdit ? 'Изменить продукт' : 'Добавить продукт' }}</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Поля ввода для данных продукта -->
          <div>
            <label>Название продукта:</label>
            <input type="text" v-model="product.name" required />
          </div>
          <div>
            <label>Цена:</label>
            <input type="number" v-model="product.price" required />
          </div>
          <div>
            <label>Количество:</label>
            <input type="number" v-model="product.quantity" required />
          </div>
          <!-- Список выбора цветов -->
          <div>
            <label>Выберите цвета:</label>
            <div class="color-options">
              <label v-for="color in colors" :key="color.id" :style="{ color: color.hex }">
                <input type="checkbox" :value="color.id" v-model="product.colorIds" />
                <span :style="{ backgroundColor: color.hex }" class="color-square"></span> {{ color.name }}
              </label>
            </div>
          </div>
          <!-- Список выбора размеров -->
          <div>
            <label>Выберите размеры:</label>
            <div class="size-options">
              <label v-for="size in sizes" :key="size.id">
                <input type="checkbox" :value="size.id" v-model="product.sizeIds" />
                {{ size.name }}
              </label>
            </div>
          </div>
          <div>
            <label>Описание:</label>
            <textarea v-model="product.description"></textarea>
          </div>
          <!-- Поле загрузки изображений -->
          <div>
            <label>Изображения:</label>
            <input type="file" @change="handleImageUpload" multiple />
            <div v-if="product.images.length" class="image-preview">
              <div v-for="(image, index) in product.images" :key="index" class="image-container">
                <span>{{ image.name || image }}</span>
                <button type="button" @click="removeImage(index)">Удалить</button>
              </div>
            </div>
          </div>
          <button type="submit">{{ isEdit ? 'Сохранить изменения' : 'Создать' }}</button>
        </form>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        <div v-if="successMessage" class="success">{{ successMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../axiosInstance.js';
import Sidebar from '../../components/admin/AdminSidebar.vue';
import Header from '../../components/admin/AdminHeader.vue';

export default {
  components: {
    Sidebar,
    Header,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    productId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      product: {
        name: '',
        price: '',
        quantity: 0,
        colorIds: [], // Идентификаторы выбранных цветов
        sizeIds: [], // Идентификаторы выбранных размеров
        description: '',
        images: [], // Массив загруженных изображений
      },
      colors: [], // Список всех доступных цветов
      sizes: [], // Список всех доступных размеров
      errorMessage: '',
      successMessage: '',
    };
  },
  created() {
    this.loadColors();
    this.loadSizes();
    if (this.isEdit) {
      this.loadProduct();
    }
  },
  methods: {
    async loadColors() {
      try {
        const response = await axios.get('/colors');
        this.colors = response.data;
      } catch (error) {
        console.error('Ошибка загрузки цветов:', error);
      }
    },
    async loadSizes() {
      try {
        const response = await axios.get('/sizes');
        this.sizes = response.data;
      } catch (error) {
        console.error('Ошибка загрузки размеров:', error);
      }
    },
    async loadProduct() {
      try {
        const response = await axios.get(`/products/${this.productId}`);
        const productData = response.data;
        this.product = {
          name: productData.name,
          price: productData.price,
          quantity: productData.quantity,
          colorIds: productData.colors.map(color => color.id),
          sizeIds: productData.sizes.map(size => size.id),
          description: productData.description,
          images: productData.photos.map(photoUrl => photoUrl),
        };
      } catch (error) {
        console.error('Ошибка загрузки продукта:', error);
      }
    },
    handleImageUpload(event) {
      const files = Array.from(event.target.files);
      this.product.images.push(...files);
    },
    removeImage(index) {
      this.product.images.splice(index, 1);
    },
    async handleSubmit() {
      // Преобразуем выбранные идентификаторы в объекты ColorDTO и SizeDTO
      const colorDTOs = this.product.colorIds.map(id => ({ id }));
      const sizeDTOs = this.product.sizeIds.map(id => ({ id }));

      // Собираем данные продукта для отправки
      const productData = {
        name: this.product.name,
        description: this.product.description,
        price: parseFloat(this.product.price),
        quantity: parseInt(this.product.quantity, 10),
        colors: colorDTOs, // Массив объектов ColorDTO
        sizes: sizeDTOs,   // Массив объектов SizeDTO
      };

      // Формируем FormData для отправки данных вместе с изображениями
      const formData = new FormData();
      formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));

      this.product.images.forEach(image => {
        if (image instanceof File) {
          formData.append('photos', image);
        }
      });

      try {
        if (this.isEdit) {
          await axios.put(`/admin/products/${this.productId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          this.successMessage = 'Продукт успешно обновлен!';
        } else {
          await axios.post('/admin/products', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          this.successMessage = 'Продукт успешно добавлен!';
          this.resetForm();
        }
      } catch (error) {
        console.error('Ошибка при сохранении продукта:', error);
        this.errorMessage = 'Ошибка при сохранении продукта.';
      }
    },
    resetForm() {
      this.product = {
        name: '',
        price: '',
        quantity: 0,
        colorIds: [],
        sizeIds: [],
        description: '',
        images: [],
      };
      this.successMessage = '';
      this.errorMessage = '';
    },
  },
};
</script>

<style scoped>
.admin-layout {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.color-options, .size-options {
  display: flex;
  gap: 10px;
}

.color-square {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: 1px solid #ccc;
  border-radius: 2px;
}

.image-container {
  display: inline-block;
  position: relative;
}

.image-container button {
  position: absolute;
  top: 0;
  right: 0;
  background: red;
  color: white;
  border: none;
  cursor: pointer;
}

.error {
  color: red;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>
