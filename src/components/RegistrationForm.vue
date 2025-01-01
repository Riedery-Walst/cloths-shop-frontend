<template>
  <div class="container">
    <h1>Регистрация</h1>
    <p>Введите информацию ниже</p>
    <form @submit.prevent="submitRegistration">
      <div class="name-fields">
        <input type="text" placeholder="Имя" v-model="firstName" required />
        <input type="text" placeholder="Фамилия" v-model="lastName" required />
      </div>
      <span v-if="emailExists" class="error-message">
        Этот email уже зарегистрирован
      </span>

      <input
          type="email"
          placeholder="Электронная почта"
          v-model="email"
          @blur="checkEmail"
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
      <span v-if="password && password.length < 8" class="error-message">
        Пароль должен содержать не менее 8 символов
      </span>

      <span v-if="password !== confirmPassword && confirmPassword" class="error-message">
        Пароли не совпадают
      </span>

      <input
          type="password"
          placeholder="Подтверждение пароля"
          v-model="confirmPassword"
          :class="{'filled': confirmPassword}"
          required
      />

      <button type="submit" class="add-button">Создать</button>
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

.name-fields {
  display: flex;
  width: 100%;
  gap: 1rem;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  padding: 0.3rem 0.75rem 0.5rem 0;
  font-size: 1rem;
  margin-bottom: 2.5rem;
  border: none;
  border-bottom: 1px solid black; /* Стили для нижней границы */
  background-color: white;
  transition: all 0.3s ease;
  box-sizing: border-box; /* Убедитесь, что padding и border входят в ширину элемента */
  flex-grow: 1; /* Это заставит поля расширяться и заполнять доступное пространство */
}

.name-fields input[type="text"] {
  flex-grow: 1; /* Устанавливаем, чтобы оба поля занимали равное пространство */
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
.already-registered {
  margin-top: 0.5rem  ;
}

.already-registered a {
  color: rgba(0, 0, 0, 0.6); /* Тот же цвет, что и у кнопки */
  text-decoration: none;
  padding: 0.25rem 0; /* Добавляем немного отступа */
  border-bottom: 2px solid rgba(0, 0, 0, 0.6); /* Граница снизу */
  transition: all 0.3s ease; /* Плавное изменение */
}

.already-registered a:hover {
  border-color: #E2B93B;
  color: #E07575;
}
</style>

