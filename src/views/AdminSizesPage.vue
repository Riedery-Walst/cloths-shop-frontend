<template>
  <div class="sizes-view">
    <Sidebar />
    <div class="content">
      <Header title="Размер" />
      <button @click="openAddModal">Добавить</button>
      <SizeTable :sizes="sizes" @edit="openEditModal" @delete="deleteSize" />

      <!-- Модальное окно для добавления и редактирования размеров -->
      <SizeModal
          v-if="isModalVisible"
          :isVisible="isModalVisible"
          :isEdit="isEdit"
          :sizeData="selectedSize"
          @close="closeModal"
          @submit="handleFormSubmit"
      />
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/AdminSidebar.vue';
import Header from '../components/AdminHeader.vue';
import SizeTable from '../components/SizeTable.vue';
import SizeModal from '../components/SizeModal.vue';
import axios from '../axiosInstance';

export default {
  name: 'SizesView',
  components: { Sidebar, Header, SizeTable, SizeModal },
  data() {
    return {
      sizes: [],
      isModalVisible: false,
      isEdit: false,
      selectedSize: { name: '' }
    };
  },
  created() {
    this.fetchSizes();
  },
  methods: {
    async fetchSizes() {
      try {
        const response = await axios.get('/sizes');
        this.sizes = response.data;
      } catch (error) {
        console.error('Error fetching sizes:', error);
      }
    },
    openAddModal() {
      this.selectedSize = { name: '' };
      this.isEdit = false;
      this.isModalVisible = true;
    },
    openEditModal(size) {
      this.selectedSize = { ...size };
      this.isEdit = true;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async handleFormSubmit(sizeData) {
      if (this.isEdit) {
        await this.updateSize(sizeData);
      } else {
        await this.addSize(sizeData);
      }
      this.fetchSizes();
    },
    async addSize(sizeData) {
      try {
        await axios.post('/admin/sizes', sizeData);
      } catch (error) {
        console.error('Error adding size:', error);
      }
    },
    async updateSize(sizeData) {
      try {
        await axios.put(`/admin/sizes/${sizeData.id}`, sizeData);
      } catch (error) {
        console.error('Error updating size:', error);
      }
    },
    async deleteSize(size) {
      try {
        await axios.delete(`/admin/sizes/${size.id}`);
        this.fetchSizes();
      } catch (error) {
        console.error('Error deleting size:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Добавьте стили для страницы, если необходимо */
</style>
