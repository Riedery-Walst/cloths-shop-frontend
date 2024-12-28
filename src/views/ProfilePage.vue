<template>
  <div class="profile-page container">
    <div class="profile-container">
      <h1>Редактирование профиля</h1>
      <!-- Форма с данными профиля -->
      <AccountInfoForm :form="form" :countries="countries" />

      <!-- Кнопки управления -->
      <div class="profile-actions">
        <button class="save-button" @click="updateProfileInfo">Сохранить</button>
        <button class="delete-button" @click="deleteProfile">Удалить профиль</button>
      </div>
    </div>
  </div>
</template>

<script>
import AccountInfoForm from "@components/AccountInfoForm.vue";
import { getProfile, updateProfile, deleteProfile } from "@services/profileService";

export default {
  components: {
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

</style>
