<template>
  <div class="checkout-page">
    <AppHeader />
    <div class="checkout-container">
      <h1>Оформление заказа</h1>

      <!-- Форма с данными профиля -->
      <AccountInfoForm :form="form" :countries="countries" :showErrors="showErrors" />

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
            :isCheckoutPage="true"
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
import { getProfile, updateProfile } from "@services/profileService";
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
      // Переменная для хранения ID заказа
      orderId: null,
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
      showErrors: false,
    };
  },
  methods: {
    // Загрузка корзины
    async fetchCart() {
      try {
        const { items, totalPrice } = await getFullCartData();
        this.cartItems = items;
        this.totalPrice = totalPrice;
      } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
      }
    },
    // Загрузка профиля пользователя
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
      }
    },
    // Проверка валидности формы
    validateForm() {
      const requiredFields = [
        this.form.firstName,
        this.form.lastName,
        this.form.email,
        this.form.phone,
        this.form.address.country,
        this.form.address.city,
        this.form.address.street,
        this.form.address.house,
        this.form.address.postalCode,
      ];
      return requiredFields.every((field) => field && field.trim() !== "");
    },
    // Создание заказа
    async createOrder() {
      const orderData = {
        customer: {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          phone: this.form.phone,
        },
        address: this.form.address,
        items: this.cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        total: this.totalPrice,
      };

      try {
        const response = await axios.post("/orders", orderData);
        this.orderId = response.data.id;  // Сохраняем id из ответа
        return response.data;  // Возвращаем весь объект, включая id
      } catch (error) {
        console.error("Ошибка при создании заказа:", error);
        alert("Произошла ошибка при создании заказа.");
        throw error;
      }
    },
    // Создание платежа и редирект на платёжную страницу
    async submitOrder() {
      if (!this.validateForm()) {
        this.showErrors = true;
        alert("Пожалуйста, заполните все обязательные поля!");
        return;
      }

      try {
        // Шаг 1: Создание заказа и получение его ID
        const order = await this.createOrder();

        console.log(`Создан заказ с ID: ${order.id}`);

        // Шаг 2: Формирование и отправка запроса на оплату
        const paymentRequest = {
          orderId: this.orderId,  // Используем сохранённый orderId
          amount: {
            value: this.totalPrice.toFixed(2), // Пример: "200.00"
            currency: "RUB",  // Валюта
          },
          returnUrl: `${window.location.origin}/thank-you`, // URL возврата
        };

        const paymentResponse = await axios.post("http://localhost:8080/api/payments", paymentRequest);

        if (paymentResponse.data && paymentResponse.data.confirmation_url) {
          if (this.saveInfo) {
            await updateProfile(this.form);
            alert("Информация профиля сохранена!");
          }

          // Перенаправление пользователя на платёжную страницу
          window.location.href = paymentResponse.data.confirmation_url;
        } else {
          alert("Не удалось получить URL для оплаты.");
        }
      } catch (error) {
        console.error("Ошибка при создании платежа:", error);
        alert("Произошла ошибка при создании заказа или оплаты.");
      }
    },
  },
  async mounted() {
    await this.fetchCart();
    await this.fetchProfile();
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
