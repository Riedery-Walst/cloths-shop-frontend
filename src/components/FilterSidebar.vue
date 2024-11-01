<template>
  <aside class="filter-sidebar">
    <CategoryFilter />
    <div class="price-filter">
      <label>Цена</label>
      <input type="range" min="1000" max="20000" v-model="priceRange" />
    </div>
    <ColorFilter />
    <SizeFilter />
    <button @click="applyFilters">Применить фильтр</button>
  </aside>
</template>

<script>
import CategoryFilter from './CategoryFilter.vue';
import ColorFilter from './ColorFilter.vue';
import SizeFilter from './SizeFilter.vue';

export default {
  name: 'FilterSidebar',
  components: { CategoryFilter, ColorFilter, SizeFilter },
  data() {
    return {
      priceRange: [1000, 20000],
    };
  },
  methods: {
    applyFilters() {
      // Функция для применения фильтров
    },
  },
};
</script>

<style scoped>
/* Стили для боковой панели */
</style>
