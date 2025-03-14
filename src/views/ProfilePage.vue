<template>
  <div class="profile-page container">
    <h1>Редактирование профиля</h1>
    <AccountInfoForm
        :form="form"
        :countries="countries"
        :showErrors="showErrors"
        layoutStyle="multi-column"
    />
    <div class="profile-actions">
      <button class="delete-button" @click="deleteProfile">Удалить профиль</button>
      <div class="right-actions">
        <button class="logout-button" @click="logout">Выйти</button>
        <button class="save-button" @click="updateProfileInfo">Сохранить</button>
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
      showErrors: false,
    };
  },
  methods: {
    async fetchProfile() {
      try {
        const profile = await getProfile();
        this.form = {
          ...this.form,
          ...profile,
          address: { ...this.form.address, ...profile.address },
        };
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      }
    },
    async updateProfileInfo() {
      try {
        await updateProfile(this.form);
        alert("Профиль успешно обновлён!");
      } catch (error) {
        console.error("Ошибка обновления профиля:", error);
        alert("Не удалось обновить профиль.");
      }
    },
    async deleteProfile() {
      try {
        const confirmation = confirm(
            "Вы уверены, что хотите удалить профиль? Это действие нельзя отменить."
        );
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
    async logout() {
      try {
        localStorage.removeItem('authToken'); // Очистка токена
        this.$router.push('/login'); // Перенаправление на страницу входа
        alert("Вы успешно вышли из аккаунта!");
      } catch (error) {
        console.error("Ошибка при выходе из аккаунта:", error);
        alert("Не удалось выйти из аккаунта.");
      }
    },
  },
  async mounted() {
    await this.fetchProfile();
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 40px;
}

.profile-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-between; /* Распределение пространства между элементами */
  align-items: center; /* Выравнивание по вертикали */
}

.right-actions {
  display: flex;
  gap: 10px; /* Расстояние между кнопками справа */
}

.save-button {
  font-size: 16px;
  height: 44px;
  width: 200px;
  background-color: #db4444;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #E07575;
}

.logout-button {
  font-size: 16px;
  height: 44px;
  width: 150px;
  background-color: #656565;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #727272;
}

.delete-button {
  padding: 10px 15px;
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: rgba(77, 77, 77, 0.4);
}
</style>