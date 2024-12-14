<template>
  <tr class="cart-row">
    <td>
      <div class="product-info">
        <!-- Изображение товара с кнопкой "Удалить" в верхнем левом углу -->
        <div class="image-container">
          <router-link :to="productLink">
            <img :src="imageUrl" alt="Product Image" class="product-image" />
          </router-link>
          <button class="remove-btn" @click="removeItem">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" fill="#DB4444"/>
              <path d="M9 15L12 12M15 9L11.9994 12M11.9994 12L9 9M12 12L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <span class="product-name">{{ item.name }}</span>
      </div>
    </td>
    <td>{{ item.size }}</td>
    <td>{{ item.color }}</td>
    <td>{{ item.price.toFixed(2) }} ₽</td> <!-- Столбец с ценой товара -->
    <td>
      <div class="quantity-container">
        <!-- Счетчик слева -->
        <span class="custom-counter">{{ item.quantity }}</span>

        <!-- Кнопки увеличения и уменьшения справа -->
        <div class="quantity-btns">
          <button @click="increaseQuantity" class="quantity-btn custom-increase-btn">
            <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.75732 2.3665L1.45732 5.6665L0.514648 4.72384L4.75732 0.481171L8.99998 4.72384L8.05732 5.6665L4.75732 2.3665Z" fill="black"/>
            </svg>
          </button>
          <button @click="decreaseQuantity" class="quantity-btn custom-decrease-btn">
            <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.75733 3.6335L8.05733 0.333496L9 1.27616L4.75733 5.51883L0.514665 1.27616L1.45733 0.333496L4.75733 3.6335Z" fill="black"/>
            </svg>

          </button>
        </div>
      </div>
    </td>
    <td>{{ (item.quantity * item.price).toFixed(2) }} ₽</td> <!-- Subtotal для товара -->
  </tr>
</template>

<script>
import { BASE_IMAGE_URL } from "@config/constants";
import QuantityControl from "@components/QuantityControl.vue";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    QuantityControl,
  },
  computed: {
    imageUrl() {
      if (!this.item.imageUrl) {
        return `${BASE_IMAGE_URL}default-placeholder.png`;
      }
      const normalizedPath = this.item.imageUrl.replace(/\\/g, "/");
      return `${BASE_IMAGE_URL}${normalizedPath}`;
    },
    productLink() {
      return `/product/${this.item.productId}`;
    },
  },
  methods: {
    removeItem() {
      this.$emit("remove-item", this.item.id);
    },
    updateQuantity(newQuantity) {
      this.$emit("update-quantity", this.item.id, newQuantity);
    },
    decreaseQuantity() {
      if (this.item.quantity > 1) {
        this.item.quantity--;
        this.updateQuantity(this.item.quantity);
      }
    },
    increaseQuantity() {
      this.item.quantity++;
      this.updateQuantity(this.item.quantity);
    },
  },
};
</script>

<style scoped>
.cart-row {
  text-align: left;
}

.product-info {
  display: flex;
  align-items: center;
}

.image-container {
  position: relative;
  display: inline-block;
  margin-right: 20px;
}

.product-image {
  width: 54px;
  height: 54px;
  object-fit: cover;
  display: block;
}

.remove-btn {
  position: absolute;
  top: -11.5px;
  left: -11.5px;
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.3s ease;
}

.remove-btn:hover {
  color: #ff4d4d;
}

.remove-btn:focus {
  outline: none;
}

.product-name {
  font-size: 14px;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Контейнер для счётчика и кнопок */
.quantity-container {
  width: fit-content;
  display: flex;
  padding: 6px 12px;
  justify-content: start;
  gap: 16px;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 4px;
}

.custom-counter {
  font-size: 16px;
  color: #000000;
}

.quantity-btns {
  display: flex;
  flex-direction: column;
}

.custom-decrease-btn,
.custom-increase-btn {
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  background-color: white;
  cursor: pointer;
}


</style>