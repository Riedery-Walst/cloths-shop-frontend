<template>
  <div class="colors-view">
    <Sidebar />
    <div class="content">
      <Header title="Цвет" />
      <button @click="openAddModal">Добавить</button>
      <ColorTable :colors="colors" @edit="openEditModal" @delete="deleteColor" />

      <ColorModal
          v-if="isModalVisible"
          :isVisible="isModalVisible"
          :isEdit="isEdit"
          :colorData="selectedColor"
          @close="closeModal"
          @submit="handleFormSubmit"
      />
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/AdminSidebar.vue';
import Header from '../components/AdminHeader.vue';
import ColorTable from '../components/ColorTable.vue';
import ColorModal from '../components/ColorModal.vue';
import axios from '../axiosInstance';

export default {
  name: 'ColorsView',
  components: {Sidebar, Header, ColorTable, ColorModal},
  data() {
    return {
      colors: [],
      isModalVisible: false,
      isEdit: false,
      selectedColor: {name: '', hex: ''}
    };
  },
  created() {
    this.fetchColors();
  },
  methods: {
    async fetchColors() {
      try {
        const response = await axios.get('/colors');
        this.colors = response.data;
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    },
    openAddModal() {
      this.selectedColor = {name: '', hex: ''};
      this.isEdit = false;
      this.isModalVisible = true;
    },
    openEditModal(color) {
      this.selectedColor = {...color};
      this.isEdit = true;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async handleFormSubmit(colorData) {
      if (this.isEdit) {
        await this.updateColor(colorData);
      } else {
        await this.addColor(colorData);
      }
      this.fetchColors();
    },
    async addColor(colorData) {
      try {
        await axios.post('/admin/colors', colorData);
      } catch (error) {
        console.error('Error adding color:', error);
      }
    },
    async updateColor(colorData) {
      try {
        await axios.put(`/admin/colors/${colorData.id}`, colorData);
      } catch (error) {
        console.error('Error updating color:', error);
      }
    },
    async deleteColor(color) {
      try {
        await axios.delete(`/admin/colors/${color.id}`);
        this.fetchColors();
      } catch (error) {
        console.error('Error deleting color:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Добавьте стили для страницы, если необходимо */
</style>
