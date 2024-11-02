<template>
  <div class="filter-sidebar">
    <h3>Фильтр</h3>

    <!-- Категории -->
    <div class="category-section">
      <h4>Категории</h4>
      <ul>
        <li v-for="category in topLevelCategories" :key="category.id">
          <div class="category-item" @click="handleCategoryClick(category)">
            {{ category.name }}
            <span v-if="category.children.length" @click.stop="toggleCategory(category)">▶</span>
          </div>
          <!-- Дочерние категории -->
          <ul v-if="isCategoryOpen(category)" class="child-categories">
            <li v-for="child in category.children" :key="child.id" @click="handleCategoryClick(child)">
              {{ child.name }}
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- Цвета -->
    <div class="filter-section">
      <h4 @click="toggleColorFilter">Цвет <span v-if="isColorFilterOpen">▲</span><span v-else>▼</span></h4>
      <div v-if="isColorFilterOpen" class="color-filter">
                <span v-for="color in colors" :key="color.id"
                      :style="{ backgroundColor: color.name }"
                      class="color-circle"
                      @click="selectColor(color)">
                </span>
      </div>
    </div>

    <!-- Размеры -->
    <div class="filter-section">
      <h4 @click="toggleSizeFilter">Размер <span v-if="isSizeFilterOpen">▲</span><span v-else>▼</span></h4>
      <div v-if="isSizeFilterOpen" class="size-filter">
                <span v-for="size in sizes" :key="size.id"
                      class="size-circle"
                      @click="selectSize(size)">
                    {{ size.name }}
                </span>
      </div>
    </div>

    <button @click="applyFilters" class="apply-filter-button">Применить фильтр</button>
  </div>
</template>

<script>
import axios from '../axiosInstance';

export default {
  data() {
    return {
      colors: [],
      sizes: [],
      categories: [],
      selectedCategories: [],
      selectedColor: null,
      selectedSize: null,
      openCategories: [],
      isColorFilterOpen: true,
      isSizeFilterOpen: true,
    };
  },
  computed: {
    topLevelCategories() {
      return this.categories.filter(category => category.parent === null);
    }
  },
  created() {
    this.fetchFilters();
  },
  methods: {
    async fetchFilters() {
      try {
        const [colorsResponse, sizesResponse, categoriesResponse] = await Promise.all([
          axios.get('/colors'),
          axios.get('/sizes'),
          axios.get('/categories')
        ]);
        this.colors = colorsResponse.data;
        this.sizes = sizesResponse.data;
        this.categories = categoriesResponse.data;
      } catch (error) {
        console.error('Ошибка при загрузке фильтров:', error);
      }
    },
    toggleCategory(category) {
      if (this.openCategories.includes(category.id)) {
        this.openCategories = this.openCategories.filter(id => id !== category.id);
      } else {
        this.openCategories.push(category.id);
      }
    },
    isCategoryOpen(category) {
      return this.openCategories.includes(category.id);
    },
    handleCategoryClick(category) {
      // При клике на категорию, отправляем событие для фильтрации товаров по ID категории
      this.$emit('filter', {
        categories: [category.id],
        colors: this.selectedColor ? [this.selectedColor.id] : [],
        sizes: this.selectedSize ? [this.selectedSize.id] : []
      });
    },
    toggleColorFilter() {
      this.isColorFilterOpen = !this.isColorFilterOpen;
    },
    toggleSizeFilter() {
      this.isSizeFilterOpen = !this.isSizeFilterOpen;
    },
    selectColor(color) {
      this.selectedColor = this.selectedColor === color ? null : color;
    },
    selectSize(size) {
      this.selectedSize = this.selectedSize === size ? null : size;
    },
    applyFilters() {
      this.$emit('filter', {
        colors: this.selectedColor ? [this.selectedColor.id] : [],
        sizes: this.selectedSize ? [this.selectedSize.id] : [],
        categories: this.selectedCategories
      });
    }
  }
};
</script>

<style scoped>
.filter-sidebar {
  width: 250px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
}

.category-section ul {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.category-item {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.child-categories {
  margin-left: 20px;
}

.filter-section {
  margin-bottom: 20px;
}

.color-filter, .size-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 0;
}

.color-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s;
}

.color-circle:hover, .color-circle.active {
  border-color: #000;
}

.size-filter .size-circle {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 15px;
  cursor: pointer;
  font-size: 14px;
}

.size-filter .size-circle:hover, .size-filter .size-circle.active {
  background-color: #000;
  color: #fff;
}

.apply-filter-button {
  width: 100%;
  padding: 10px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
}

.apply-filter-button:hover {
  background-color: #333;
}
</style>
