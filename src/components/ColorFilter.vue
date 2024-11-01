<template>
  <div class="color-filter">
    <label>Цвет</label>
    <div class="colors">
      <span
          v-for="color in colors"
          :key="color.id"
          :style="{ backgroundColor: color.hexCode }"
          class="color-circle"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorFilter',
  data() {
    return {
      colors: [],
    };
  },
  created() {
    this.fetchColors();
  },
  methods: {
    async fetchColors() {
      try {
        const response = await fetch('/api/colors');
        this.colors = await response.json();
      } catch (error) {
        console.error('Ошибка при загрузке цветов:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Стили для фильтра цветов */
</style>
