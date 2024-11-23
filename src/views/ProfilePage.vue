<template>
  <div class="profile-page">
    <AppHeader />
    <div class="profile-container">
      <h1>Профиль</h1>
      <!-- Форма с данными профиля -->
      <AccountInfoForm :form="form" :countries="countries" />

      <!-- Кнопки управления -->
      <div class="profile-actions">
        <button class="save-button" @click="updateProfileInfo">Сохранить</button>
        <button class="delete-button" @click="deleteProfile">Удалить профиль</button>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@components/AppHeader.vue";
import AppFooter from "@components/AppFooter.vue";
import AccountInfoForm from "@components/AccountInfoForm.vue";
import { getProfile, updateProfile, deleteProfile } from "@services/profileService";

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
      countries: [
        { code: "RU", name: "Россия" },
        { code: "KZ", name: "Казахстан" },
        { code: "BY", name: "Беларусь" },
      ],
    };
  },
  methods: {
    // Загрузка профиля
    async fetchProfile() {
      try {
        const profile = await getProfile();
        this.form = {
          ...this.form,
          ...profile,
          address: {
            ...this.form.address,
            ...profile.address,
          },
        };
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
        alert("Не удалось загрузить данные профиля.");
      }
    },
    // Обновление профиля
    async updateProfileInfo() {
      try {
        await updateProfile(this.form);
        alert("Профиль успешно обновлён!");
      } catch (error) {
        console.error("Ошибка обновления профиля:", error);
        alert("Не удалось обновить профиль.");
      }
    },
    // Удаление профиля
    async deleteProfile() {
      try {
        const confirmation = confirm("Вы уверены, что хотите удалить профиль?");
        if (confirmation) {
          await deleteProfile();
          alert("Профиль успешно удалён!");
          this.$router.push("/"); // Перенаправляем на главную страницу
        }
      } catch (error) {
        console.error("Ошибка удаления профиля:", error);
        alert("Не удалось удалить профиль.");
      }
    },
  },
  async mounted() {
    await this.fetchProfile();
  },
};
</script>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-actions {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.save-button {
  flex: 1;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #45a049;
}

.delete-button {
  flex: 1;
  padding: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #d32f2f;
}
</style>
