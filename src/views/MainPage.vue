<template>
  <div class="main-page">
    <AppHeader />
    <ProductList />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import ProductList from '../components/ProductList.vue';

export default {
  name: 'MainPage',
  components: { AppHeader, AppFooter, ProductList },
};
</script>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>
