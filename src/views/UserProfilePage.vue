<template>
  <div class="user-page">
    <AppHeader />
    <div class="user-container">
      <h1>Профиль пользователя</h1>

      <!-- Форма AccountInfoForm -->
      <AccountInfoForm :form="form" :countries="countries" :isEditing="isEditing" />

      <!-- Кнопки управления -->
      <div class="user-actions">
        <button class="edit-button" @click="toggleEditMode">
          {{ isEditing ? "Сохранить" : "Редактировать" }}
        </button>
        <button v-if="isEditing" class="cancel-button" @click="cancelEdit">Отменить</button>
        <button class="logout-button" @click="logout">Выйти из аккаунта</button>
        <button class="delete-button" @click="deleteProfileConfirmation">Удалить профиль</button>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@components/AppHeader.vue";
import AppFooter from "@components/AppFooter.vue";
import AccountInfoForm from "@components/AccountInfoForm.vue";
import { getProfile, updateProfile, deleteProfile } from "@services/profileService.js";

export default {
  components: {
    AppHeader,
    AppFooter,
    AccountInfoForm,
  },
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: {
          country: "",
          city: "",
          street: "",
          house: "",
          apartment: "",
          postalCode: "",
        },
      },
      originalForm: {}, // Для хранения оригинальных данных
      isEditing: false, // Состояние редактирования
      countries: [
        { code: "RU", name: "Россия" },
        { code: "KZ", name: "Казахстан" },
        { code: "BY", name: "Беларусь" },
      ],
    };
  },
  methods: {
    async fetchProfileData() {
      try {
        const profile = await getProfile();
        this.form = { ...profile };
        this.originalForm = { ...profile }; // Сохраняем оригинальные данные
      } catch (error) {
        console.error("Ошибка загрузки данных профиля:", error);
        alert("Не удалось загрузить данные профиля.");
      }
    },
    toggleEditMode() {
      if (this.isEditing) {
        // Сохраняем данные при выключении режима редактирования
        this.saveUserData();
      }
      this.isEditing = !this.isEditing;
    },
    async saveUserData() {
      try {
        await updateProfile(this.form);
        alert("Данные успешно сохранены!");
        this.originalForm = {...this.form}; // Обновляем оригинальные данные
      } catch (error) {
        console.error("Ошибка сохранения данных профиля:", error);
        alert("Не удалось сохранить данные.");
      }
    },
    cancelEdit() {
      // Отмена изменений, возвращаемся к оригинальным данным
      this.form = {...this.originalForm};
      this.isEditing = false;
    },
    async logout() {
      try {
        // Удаляем токен из localStorage
        localStorage.removeItem("authToken");
        alert("Вы успешно вышли из аккаунта.");
        window.location.href = "/login"; // Перенаправляем на страницу входа
      } catch (error) {
        console.error("Ошибка выхода из аккаунта:", error);
        alert("Не удалось выйти из аккаунта.");
      }
    },
    async deleteProfileConfirmation() {
      if (confirm("Вы уверены, что хотите удалить профиль? Это действие необратимо.")) {
        await this.deleteProfile();
      }
    },
    async deleteProfile() {
      try {
        await deleteProfile();
        alert("Ваш профиль успешно удалён.");
        localStorage.removeItem("authToken"); // Удаляем токен после удаления профиля
        window.location.href = "/"; // Перенаправляем на главную страницу
      } catch (error) {
        console.error("Ошибка удаления профиля:", error);
        alert("Не удалось удалить профиль.");
      }
    },
  },
  async mounted() {
    await this.fetchProfileData();
  },
};
</script>

<style scoped>
.user-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.user-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.user-actions {
  display: flex;
  gap: 10px;
}

.edit-button,
.cancel-button,
.logout-button,
.delete-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button {
  background-color: #007bff;
  color: white;
}

.cancel-button {
  background-color: #ffc107;
  color: white;
}

.logout-button {
  background-color: #17a2b8;
  color: white;
}

.delete-button {
  background-color: #dc3545;
  color: white;
}

.edit-button:hover {
  background-color: #0056b3;
}

.cancel-button:hover {
  background-color: #e0a800;
}

.logout-button:hover {
  background-color: #138496;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>
