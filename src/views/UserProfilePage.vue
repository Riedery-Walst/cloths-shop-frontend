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
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@components/AppHeader.vue";
import AppFooter from "@components/AppFooter.vue";
import AccountInfoForm from "@components/AccountInfoForm.vue"; // Используемый компонент
import { getProfile, updateProfile } from "@services/profileService.js"; // Работа с профилем

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
        country: "",
        city: "",
        street: "",
        house: "",
        apartment: "",
        zipCode: "",
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
        this.originalForm = { ...this.form }; // Обновляем оригинальные данные
      } catch (error) {
        console.error("Ошибка сохранения данных профиля:", error);
        alert("Не удалось сохранить данные.");
      }
    },
    cancelEdit() {
      // Отмена изменений, возвращаемся к оригинальным данным
      this.form = { ...this.originalForm };
      this.isEditing = false;
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
.cancel-button {
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

.edit-button:hover {
  background-color: #0056b3;
}

.cancel-button:hover {
  background-color: #e0a800;
}
</style>
