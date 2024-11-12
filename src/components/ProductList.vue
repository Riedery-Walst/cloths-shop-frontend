<template>
  <div class="products-list">
    <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :isAdmin="isAdmin"
    :showActions="showActions"
    :showImageArrows="showImageArrows"
    @edit-product="editProduct"
    @delete-product="deleteProduct"
    />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
import axios from '../axiosInstance';

export default {
  name: 'ProductList',
  components: { ProductCard },
  props: {
    isAdmin: { // добавлено
      type: Boolean,
      default: false
    },
    showActions: {
      type: Boolean,
      default: false
    },
    showImageArrows: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      products: []
    };
  },
  methods: {
    async loadProducts() {
      try {
        const response = await axios.get('/products');
        this.products = response.data.map(product => ({
          ...product,
          photos: product.photos || ['path/to/default-image.jpg']
        }));
      } catch (error) {
        console.error('Ошибка загрузки продуктов:', error);
      }
    },
    editProduct(product) {
      this.$emit('edit-product', product);
    },
    deleteProduct(productId) {
      this.$emit('delete-product', productId);
    }
  },
  mounted() {
    this.loadProducts();
  }
};
</script>

<style scoped>
</style>