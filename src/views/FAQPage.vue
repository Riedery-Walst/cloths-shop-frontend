<template>
  <div class="faq-container">
    <h1>FAQ (Часто задаваемые вопросы)</h1>
    <div class="faq-item" v-for="(item, index) in faqs" :key="index">
      <button class="faq-question" @click="toggleFAQ(index)">
        {{ item.question }}
        <span class="arrow">{{ item.open ? '▲' : '▼' }}</span>
      </button>
      <p v-if="item.open" class="faq-answer">{{ item.answer }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FAQPage",
  data() {
    return {
      faqs: [
        {
          question: "Нужно ли регистрироваться для оформления заказа?",
          answer: "Да, регистрация обязательна для оформления заказа.",
          open: false,
        },
        {
          question: "Как узнать статус моего заказа?",
          answer: "Чтобы узнать статус заказа, свяжитесь с нами по электронной почте или телефону.",
          open: false,
        },
        {
          question: "Какие способы оплаты вы принимаете?",
          answer: "Мы принимаем оплату через сервис ЮKassa. Оплата при получении невозможна.",
          open: false,
        },
        {
          question: "Как осуществляется доставка?",
          answer: "Доставка осуществляется с помощью CDEK, а стоимость уточняется после оформления заказа.",
          open: false,
        },
      ],
    };
  },
  methods: {
    toggleFAQ(index) {
      this.faqs[index].open = !this.faqs[index].open;
    },
  },
};
</script>

<style scoped>
.faq-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.faq-item {
  margin-bottom: 15px;
}

.faq-question {
  width: 100%;
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-question:hover {
  background: #f1f1f1;
}

.faq-answer {
  margin-top: 10px;
  padding: 10px;
  background: #fff;
  border-left: 4px solid #ddd;
}

.arrow {
  font-size: 12px;
}
</style>
