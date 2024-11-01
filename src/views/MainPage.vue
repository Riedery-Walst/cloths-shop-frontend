<template>
  <div class="main-page">
    <AppHeader />
    <div class="content">
      <FilterSidebar />
      <ProductList />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import FilterSidebar from '../components/FilterSidebar.vue';
import ProductList from '../components/ProductList.vue';

export default {
  name: 'MainPage',
  components: { AppHeader, AppFooter, FilterSidebar, ProductList },
};
</script>

<style scoped>
/* Стили для главной страницы */
</style>
