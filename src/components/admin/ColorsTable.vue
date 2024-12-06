<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Цвет</th>
      <th>HEX</th>
      <th>Предварительный цвет</th>
      <th>Действие</th>
    </tr>
    </thead>
    <tbody>
    <ColorRow
        v-for="(color, index) in colors"
        :key="color.id"
        :color="color"
        :index="index"
        @save="saveColor(color)"
        @delete="deleteColor(color)"
        @edit="editColor(color)"
        @cancel="cancelEdit(color)"
        @update-hex="(hex) => color.hex = hex"
    />
    </tbody>
  </table>
</template>

<script>
import ColorRow from '@components/admin/ColorRow.vue';

export default {
  components: {
    ColorRow,
  },
  props: {
    colors: {
      type: Array,
      required: true,
    },
  },
  methods: {
    saveColor(color) {
      this.$emit('save', color);
    },
    deleteColor(color) {
      this.$emit('delete', color);
    },
    editColor(color) {
      this.$emit('edit', color);
    },
    cancelEdit(color) {
      this.$emit('cancel', color);
    },
  },
};
</script>
