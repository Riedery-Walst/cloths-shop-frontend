<template>
  <div class="image-box">
    <img :src="getImageUrl(imageUrl)" alt="Product Image" class="product-image" />
  </div>
</template>

<script>
export default {
  name: 'ImageSlider',
  props: {
    photos: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentPhotoIndex: 0
    };
  },
  computed: {
    hasPhotos() {
      return this.photos && this.photos.length > 0;
    },
    imageUrl() {
      return this.hasPhotos
          ? this.photos[this.currentPhotoIndex]
          : 'path/to/default-image.jpg';
    }
  },
  methods: {
    getImageUrl(imagePath) {
      const baseUrl = 'http://localhost:8080'; // Укажите URL вашего сервера
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
      }
      return `${baseUrl}/${imagePath.replace(/\\/g, '/')}`;
    }
  }
};
</script>

<style scoped>
.image-box {
  width: 100%;
  height: 420px; /* Задаем фиксированную высоту для изображения */
  overflow: hidden;
  border-radius: 4px; /* Сглаженные углы */
  position: relative;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Обеспечивает обрезку изображения для сохранения пропорций */
}
</style>
