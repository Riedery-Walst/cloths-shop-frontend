<template>
  <button class="close-button" @click="$emit('click')">✕</button>
</template>

<script>
export default {
  name: 'CloseButton',
};
</script>

<style scoped>
.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
