<template>
  <div class="main-page">
    <div class="container">
      <ProductList />
    </div>
  </div>
</template>

<script>
import ProductList from '@components/ProductList.vue';

export default {
  name: 'MainPage',
  components: {ProductList},
};
</script>

<style scoped>

</style>
