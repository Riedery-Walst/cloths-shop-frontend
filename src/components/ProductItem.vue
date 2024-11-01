<template>
  <div class="product-item">
    <img :src="product.image" :alt="product.name" class="product-image" />
    <div class="product-name">{{ product.name }}</div>
    <div class="product-price">{{ product.price }}₽</div>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    product: Object,
  },
};
</script>

<style scoped>
/* Стили для каждого товара */
</style>
