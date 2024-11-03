<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ size.name }}</td>
    <td>
      <button @click="$emit('edit', size)">Изменить</button>
      <button @click="$emit('delete', size)">Удалить</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'SizeRow',
  props: {
    size: Object,
    index: Number
  }
};
</script>

<style scoped>
/* Стили для строки */
button {
  margin-right: 5px;
}
</style>
