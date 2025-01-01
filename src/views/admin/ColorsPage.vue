<template>
  <div class="colors-page container">
    <Sidebar />
    <div>
      <Header />
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
import ColorTable from '@/components/admin/ColorsTable.vue';
import axios from '@axios';

export default {
  components: {
    Sidebar,
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
.colors-page {
  display: flex;
}

.add-button {
  font-size: 16px;
  height: 44px;
  width: 125px;
  background-color: #db4444;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #E07575;
}

</style>
