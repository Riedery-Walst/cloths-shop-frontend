<template>
  <div class="image-slider">
    <button @click="prevImage" v-if="showArrows && hasPhotos" class="arrow-button">❮</button>
    <img :src="getImageUrl(imageUrl)" alt="Product Image" class="product-image" />
    <button @click="nextImage" v-if="showArrows && hasPhotos" class="arrow-button">❯</button>
  </div>
</template>

<script>
export default {
  name: 'ImageSlider',
  props: {
    photos: {
      type: Array,
      default: () => []
    },
    showArrows: {
      type: Boolean,
      default: true
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
    nextImage() {
      if (this.hasPhotos) {
        this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photos.length;
      }
    },
    prevImage() {
      if (this.hasPhotos) {
        this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.photos.length) % this.photos.length;
      }
    },
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
.image-slider {
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

.arrow-button {
  position: absolute;
  top: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  font-size: 16px;
  transform: translateY(-50%);
}

.arrow-button:first-of-type {
  left: 5px;
}

.arrow-button:last-of-type {
  right: 5px;
}
</style>
