<template>
  <div class="admin-page container">
    <Sidebar />
    <div class="main-content">
      <Header />
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
import Sidebar from '@/components/admin/AdminSidebar.vue';
import SizeTable from '@/components/admin/SizesTable.vue';
import axios from '@/axiosInstance.js';

export default {
  components: {
    Sidebar,
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
        await this.loadSizes();
      } catch (error) {
        console.error('Ошибка сохранения размера:', error);
      }
    },
    async deleteSize(size) {
      try {
        await axios.delete(`/admin/sizes/${size.id}`);
        await this.loadSizes();
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

.add-button {
  margin-bottom: 10px;
  padding: 5px 10px;
}
</style>
