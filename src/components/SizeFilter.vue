<template>
  <div>
    <h3>Размер</h3>
    <select v-model="selectedSize">
      <option :value="null">Все</option>
      <option v-for="size in sizes" :key="size.id" :value="size.name">{{ size.name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: ['sizes', 'modelValue'],
  computed: {
    selectedSize: {
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
