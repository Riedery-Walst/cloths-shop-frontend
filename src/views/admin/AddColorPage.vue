<template>
  <div class="list-page container">
    <Sidebar />
    <div>
      <Header />
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
        <button type="submit" class="add-button">Создать</button>
      </form>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success">{{ successMessage }}</div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/admin/Sidebar.vue';
import axios from '@axios';

export default {
  components: {
    Sidebar,
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
.list-page {
  display: flex;
}

#hex {
  margin-left: 8px;
  margin-bottom: 0;
}

.add-button {
  margin-top: 10px;
  font-size: 16px;
  height: 44px;
  width: 300px;
  background-color: #db4444;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #E07575;
}

label {
  display: block;
  margin: 10px 0 5px;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}

.color-picker {
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
