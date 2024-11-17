<template>
  <div>
    <h1>Регистрация</h1>
    <form @submit.prevent="submitRegistration">
      <div class="name-fields">
        <input type="text" placeholder="Имя" v-model="firstName" required />
        <input type="text" placeholder="Фамилия" v-model="lastName" required />
      </div>
      <input
          type="email"
          placeholder="Электронная почта"
          v-model="email"
          @blur="checkEmail"
          required
      />
      <span v-if="emailExists" class="error-message">
        Этот email уже зарегистрирован
      </span>

      <input type="password" placeholder="Пароль" v-model="password" required />
      <span v-if="password && password.length < 8" class="error-message">
        Пароль должен содержать не менее 8 символов
      </span>

      <input type="password" placeholder="Подтверждение пароля" v-model="confirmPassword" required />
      <span v-if="password !== confirmPassword && confirmPassword" class="error-message">
        Пароли не совпадают
      </span>

      <button type="submit" class="submit-button">Создать</button>
    </form>
    <p v-if="successMessage" class="success-message">
      Регистрация прошла успешно!
    </p>
    <p class="already-registered">
      Уже зарегистрированы? <a @click="goToLogin">Войти</a>
    </p>
  </div>
</template>

<script>
import axios from '@axios';

export default {
  name: 'RegistrationForm',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      emailExists: false,
      successMessage: false,
    };
  },
  methods: {
    async checkEmail() {
      try {
        const response = await axios.get('/users/check-email', {
          params: { email: this.email },
        });
        this.emailExists = response.data;
      } catch (error) {
        console.error('Ошибка при проверке email:', error);
      }
    },
    validatePassword() {
      return this.password === this.confirmPassword && this.password.length >= 8;
    },
    async submitRegistration() {
      if (!this.validatePassword()) {
        alert('Пароли не совпадают или пароль слишком короткий');
        return;
      }

      if (this.emailExists) {
        alert('Этот email уже зарегистрирован');
        return;
      }

      try {
        await axios.post('/users/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        });

        // Показываем сообщение об успехе пользователю
        this.successMessage = true;

        // Через 2 секунды перенаправляем на страницу входа
        setTimeout(() => {
          this.goToLogin();
        }, 2000);
      } catch (error) {
        console.error('Ошибка при регистрации:', error);
      }
    },
    goToLogin() {
      this.$router.push('/login');
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

.name-fields {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
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

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: block;
}

.already-registered {
  text-align: center;
  font-size: 0.875rem;
}

.already-registered a {
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}
</style>
