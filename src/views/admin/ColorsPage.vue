<template>
  <div class="admin-page">
    <Sidebar />
    <div class="main-content">
      <Header />
      <h2>Цвета</h2>
      <button @click="goToAddColorPage" class="add-button">Добавить</button>
      <ColorTable
          :colors="colors"
          @save="saveColor"
          @delete="deleteColor"
          @edit="editColor"
          @cancel="cancelEdit"
      />
    </div>
  </div>
</template>

<script>
import Sidebar from '@components/admin/AdminSidebar.vue';
import Header from '@components/admin/AdminHeader.vue';
import ColorTable from '@/components/admin/ColorsTable.vue';
import axios from '@axios';

export default {
  components: {
    Sidebar,
    Header,
    ColorTable,
  },
  data() {
    return {
      colors: [], // Массив цветов, загружаемый с сервера
    };
  },
  methods: {
    async loadColors() {
      try {
        const response = await axios.get('/colors');
        this.colors = response.data.map(color => ({ ...color, isEditing: false }));
      } catch (error) {
        console.error('Ошибка загрузки цветов:', error);
      }
    },
    goToAddColorPage() {
      this.$router.push({ name: 'AdminAddColorPage' });
    },
    async saveColor(color) {
      try {
        await axios.put(`/admin/colors/${color.id}`, {
          name: color.name,
          hex: color.hex,
        });
        color.isEditing = false;
        this.loadColors();
      } catch (error) {
        console.error('Ошибка сохранения цвета:', error);
      }
    },
    async deleteColor(color) {
      try {
        await axios.delete(`/admin/colors/${color.id}`);
        this.loadColors();
      } catch (error) {
        console.error('Ошибка удаления цвета:', error);
      }
    },
    editColor(color) {
      color.isEditing = true;
    },
    cancelEdit(color) {
      color.isEditing = false;
      this.loadColors(); // Перезагрузка цветов для отмены изменений
    },
  },
  mounted() {
    this.loadColors(); // Загрузка данных при монтировании компонента
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
