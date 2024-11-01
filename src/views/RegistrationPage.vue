<template>
  <div class="registration-container">
    <!-- Передаем путь к изображению как пропс -->
    <BackgroundImage imageSrc="src/assets/registration-background.jpg" />
    <div class="registration-form">
      <CloseButton @click="closeRegistration" />
      <RegistrationForm />
    </div>
  </div>
</template>

<script>
import BackgroundImage from '@/components/BackgroundImage.vue';
import CloseButton from '@/components/CloseButton.vue';
import RegistrationForm from '@/components/RegistrationForm.vue';

export default {
  name: 'RegistrationPage',
  components: {
    BackgroundImage,
    CloseButton,
    RegistrationForm,
  },
  methods: {
    closeRegistration() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.registration-container {
  display: flex;
  height: 100vh;
  background-color: #f9f9f9;
}

.registration-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  position: relative;
}
</style>
