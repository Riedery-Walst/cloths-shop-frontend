<template>
  <div>
    <Header />
    <div class="admin-layout container">
      <Sidebar />
      <div>
        <form @submit.prevent="handleSubmit">
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
              <label v-for="color in colors" :key="color.id">
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
                <img :src="image.previewUrl" alt="Preview" class="image-preview-img" />
                <span>{{ image.name || image.fileName }}</span>
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
import axios from '@axios';
import Sidebar from '@components/admin/AdminSidebar.vue';

export default {
  components: {
    Sidebar,
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
      files.forEach(file => {
        // Добавляем объект с URL для отображения изображения и оригинальное имя файла
        const fileWithPreview = {
          file,
          previewUrl: URL.createObjectURL(file),
          name: file.name,
          fileName: file.name
        };
        this.product.images.push(fileWithPreview);
      });
    },
    removeImage(index) {
      // Удаляем объект изображения из массива
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
        if (image.file) {
          formData.append('photos', image.file);
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

label {
  display: block;
  margin: 10px 0 5px;
}

input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  min-height: 150px;
  resize: vertical;
}

button[type="submit"] {
  margin-top: 30px;
  font-size: 16px;
  height: 44px;
  width: 300px;
  background-color: #db4444;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #E07575;
}

button[type="button"] {
  background-color: #f44336;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="button"]:hover {
  background-color: #d32f2f;
}

.color-options, .size-options {
  display: flex;
  gap: 15px;
}

.color-options label,
.size-options label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.color-square {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  border-radius: 3px;
  border: 1px solid #ccc;
}

.image-preview {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.image-container {
  display: inline-block;
  position: relative;
  margin-bottom: 10px;
}

.image-preview-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 5px;
}

.image-container span {
  display: block;
  width: 100px;
  text-align: center;
  font-size: 12px;
  margin-bottom: 5px;
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>
