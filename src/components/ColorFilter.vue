<template>
  <div>
    <h3>Цвет</h3>
    <select v-model="selectedColor">
      <option :value="null">Все</option>
      <option v-for="color in colors" :key="color.id" :value="color.name">{{ color.name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: ['colors', 'modelValue'],
  computed: {
    selectedColor: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
};
</script>
