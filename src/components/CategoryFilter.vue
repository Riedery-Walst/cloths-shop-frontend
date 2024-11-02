<template>
  <div>
    <h3>Категории</h3>
    <ul>
      <li v-for="category in categories" :key="category.id">
        <div @click="toggleCategory(category)">{{ category.name }}</div>
        <ul v-if="isCategorySelected(category)">
          <li v-for="child in category.children" :key="child.id">{{ child.name }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['categories', 'selected'],
  methods: {
    toggleCategory(category) {
      this.$emit('select', category);
    },
    isCategorySelected(category) {
      return this.selected.includes(category);
    }
  }
};
</script>
