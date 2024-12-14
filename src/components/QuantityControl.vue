<template>
  <div class="quantity-control">
    <!-- Слот для кнопки уменьшения -->
    <slot name="decrease-btn">
      <button @click="decreaseQuantity" :disabled="quantity <= 1" class="quantity-btn decrease-btn">
        <!-- SVG для кнопки уменьшения -->
        <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none">
          <defs>
            <clipPath id="clip5366_1063">
              <rect id="icon-minus" rx="0.000000" width="1.4375rem" height="1.4375rem" transform="translate(0.5rem 0.5rem)" fill="white" fill-opacity="0"/>
            </clipPath>
          </defs>
          <rect id="icon-minus" rx="0.000000" width="1.4375rem" height="1.4375rem" transform="translate(0.5rem 0.5rem)" fill="#FFFFFF" fill-opacity="0"/>
          <g clip-path="url(#clip5366_1063)">
            <path id="Vector" d="M20 12L4 12" stroke="#000000" stroke-opacity="1.000000" stroke-width="0.09375rem" stroke-linecap="round"/>
          </g>
        </svg>
      </button>
    </slot>

    <!-- Слот для отображения количества -->
    <slot name="counter">
      <span class="quantity-counter">{{ quantity }}</span>
    </slot>

    <!-- Слот для кнопки увеличения -->
    <slot name="increase-btn">
      <button @click="increaseQuantity" class="quantity-btn increase-btn">
        <!-- SVG для кнопки увеличения -->
        <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none">
          <defs>
            <clipPath id="clip5366_1067">
              <rect id="icon-plus" rx="0.000000" width="1.4375rem" height="1.4375rem" transform="translate(0.5rem 0.5rem)" fill="white" fill-opacity="0"/>
            </clipPath>
          </defs>
          <rect id="icon-plus" rx="0.000000" width="1.4375rem" height="1.4375rem" transform="translate(0.5rem 0.5rem)" fill="#FFFFFF" fill-opacity="0"/>
          <g clip-path="url(#clip5366_1067)">
            <path id="Vector" d="M12 20L12 12L12 4M12 12L20 12M12 12L4 12" stroke="#000000" stroke-opacity="1.000000" stroke-width="0.09375rem" stroke-linecap="round"/>
          </g>
        </svg>
      </button>
    </slot>
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
  width: 10.5625rem; /* 169px */
  height: 2.75rem; /* 44px */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0;
  padding: 0;
}

.quantity-btn {
  cursor: pointer;
  width: 2.5rem; /* 40px */
  height: 2.75rem; /* 44px */
  flex: none;
  margin: 0;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.25rem; /* 4px */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

.decrease-btn {
  border-radius: 0.25rem 0 0 0.25rem; /* 4px */
}

.increase-btn {
  border-radius: 0 0.25rem 0.25rem 0; /* 4px */
  background-color: #db4444;
  border-color: #db4444;
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
  width: 5rem; /* 80px */
  height: 2.75rem; /* 44px */
  font-weight: bold;
  margin: 0;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  text-align: center;
  line-height: 2.75rem; /* 44px */
  font-size: 1rem; /* 16px */
}
</style>
