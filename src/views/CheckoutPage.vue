<template>
  <div class="checkout-page">
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
  </div>
</template>

<script>
import CartItem from "@components/CartItem.vue";
import AccountInfoForm from "@components/AccountInfoForm.vue";
import { getFullCartData } from "@services/cartProcessingService";
import { getProfile, updateProfile } from "@services/profileService";
import axios from "@axios";

export default {
  components: {
    CartItem,
    AccountInfoForm,
  },
  data() {
    return {
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
        {code: "RU", name: "Россия"},
        {code: "KZ", name: "Казахстан"},
        {code: "BY", name: "Беларусь"},
      ],
      showErrors: false,
    };
  },
  methods: {
    async fetchCart() {
      try {
        const {items, totalPrice} = await getFullCartData();
        this.cartItems = items;
        this.totalPrice = totalPrice;
      } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
      }
    },
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
          colorId: item.colorId,
          sizeId: item.sizeId,
        })),
        totalPrice: this.totalPrice,
      };

      try {
        const response = await axios.post("/orders", orderData);
        this.orderId = response.data.id;
        return response.data;
      } catch (error) {
        console.error("Ошибка при создании заказа:", error);
        alert("Произошла ошибка при создании заказа.");
        throw error;
      }
    },
    async submitOrder() {
      if (!this.validateForm()) {
        this.showErrors = true;
        alert("Пожалуйста, заполните все обязательные поля!");
        return;
      }

      try {
        const order = await this.createOrder();
        console.log(`Создан заказ с ID: ${order.id}`);

        const paymentRequest = {
          orderId: this.orderId,
          amount: {
            value: this.totalPrice.toFixed(2),
            currency: "RUB",
          },
        };

        const paymentResponse = await axios.post("http://localhost:8080/api/payments", paymentRequest);

        if (paymentResponse.data && paymentResponse.data.confirmation) {
          if (this.saveInfo) {
            await updateProfile(this.form);
            alert("Информация профиля сохранена!");
          }

          window.location.href = paymentResponse.data.confirmation.confirmation_url;
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
