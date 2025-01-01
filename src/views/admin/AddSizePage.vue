<template>
  <div class="colors-page container">
    <Sidebar />
    <div>
      <Header />
      <div class="form-container">
        <form @submit.prevent="addSize">
          <div class="form-group">
            <label for="name">Название размера:</label>
            <input type="text" id="name" v-model="size.name" required />
          </div>
          <button type="submit" class="add-button">Создать</button>
          <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
          <div v-if="successMessage" class="success">{{ successMessage }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@components/admin/AdminSidebar.vue';
import axios from '@axios';

export default {
  components: {
    Sidebar,
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
.colors-page {
  display: flex;
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

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>
