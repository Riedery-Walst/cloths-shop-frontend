<template>
  <div>
    <h1>Вход</h1>
    <form @submit.prevent="submitLogin">
      <input type="email" placeholder="Электронная почта" v-model="email" required />
      <input type="password" placeholder="Пароль" v-model="password" required />

      <!-- Сообщение об ошибке -->
      <span v-if="loginError" class="error-message">
        Неверная электронная почта или пароль
      </span>

      <button type="submit" class="submit-button">Войти</button>
    </form>
    <button class="register-button" @click="goToRegister">Регистрация</button>
    <a href="#" class="forgot-password">Забыли пароль?</a>
  </div>
</template>

<script>
import axios from '@axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      loginError: false, // Добавляем переменную для отображения ошибки
    };
  },
  methods: {
    async submitLogin() {
      this.loginError = false; // Сбрасываем ошибку при новой попытке входа
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
        this.loginError = true; // Устанавливаем ошибку, если запрос не удался
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
  color: #181818;
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

.submit-button {
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
  width: 100%;
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

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}
</style>
