<template>
  <div class="container">
    <h1>Вход</h1>
    <p>Введите информацию ниже</p>
    <form @submit.prevent="submitLogin">
      <input
          type="email"
          placeholder="Электронная почта"
          v-model="email"
          :class="{'filled': email}"
          required
      />
      <input
          type="password"
          placeholder="Пароль"
          v-model="password"
          :class="{'filled': password}"
          required
      />

      <!-- Сообщение об ошибке -->
      <span v-if="loginError" class="error-message">
        Неверная электронная почта или пароль
      </span>

      <button type="submit" class="add-button">Войти</button>

      <!-- Ссылка для регистрации -->
      <p class="registration-link">
        Еще не зарегистрированы? <a href="/register">Регистрация</a>
      </p>
    </form>
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
  },
};
</script>

<style scoped>
.container {
  padding-left: 130px;
}

h1 {
  color: #181818;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  margin-top: 0;
}

p {
  margin-top: 24px;
  margin-bottom: 40px;
}

form {
  display: flex;
  flex-direction: column;
}

input[type="email"],
input[type="password"] {
  padding: 0.3rem 0.75rem 0.5rem 0;
  font-size: 1rem;
  margin-bottom: 2.5rem;
  border: none;
  border-bottom: 1px solid black; /* Стили для нижней границы */
  background-color: white;
  transition: all 0.3s ease;
}

/* Убираем стили при заполнении */
input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
}

/* Кнопка */
.add-button {
  width: 100%;
  background-color: #DB4444;
  color: white;
  font-size: 1rem;
  font-weight: normal;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  margin-bottom: 0.5rem; /* Снижаем отступ до 0.5rem */
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #E07575; /* Цвет при наведении */
}

/* Сообщение об ошибке */
.error-message {
  color: red;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

/* Стили для ссылки регистрации */
.registration-link {
  text-align: left;
  margin-top: 0.5rem; /* Снижаем отступ */
}

.registration-link a {
  color: rgba(0, 0, 0, 0.6); /* Тот же цвет, что и у кнопки */
  text-decoration: none;
  padding: 0.25rem 0; /* Добавляем немного отступа */
  border-bottom: 2px solid rgba(0, 0, 0, 0.6); /* Граница снизу */
  transition: all 0.3s ease; /* Плавное изменение */
}

.registration-link a:hover {
  border-color: #E2B93B;
  color: #E07575;
}
</style>
