<template>
  <div class="admin-page">
    <Sidebar />
    <div class="main-content">
      <Header />
      <div class="form-container">
        <h2>Добавить новый размер</h2>
        <form @submit.prevent="addSize">
          <div class="form-group">
            <label for="name">Название размера:</label>
            <input type="text" id="name" v-model="size.name" required />
          </div>
          <button type="submit" class="submit-button">Добавить размер</button>
          <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
          <div v-if="successMessage" class="success">{{ successMessage }}</div>
        </form>
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
      size: {
        name: '',
      },
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async addSize() {
      try {
        await axios.post('admin/sizes', this.size);
        this.successMessage = 'Размер успешно добавлен!';
        this.size.name = '';
      } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message || 'Ошибка при добавлении размера.';
        } else {
          this.errorMessage = 'Произошла непредвиденная ошибка.';
        }
      }
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

.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
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
