<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>{{ isEdit ? 'Изменить цвет' : 'Создать цвет' }}</h2>
      <form @submit.prevent="submitForm">
        <label>
          Название цвета:
          <input type="text" v-model="formData.name" placeholder="Название цвета" required />
        </label>
        <label>
          HEX:
          <div class="hex-input">
            <span>#</span>
            <input type="text" v-model="formData.hex" placeholder="HEX" required />
            <input type="color" v-model="colorPicker" @input="updateHexFromPicker" />
          </div>
        </label>
        <button type="submit" :disabled="isSubmitting">{{ isEdit ? 'Сохранить изменения' : 'Создать' }}</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorModal',
  props: {
    isVisible: Boolean,
    isEdit: Boolean,
    colorData: {
      type: Object,
      default: () => ({ name: '', hex: '' })
    }
  },
  data() {
    return {
      formData: {
        name: this.colorData.name || '',
        hex: this.colorData.hex || ''
      },
      colorPicker: `#${this.colorData.hex || 'ffffff'}`,
      isSubmitting: false
    };
  },
  watch: {
    colorData: {
      immediate: true,
      handler(newData) {
        this.formData = { ...newData };
        this.colorPicker = `#${newData.hex || 'ffffff'}`;
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async submitForm() {
      if (!this.formData.name || !this.formData.hex) {
        console.error("Поля 'Название цвета' и 'HEX' не могут быть пустыми");
        return;
      }

      if (this.isSubmitting) return;

      this.isSubmitting = true;
      try {
        console.log("Отправка данных:", this.formData);
        this.$emit('submit', this.formData); // Отправляем данные в формате JSON
      } finally {
        this.isSubmitting = false;
        this.closeModal();
      }
    },
    updateHexFromPicker() {
      this.formData.hex = this.colorPicker.replace('#', '');
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
.hex-input {
  display: flex;
  align-items: center;
}
.hex-input input[type="text"] {
  width: 70px;
  margin-right: 10px;
}
.hex-input input[type="color"] {
  width: 30px;
  height: 30px;
  border: none;
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
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
