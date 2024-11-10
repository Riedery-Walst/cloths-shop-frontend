<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Продукт</th>
      <th>Размер</th>
      <th>Цвет</th>
      <th>Действие</th>
    </tr>
    </thead>
    <tbody>
    <ProductRow
        v-for="(product, index) in products"
        :key="product.id"
        :product="product"
        :index="index"
        @edit="handleEdit(product)"
    />
    </tbody>
  </table>
</template>

<script>
import ProductRow from './ProductRow.vue';

export default {
  components: {
    ProductRow,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleEdit(product) {
      this.$emit('edit', product);
    },
  },
};
</script>
