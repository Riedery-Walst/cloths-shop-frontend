<template>
  <div :class="['products-list', customClass]"> <!-- Применяем переданный класс -->
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
import ProductCard from '@components/ProductCard.vue';
import axios from '@axios';

export default {
  name: 'ProductList',
  components: { ProductCard },
  props: {
    isAdmin: {
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
    },
    customClass: {  // Пропс для кастомного класса
      type: String,
      default: ''
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
.products-list {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px 80px;
}

.custom-product-list-gap {
  gap: 60px;
}
</style>
