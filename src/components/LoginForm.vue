<template>
  <div>
    <h1>Вход</h1>
    <form @submit.prevent="submitLogin">
      <input type="email" placeholder="Электронная почта" v-model="email" required />
      <input type="password" placeholder="Пароль" v-model="password" required />
      <button type="submit" class="login-button">Войти</button>
    </form>
    <button class="register-button" @click="goToRegister">Регистрация</button>
    <a href="#" class="forgot-password">Забыли пароль?</a>
  </div>
</template>

<script>
import axios from '../axiosInstance';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async submitLogin() {
      try {
        const response = await axios.post('/auth/login', {
          email: this.email,
          password: this.password,
        });

        console.log('Login successful:', response.data);

        // Сохраняем токен в localStorage
        localStorage.setItem('authToken', response.data.token);

        // Перенаправляем пользователя на главную страницу после входа
        this.$router.push('/');
      } catch (error) {
        console.error('Ошибка при входе:', error);
      }
    },
    goToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
}

input[type="email"],
input[type="password"] {
  padding: 0.75rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
}

.login-button {
  background-color: black;
  color: white;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.register-button {
  background: none;
  color: blue;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid blue;
  border-radius: 0.5rem;
  cursor: pointer;
}

.forgot-password {
  color: blue;
  text-align: right;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>
