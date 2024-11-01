<template>
  <div class="product-list">
    <ProductItem v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script>
import axios from '../axiosInstance';
import ProductItem from './ProductItem.vue';

export default {
  name: 'ProductList',
  components: { ProductItem },
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('/products');
        this.products = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Стили для списка товаров */
</style>
