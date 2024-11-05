<template>
  <div class="admin-page">
    <Sidebar />
    <div class="main-content">
      <Header />
      <h2>Размеры</h2>
      <button @click="goToAddSizePage" class="add-button">Добавить</button>
      <SizeTable
          :sizes="sizes"
          @save="saveSize"
          @delete="deleteSize"
          @edit="editSize"
          @cancel="cancelEdit"
      />
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/AdminSidebar.vue';
import Header from '../components/AdminHeader.vue';
import SizeTable from '../components/SizeTable.vue';
import axios from '../axiosInstance';

export default {
  components: {
    Sidebar,
    Header,
    SizeTable,
  },
  data() {
    return {
      sizes: [], // Массив размеров, загружаемый с сервера
    };
  },
  methods: {
    async loadSizes() {
      try {
        const response = await axios.get('/sizes');
        this.sizes = response.data.map(size => ({ ...size, isEditing: false }));
      } catch (error) {
        console.error('Ошибка загрузки размеров:', error);
      }
    },
    goToAddSizePage() {
      this.$router.push({ name: 'AdminAddSizePage' });
    },
    async saveSize(size) {
      try {
        await axios.put(`/admin/sizes/${size.id}`, {
          name: size.name,
        });
        size.isEditing = false;
        this.loadSizes();
      } catch (error) {
        console.error('Ошибка сохранения размера:', error);
      }
    },
    async deleteSize(size) {
      try {
        await axios.delete(`/admin/sizes/${size.id}`);
        this.loadSizes();
      } catch (error) {
        console.error('Ошибка удаления размера:', error);
      }
    },
    editSize(size) {
      size.isEditing = true;
    },
    cancelEdit(size) {
      size.isEditing = false;
      this.loadSizes(); // Перезагрузка размеров для отмены изменений
    },
  },
  mounted() {
    this.loadSizes(); // Загрузка данных при монтировании компонента
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
  margin-bottom: 10px;
  padding: 5px 10px;
}
</style>
