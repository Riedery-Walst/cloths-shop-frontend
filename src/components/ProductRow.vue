<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ product.name }}</td>
    <td>{{ product.sizes.join(', ') }}</td>
    <td>{{ product.colors.join(', ') }}</td>
    <td>
      <button @click="$emit('edit', product)">Изменить</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Добавьте стили, если необходимо */
</style>
