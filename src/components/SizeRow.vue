<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>
      <input
          v-if="size.isEditing"
          v-model="size.name"
          type="text"
      />
      <span v-else>{{ size.name }}</span>
    </td>
    <td>
      <button v-if="size.isEditing" @click="saveSize">Сохранить</button>
      <button v-else @click="$emit('edit')">Изменить</button>
      <button v-if="size.isEditing" @click="$emit('cancel')">Отменить</button>
      <button v-else @click="$emit('delete')">Удалить</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    size: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    saveSize() {
      this.$emit('save');
    },
  },
};
</script>
