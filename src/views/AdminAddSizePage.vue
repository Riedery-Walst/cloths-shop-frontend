<template>
  <div>
    <h2>Добавить новый размер</h2>
    <form @submit.prevent="addSize">
      <div>
        <label for="name">Название размера:</label>
        <input type="text" id="name" v-model="size.name" required />
      </div>
      <button type="submit">Добавить размер</button>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success">{{ successMessage }}</div>
    </form>
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
.error {
  color: red;
}
.success {
  color: green;
  margin-top: 10px;
}
</style>
