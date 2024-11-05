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
        :size="size"
        :index="index"
        @save="saveSize(size)"
        @delete="deleteSize(size)"
        @edit="editSize(size)"
        @cancel="cancelEdit(size)"
    />
    </tbody>
  </table>
</template>

<script>
import SizeRow from './SizeRow.vue';

export default {
  components: {
    SizeRow,
  },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    saveSize(size) {
      this.$emit('save', size);
    },
    deleteSize(size) {
      this.$emit('delete', size);
    },
    editSize(size) {
      this.$emit('edit', size);
    },
    cancelEdit(size) {
      this.$emit('cancel', size);
    },
  },
};
</script>
