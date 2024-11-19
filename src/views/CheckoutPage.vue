<template>
  <div class="checkout-page">
    <AppHeader />
    <div class="checkout-container">
      <h1>Оформление заказа</h1>

      <!-- Контактная информация и адрес -->
      <div class="checkout-form">
        <h3>Контактная информация</h3>
        <input v-model="form.email" type="email" placeholder="Электронная почта" />
        <input v-model="form.phone" type="text" placeholder="Телефон" />

        <h3>Адрес</h3>
        <select v-model="form.country">
          <option disabled value="">Выберите страну</option>
          <option v-for="country in countries" :key="country.code" :value="country.name">
            {{ country.name }}
          </option>
        </select>
        <input v-model="form.firstName" type="text" placeholder="Имя" />
        <input v-model="form.lastName" type="text" placeholder="Фамилия" />
        <input v-model="form.address" type="text" placeholder="Адрес" />
        <input v-model="form.city" type="text" placeholder="Город" />
        <input v-model="form.zipCode" type="text" placeholder="Почтовый индекс" />

        <div class="save-payment">
          <label>
            <input v-model="form.savePaymentInfo" type="checkbox" />
            Сохранить информацию об оплате
          </label>
        </div>
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
import { getCart } from "@services/cartService.js";
import axios from "@axios";

export default {
  components: {
    AppHeader,
    AppFooter,
    CartItem,
  },
  data() {
    return {
      form: {
        email: "",
        phone: "",
        country: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: "",
        savePaymentInfo: false,
      },
      cartItems: [],
      colors: [],
      sizes: [],
      countries: [],
      total: 0,
    };
  },
  methods: {
    async fetchColorsAndSizes() {
      try {
        const colorResponse = await axios.get("/colors");
        const sizeResponse = await axios.get("/sizes");
        this.colors = colorResponse.data;
        this.sizes = sizeResponse.data;
      } catch (error) {
        console.error("Ошибка загрузки цветов и размеров:", error);
      }
    },
    async fetchCountries() {
      try {
        const response = await axios.get("/countries");
        this.countries = response.data;
      } catch (error) {
        console.error("Ошибка загрузки списка стран:", error);
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
        await axios.post("/order/submit", orderData);
        alert("Заказ успешно оформлен!");
        this.$router.push("/thank-you");
      } catch (error) {
        console.error("Ошибка оформления заказа:", error);
        alert("Произошла ошибка при оформлении заказа.");
      }
    },
  },
  async mounted() {
    await this.fetchColorsAndSizes();
    await this.fetchCountries();
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
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
}

.checkout-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.checkout-form input,
.checkout-form select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.save-payment label {
  margin-top: 10px;
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
