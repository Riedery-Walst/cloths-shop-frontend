<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>
      <input
          v-if="color.isEditing"
          v-model="color.name"
          type="text"
      />
      <span v-else>{{ color.name }}</span>
    </td>
    <td>
      <input
          v-if="color.isEditing"
          v-model="color.hex"
          type="text"
      />
      <span v-else>{{ color.hex }}</span>
    </td>
    <td>
      <input
          type="color"
          v-model="color.hex"
          @input="updateHex"
          class="color-preview"
          :disabled="!color.isEditing"
      />
    </td>
    <td>
      <button v-if="color.isEditing" @click="saveColor">Сохранить</button>
      <button v-else @click="$emit('edit')">Изменить</button>
      <button v-if="color.isEditing" @click="$emit('cancel')">Отменить</button>
      <button v-else @click="$emit('delete')">Удалить</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    color: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    updateHex(event) {
      this.$emit('update-hex', event.target.value);
    },
    saveColor() {
      this.$emit('save');
    },
  },
};
</script>

<style scoped>
.color-preview {
  width: 40px;
  height: 40px;
  border: none;
}
</style>
