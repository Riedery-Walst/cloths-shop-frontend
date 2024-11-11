<template>
  <div class="product-item">
    <img :src="product.image" :alt="product.name" class="product-image" />
    <div class="product-name">{{ product.name }}</div>
    <div class="product-price">{{ product.price }} ₽</div>
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
.product-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.product-image {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-name {
  font-size: 1rem;
  font-weight: bold;
  margin: 5px 0;
}

.product-price {
  font-size: 0.9rem;
  color: #888;
}
</style>
