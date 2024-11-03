<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Размер</th>
      <th>Действие</th>
    </tr>
    </thead>
    <tbody>
    <SizeRow
        v-for="(size, index) in sizes"
        :key="size.id"
        :index="index"
        :size="size"
        @edit="onEdit"
        @delete="onDelete"
    />
    </tbody>
  </table>
</template>

<script>
import SizeRow from './SizeRow.vue';

export default {
  name: 'SizeTable',
  components: { SizeRow },
  props: {
    sizes: Array
  },
  methods: {
    onEdit(size) {
      this.$emit('edit', size);
    },
    onDelete(size) {
      this.$emit('delete', size);
    }
  }
};
</script>

<style scoped>
/* Добавьте стили для таблицы, если необходимо */
</style>
