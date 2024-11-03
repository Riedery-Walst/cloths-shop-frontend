<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ color.name }}</td>
    <td>{{ color.hex }}</td>
    <td>
      <div class="color-preview" :style="{ backgroundColor: `#${color.hex}` }"></div>
    </td>
    <td>
      <button @click="$emit('edit', color)">Изменить</button>
      <button @click="$emit('delete', color)">Удалить</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'ColorRow',
  props: {
    color: Object,
    index: Number
  }
};
</script>

<style scoped>
/* Стиль для предварительного просмотра цвета */
.color-preview {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
