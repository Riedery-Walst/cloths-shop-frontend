<template>
  <div class="main-page">
    <AppHeader />
    <AppFooter />
  </div>
</template>

<script>
import axios from '../axiosInstance';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import ProductList from '../components/ProductList.vue';

export default {
  name: 'MainPage',
  components: { AppHeader, AppFooter, ProductList },
};
</script>

<style scoped>
.content {
  display: flex;
}
</style>
