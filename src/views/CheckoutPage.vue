<template>
  <div class="checkout-page">
    <AppHeader />
    <div class="checkout-container">
      <h1>Оформление заказа</h1>

      <!-- Форма с данными профиля -->
      <AccountInfoForm :form="form" :countries="countries" />

      <!-- Чекбокс для сохранения информации -->
      <div class="save-info">
        <label>
          <input v-model="saveInfo" type="checkbox" />
          Сохранить информацию
        </label>
      </div>

      <!-- Детали заказа -->
      <div class="order-summary">
        <h3>Детали заказа</h3>
        <CartItem
            v-for="item in cartItems"
            :key="item.id"
            :item="item"
            :disable-quantity-controls="true"
        />
        <div class="total">
          <p>Итого: {{ totalPrice }} ₽</p>
          <button class="pay-button" @click="submitOrder">Оплатить</button>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@components/AppHeader.vue";
import AppFooter from "@components/AppFooter.vue";
import CartItem from "@components/CartItem.vue";
import AccountInfoForm from "@components/AccountInfoForm.vue";
import { getFullCartData } from "@services/cartProcessingService";
import { getProfile, updateProfile } from "@services/profileService"; // Импортируем обновлённый profileService
import axios from "@axios";

export default {
  components: {
    AppHeader,
    AppFooter,
    CartItem,
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
      saveInfo: false,
      cartItems: [],
      totalPrice: 0,
      countries: [
        { code: "RU", name: "Россия" },
        { code: "KZ", name: "Казахстан" },
        { code: "BY", name: "Беларусь" },
      ],
    };
  },
  methods: {
    // Метод для загрузки корзины
    async fetchCart() {
      try {
        const { items, totalPrice } = await getFullCartData();
        this.cartItems = items;
        this.totalPrice = totalPrice;
      } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
      }
    },
    // Метод для загрузки профиля
    async fetchProfile() {
      try {
        const profile = await getProfile();
        this.form = {
          ...this.form,
          ...profile, // Подставляем основные данные профиля
          address: {
            ...this.form.address,
            ...profile.address, // Если есть данные адреса, добавляем их
          },
        };
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      }
    },
    // Отправка заказа
    async submitOrder() {
      const orderData = {
        ...this.form,
        items: this.cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          colorId: item.color,
          sizeId: item.size,
        })),
        total: this.totalPrice,
      };

      try {
        // Отправляем заказ
        await axios.post("/order/submit", orderData);

        // Обновляем профиль, если включён чекбокс "Сохранить информацию"
        if (this.saveInfo) {
          await updateProfile(this.form);
          alert("Информация профиля обновлена!");
        }

        alert("Заказ успешно оформлен!");
        this.$router.push("/thank-you");
      } catch (error) {
        console.error("Ошибка оформления заказа или обновления профиля:", error);
        alert("Произошла ошибка при оформлении заказа.");
      }
    },
  },
  async mounted() {
    await this.fetchCart(); // Загружаем данные корзины
    await this.fetchProfile(); // Загружаем данные профиля
  },
};
</script>

<style scoped>
.checkout-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.checkout-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.save-info {
  margin: 20px 0;
}

.order-summary {
  width: 300px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
}

.total {
  margin-top: 20px;
}

.pay-button {
  width: 100%;
  padding: 10px;
  background: linear-gradient(to right, #ff8269, #ff5d9e);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pay-button:hover {
  opacity: 0.9;
}
</style>
