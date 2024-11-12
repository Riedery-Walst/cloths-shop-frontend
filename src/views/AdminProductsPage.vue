<script>
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import axiosInstance from '../axiosInstance';

export default {
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      product: null,
      selectedColor: null,
      selectedSize: null,
      quantity: 1
    };
  },
  methods: {
    async fetchProductData() {
      try {
        const productId = this.$route.params.id;
        const response = await axiosInstance.get(`/products/${productId}`);
        console.log(productId);
        this.product = response.data;
      } catch (error) {
        console.error('Ошибка загрузки данных продукта:', error);
      }
    },
    getImageUrl(imagePath) {
      const baseUrl = "http://localhost:8080";
      return `${baseUrl}/${imagePath.replace(/\\/g, "/")}`;
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--;
    },
    increaseQuantity() {
      this.quantity++;
    }
  },
  mounted() {
    this.fetchProductData();
  }
};
</script>


<style scoped>
.admin-page {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.add-button {
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #444;
}

</style>
