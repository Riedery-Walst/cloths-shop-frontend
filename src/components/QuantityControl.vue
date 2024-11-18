<template>
  <div class="quantity-control">
    <button @click="decreaseQuantity">-</button>
    <span>{{ quantity }}</span>
    <button @click="increaseQuantity">+</button>
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
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-control button {
  background: none;
  border: 1px solid #ccc;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}
</style>
