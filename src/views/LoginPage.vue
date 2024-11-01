<template>
  <div class="login-container">
    <BackgroundImage />
    <div class="login-form">
      <CloseButton @click="closeLogin" />
      <LoginForm />
    </div>
  </div>
</template>

<script>
import BackgroundImage from '../components/BackgroundImage.vue';
import CloseButton from '../components/CloseButton.vue';
import LoginForm from '../components/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: {
    BackgroundImage,
    CloseButton,
    LoginForm,
  },
  methods: {
    closeLogin() {
      // Закрытие формы или переход на другую страницу
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  background-color: #f9f9f9;
}

.login-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  position: relative;
}
</style>
