<template>
  <div class="main-page">
    <AppHeader />
    <div class="content">
      <FilterSidebar @filter="fetchFilteredProducts" />
      <ProductList :products="filteredProducts" />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import axios from '../axiosInstance';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import FilterSidebar from '../components/FilterSidebar.vue';
import ProductList from '../components/ProductList.vue';

export default {
  name: 'MainPage',
  components: { AppHeader, AppFooter, FilterSidebar, ProductList },
  data() {
    return {
      filteredProducts: [],
    };
  },
  methods: {
    async fetchFilteredProducts(filters) {
      try {
        const response = await axios.post('products/filter', {
          categoryId: filters.categories.length ? filters.categories[0] : null,
          colorIds: filters.colors,
          sizeIds: filters.sizes,
        });
        this.filteredProducts = response.data;
      } catch (error) {
        console.error('Ошибка при фильтрации товаров:', error);
      }
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
}
</style>
