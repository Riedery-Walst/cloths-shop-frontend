<template>
  <div class="checkout-page container">
    <div class="checkout-container">
      <h1>Детали заказа</h1>

      <div class="checkout-content">
        <!-- Информация о доставке (слева) -->
        <div class="profile-info">
          <AccountInfoForm :form="form" :countries="countries" :showErrors="showErrors" />
        </div>

        <!-- Блок с деталями заказа (справа) -->
        <div class="order-block">
          <div class="cart-items-list">
            <CartItem
                v-for="item in cartItems"
                :key="item.id"
                :item="item"
                :isCheckoutPage="true"
                :subtotal="calculateSubtotal(item)"
            />
          </div>

          <CheckoutSummary
              :cartItems="cartItems"
              :totalPrice="totalPrice"
              :submitOrder="submitOrder"
          />
        </div>
      </div>

      <!-- Чекбокс для сохранения информации (не в колонках) -->
      <div class="save-info">
        <label>
          <input v-model="saveInfo" type="checkbox" />
          Сохранить эту информацию для более быстрой оплаты в следующий раз
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from "@components/CartItem.vue";
import AccountInfoForm from "@components/AccountInfoForm.vue";
import CheckoutSummary from "@components/CheckoutSummary.vue";
import { getFullCartData } from "@services/cartProcessingService";
import { getProfile, updateProfile } from "@services/profileService";
import axios from "@axios";

export default {
  components: {
    CartItem,
    AccountInfoForm,
    CheckoutSummary,
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
        { code: "RU", name: "Россия" },
        { code: "KZ", name: "Казахстан" },
        { code: "BY", name: "Беларусь" },
      ],
      showErrors: false,
    };
  },
  methods: {
    async fetchCart() {
      try {
        const { items, totalPrice } = await getFullCartData();
        this.cartItems = items;
        this.totalPrice = totalPrice;
      } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
      }
    },
    async fetchProfile() {
      try {
        const profile = await getProfile();
        this.form = { ...this.form, ...profile, address: { ...this.form.address, ...profile.address } };
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
          amount: { value: this.totalPrice.toFixed(2), currency: "RUB" },
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
    calculateSubtotal(item) {
      return (item.quantity * item.price).toFixed(2);
    },
  },
  async mounted() {
    await this.fetchCart();
    await this.fetchProfile();
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 40px;
}

.checkout-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.checkout-content {
  display: flex;
  justify-content: space-between;
  gap: 275px;
}

.profile-info {
  width: 475px;
}

.order-block {
  margin-top: 24px;
  width: 425px;
  border-radius: 8px;
}

.save-info label {
  display: flex;
  align-items: center;
  font-size: 16px;
  gap: 8px;
}

.save-info input {
  margin: 0;
  width: 24px;
  height: 24px;
  appearance: none; /* Убираем стандартное отображение */
  border: 2px solid #DB4444;
  border-radius: 4px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
}

.save-info input:checked {
  background-color: #DB4444;
  border-color: #DB4444;
}

.save-info input:checked::before {
  content: "✔"; /* Символ галочки */
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.save-info input:checked + label {
  color: #DB4444;
}

.save-info input {
  width: 24px;
  height: 24px;
}

.cart-items-list {
  margin-bottom: 20px;
}
</style>
