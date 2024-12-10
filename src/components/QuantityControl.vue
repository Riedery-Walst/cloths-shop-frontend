<template>
  <div class="quantity-control">
    <button
        @click="decreaseQuantity"
        :disabled="quantity <= 1"
        class="quantity-btn decrease-btn"
    >
      <!-- SVG для кнопки уменьшения -->
      <svg width="24.000000" height="24.000000" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <desc>Created with Pixso.</desc>
        <defs>
          <clipPath id="clip5366_1063">
            <rect id="icon-minus" rx="0.000000" width="23.000000" height="23.000000" transform="translate(0.500000 0.500000)" fill="white" fill-opacity="0"/>
          </clipPath>
        </defs>
        <rect id="icon-minus" rx="0.000000" width="23.000000" height="23.000000" transform="translate(0.500000 0.500000)" fill="#FFFFFF" fill-opacity="0"/>
        <g clip-path="url(#clip5366_1063)">
          <path id="Vector" d="M20 12L4 12" stroke="#000000" stroke-opacity="1.000000" stroke-width="1.500000" stroke-linecap="round"/>
        </g>
      </svg>
    </button>
    <span class="quantity-counter">{{ quantity }}</span>
    <button @click="increaseQuantity" class="quantity-btn increase-btn">
      <!-- SVG для кнопки увеличения -->
      <svg width="24.000000" height="24.000000" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <desc>Created with Pixso.</desc>
        <defs>
          <clipPath id="clip5366_1067">
            <rect id="icon-plus" rx="0.000000" width="23.000000" height="23.000000" transform="translate(0.500000 0.500000)" fill="white" fill-opacity="0"/>
          </clipPath>
        </defs>
        <rect id="icon-plus" rx="0.000000" width="23.000000" height="23.000000" transform="translate(0.500000 0.500000)" fill="#FFFFFF" fill-opacity="0"/>
        <g clip-path="url(#clip5366_1067)">
          <path id="Vector" d="M12 20L12 12L12 4M12 12L20 12M12 12L4 12" stroke="#000000" stroke-opacity="1.000000" stroke-width="1.500000" stroke-linecap="round"/>
        </g>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    quantity: {
      type: Number,
      required: true,
    },
  },
  methods: {
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.$emit('update-quantity', this.quantity - 1);
      }
    },
    increaseQuantity() {
      this.$emit('update-quantity', this.quantity + 1);
    },
  },
};
</script>

<style scoped>
.quantity-control {
  width: 169px;
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0;
  padding: 0;
}

.quantity-btn {
  cursor: pointer;
  width: 40px;
  height: 44px;
  flex: none;
  margin: 0;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

.decrease-btn {
  border-radius: 4px 0 0 4px;
}

.increase-btn {
  border-radius: 0 4px 4px 0;
  background-color: #db4444;
}

.quantity-btn:hover {
  background-color: #E07575;
  border-color: #E07575;
  color: white;
}

.quantity-btn:active {
  background-color: #DB4444;
}

.quantity-btn:hover svg path {
  stroke: white; /* Изменяем цвет линии иконки на белый при наведении */
}

.quantity-btn svg path {
  stroke: #000000; /* Цвет иконки по умолчанию (черный) */
}

.increase-btn svg path {
  stroke: white; /* Устанавливаем цвет линии на белый */
}

.quantity-counter {
  width: 80px;
  height: 44px;
  font-weight: bold;
  margin: 0;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  text-align: center;
  line-height: 44px;
  font-size: 16px;
}
</style>
