<template>
  <div class="registration-container">
    <!-- Передаем путь к изображению как пропс -->
    <BackgroundImage imageSrc="src/assets/login-registration-background.webp" />
    <div class="registration-form">
      <RegistrationForm />
    </div>
  </div>
</template>

<script>
import BackgroundImage from '@/components/BackgroundImage.vue';
import RegistrationForm from '@/components/RegistrationForm.vue';

export default {
  name: 'RegistrationPage',
  components: {
    BackgroundImage,
    RegistrationForm,
  },
};
</script>

<style scoped>
.registration-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.registration-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
</style>
