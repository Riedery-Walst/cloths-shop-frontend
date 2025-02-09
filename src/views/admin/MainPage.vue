<template>
  <div class="container">
    <Sidebar />
    <div class="content">
      <h1>Добро пожаловать, контент-менеджер!</h1>
      <p>Мы рады видеть вас сегодня.</p>
      <img :src="imageSrc" alt="Приветственное изображение" />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/admin/Sidebar.vue';
import wednesdayImage from '@/assets/wednesday.jpg'; // Статический импорт
import hiImage from '@/assets/hi.jpg'; // Статический импорт

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      imageSrc: new Date().getDay() === 3 ? wednesdayImage : hiImage
    };
  }
};
</script>

<style scoped>
.content {
  text-align: center;
  padding: 20px;
}
img {
  max-width: 100%;
  height: auto;
  margin-top: 20px;
}
</style>
