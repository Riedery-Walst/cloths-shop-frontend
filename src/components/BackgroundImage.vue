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
  width: 55%;
  height: 82.3vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FBC7C4;
  padding: 0;

}

.background-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding: 0;
}
</style>
