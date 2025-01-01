<template>
  <div class="colors-page container">
    <Sidebar />
    <div>
      <Header />
      <button @click="goToAddProductPage" class="add-button">Добавить</button>
      <!-- Передаем customClass только на этой странице -->
      <ProductList
          ref="productList"
          :isAdmin="true"
          :showActions="true"
          :customClass="customProductListClass"
          @edit-product="goToEditProductPage"
          @delete-product="deleteProduct"
      />
    </div>
  </div>
</template>

<script>
import Sidebar from '@components/admin/AdminSidebar.vue';
import ProductList from '@components/ProductList.vue';
import axios from '@axios';

export default {
  components: {
    Sidebar,
    ProductList
  },
  data() {
    return {
      customProductListClass: 'custom-product-list-gap'  // Класс для кастомного gap
    };
  },
  methods: {
    goToAddProductPage() {
      this.$router.push({ name: 'AdminAddProductPage' });
    },
    goToEditProductPage(product) {
      this.$router.push({ name: 'AdminEditProductPage', params: { id: product.id } });
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
.add-button {
  margin-bottom: 10px;
  padding: 5px 10px;
}

.colors-page {
  display: flex;
  flex-grow: 1;
}

</style>
