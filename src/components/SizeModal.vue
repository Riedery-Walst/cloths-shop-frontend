<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>{{ isEdit ? 'Изменить размер' : 'Создать размер' }}</h2>
      <form @submit.prevent="submitForm">
        <label>
          Название размера:
          <input type="text" v-model="formData.name" placeholder="Название размера" required />
        </label>
        <button type="submit">{{ isEdit ? 'Сохранить изменения' : 'Создать' }}</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SizeModal',
  props: {
    isVisible: Boolean,
    isEdit: Boolean,
    sizeData: {
      type: Object,
      default: () => ({ name: '' })
    }
  },
  data() {
    return {
      formData: {
        name: this.sizeData.name || ''
      }
    };
  },
  watch: {
    sizeData: {
      immediate: true,
      handler(newData) {
        this.formData = { ...newData };
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    submitForm() {
      this.$emit('submit', { ...this.formData });
      this.closeModal();
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
button {
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}
</style>
