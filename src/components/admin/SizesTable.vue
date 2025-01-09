<template>
  <table class="size-table">
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
import SizeRow from '@components/admin/SizeRow.vue';

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

<style scoped>
.size-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.size-table th,
.size-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.size-table th {
  background-color: #f4f4f4;
}

.size-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.size-table tr:hover {
  background-color: #f1f1f1;
}
</style>
