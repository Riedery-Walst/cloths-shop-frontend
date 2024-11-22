<template>
  <div class="input-form">
    <h3>Контактная информация</h3>
    <input v-model="form.firstName" type="text" placeholder="Имя" />
    <input v-model="form.lastName" type="text" placeholder="Фамилия" />
    <input v-model="form.email" type="email" placeholder="Электронная почта" />
    <input v-model="form.phone" type="text" placeholder="Телефон" />

    <h3>Адрес</h3>
    <select v-model="form.country">
      <option disabled value="">Выберите страну</option>
      <option v-for="country in countries" :key="country.code" :value="country.name">
        {{ country.name }}
      </option>
    </select>
    <input v-model="form.city" type="text" placeholder="Город" />
    <input v-model="form.street" type="text" placeholder="Улица" />
    <input v-model="form.house" type="text" placeholder="Дом" />
    <input v-model="form.apartment" type="text" placeholder="Квартира" />
    <input v-model="form.zipCode" type="text" placeholder="Почтовый индекс" />
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
    countries: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.input-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-form input,
.input-form select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.input-form h3 {
  margin-top: 20px;
}
</style>
