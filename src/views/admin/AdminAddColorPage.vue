<template>
  <div class="admin-page">
    <Sidebar />
    <div class="main-content">
      <Header />
      <h2>Добавить новый цвет</h2>
      <form @submit.prevent="addColor">
        <div>
          <label for="name">Название цвета:</label>
          <input type="text" id="name" v-model="color.name" required />
        </div>
        <div style="display: flex; align-items: center;">
          <label for="hex">HEX значение:</label>
          <input type="text" id="hex" v-model="color.hex" required />
          <input
              type="color"
              v-model="color.hex"
              class="color-picker"
              title="Выберите цвет"
              style="margin-left: 10px; width: 40px; height: 40px; border: none; cursor: pointer;"
          />
        </div>
        <button type="submit" class="add-button">Добавить цвет</button>
      </form>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success">{{ successMessage }}</div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../../components/admin/AdminSidebar.vue';
import Header from '../../components/admin/AdminHeader.vue';
import axios from '../../axiosInstance.js';

export default {
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      color: {
        name: '',
        hex: '#000000', // Начальное значение HEX по умолчанию
      },
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async addColor() {
      try {
        await axios.post('/admin/colors', this.color);
        this.successMessage = 'Цвет успешно добавлен!';
        this.resetForm();
      } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message || 'Ошибка при добавлении цвета.';
        } else {
          this.errorMessage = 'Произошла непредвиденная ошибка.';
        }
      }
    },
    resetForm() {
      this.color.name = '';
      this.color.hex = '#000000';
      this.successMessage = '';
    },
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
  margin-top: 10px;
  padding: 8px 16px;
}

.error {
  color: red;
}

.success {
  color: green;
  margin-top: 10px;
}

.color-picker {
  cursor: pointer;
}
</style>
