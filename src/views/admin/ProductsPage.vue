<template>
  <div class="admin-page">
    <Sidebar />
    <div class="main-content">
      <Header />
      <h2>Продукты</h2>
      <button @click="goToAddProductPage" class="add-button">Добавить</button>
      <ProductList
          ref="productList"
          :isAdmin="true"
          :showActions="true"
          @edit-product="goToEditProductPage"
          @delete-product="deleteProduct"
      />
    </div>
  </div>
</template>

<script>
import Sidebar from '@components/admin/AdminSidebar.vue';
import Header from '@components/admin/AdminHeader.vue';
import ProductList from '@components/ProductList.vue';
import axios from '@axios';

export default {
  components: {
    Sidebar,
    Header,
    ProductList
  },
  methods: {
    goToAddProductPage() {
      this.$router.push({ name: 'AdminAddProductPage' });
    },
    goToEditProductPage(product) {
      this.$router.push({name: 'AdminEditProductPage', params: {id: product.id}});
    },
    async deleteProduct(productId) {
      try {
        await axios.delete(`/admin/products/${productId}`);
        await this.$refs.productList.loadProducts(); // Обновляем список продуктов после удаления
      } catch (error) {
        console.error('Ошибка при удалении продукта:', error);
      }
    }
  }
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
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #444;
}
</style>
