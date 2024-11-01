<template>
  <div class="background-image">
    <img :src="imageSrc" alt="Background" />
  </div>
</template>

<script>
export default {
  name: 'BackgroundImage',
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.background-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
