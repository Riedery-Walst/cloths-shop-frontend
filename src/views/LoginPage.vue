<template>
  <div class="login-container">
    <!-- Передаем путь к изображению через imageSrc -->
    <BackgroundImage imageSrc="/src/assets/login-registration-background.webp" />
    <div class="login-form">
      <LoginForm />
    </div>
  </div>
</template>

<script>
import BackgroundImage from '@components/BackgroundImage.vue';
import LoginForm from '@components/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: {
    BackgroundImage,
    LoginForm,
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
</style>
