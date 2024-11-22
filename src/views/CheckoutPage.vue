<template>
  <div class="checkout-page">
    <AppHeader />
    <div class="checkout-container">
      <h1>Оформление заказа</h1>

      <!-- Форма с подгруженными данными из профиля -->
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
            :colors="colors"
            :sizes="sizes"
            :disable-quantity-controls="true"
        />
        <div class="total">
          <p>Итого: {{ total }} ₽</p>
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
import AccountInfoForm from "@components/AccountInfoForm.vue"; // Импорт компонента формы
import { fetchColors, fetchSizes } from "@services/productOptionsService.js";
import { getProfile, updateProfile } from "@services/profileService.js"; // Импорт сервиса профиля
import { getCart } from "@services/cartService.js";
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
        country: "",
        city: "",
        street: "",
        house: "",
        apartment: "",
        zipCode: "",
      },
      saveInfo: false, // Для управления состоянием чекбокса
      cartItems: [],
      colors: [],
      sizes: [],
      countries: [
        { code: "RU", name: "Россия" },
        { code: "KZ", name: "Казахстан" },
        { code: "BY", name: "Беларусь" },
      ],
      total: 0,
    };
  },
  methods: {
    async fetchProfileData() {
      try {
        const profile = await getProfile();
        this.form = { ...profile }; // Подгружаем данные профиля в форму
      } catch (error) {
        console.error("Ошибка загрузки данных профиля:", error);
      }
    },
    async fetchColorsAndSizes() {
      try {
        this.colors = await fetchColors();
        this.sizes = await fetchSizes();
      } catch (error) {
        console.error("Ошибка загрузки цветов и размеров:", error);
      }
    },
    async fetchCart() {
      try {
        const response = await getCart();
        this.cartItems = response.data.items;
        this.calculateTotal();
      } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
      }
    },
    calculateTotal() {
      this.total = this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    },
    async submitOrder() {
      const orderData = {
        ...this.form,
        items: this.cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          colorId: item.colorId,
          sizeId: item.sizeId,
        })),
        total: this.total,
      };

      try {
        // Отправка заказа
        await axios.post("/order/submit", orderData);

        // Сохранение информации профиля, если включен чекбокс
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
    await this.fetchProfileData(); // Загружаем данные профиля
    await this.fetchColorsAndSizes();
    await this.fetchCart();
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

.save-info label {
  display: flex;
  align-items: center;
  gap: 10px;
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
