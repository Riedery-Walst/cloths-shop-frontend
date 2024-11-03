<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Цвет</th>
      <th>HEX</th>
      <th>Предварительный просмотр</th>
      <th>Действие</th>
    </tr>
    </thead>
    <tbody>
    <ColorRow
        v-for="(color, index) in colors"
        :key="color.id"
        :index="index"
        :color="color"
        @edit="onEdit"
        @delete="onDelete"
    />
    </tbody>
  </table>
</template>

<script>
import ColorRow from './ColorRow.vue';

export default {
  name: 'ColorTable',
  components: {ColorRow},
  props: {
    colors: Array
  },
  methods: {
    onEdit(color) {
      this.$emit('edit', color);
    },
    onDelete(color) {
      this.$emit('delete', color);
    }
  }
};
</script>

<style scoped>
/* Добавьте стили для таблицы, если необходимо */
</style>
