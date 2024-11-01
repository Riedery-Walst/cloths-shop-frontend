<template>
  <div class="size-filter">
    <label>Размер</label>
    <div class="sizes">
      <span
          v-for="size in sizes"
          :key="size.id"
          class="size-option"
      >
        {{ size.label }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SizeFilter',
  data() {
    return {
      sizes: [],
    };
  },
  created() {
    this.fetchSizes();
  },
  methods: {
    async fetchSizes() {
      try {
        const response = await fetch('/api/sizes');
        this.sizes = await response.json();
      } catch (error) {
        console.error('Ошибка при загрузке размеров:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Стили для фильтра размеров */
</style>
