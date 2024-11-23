<template>
  <div class="input-form">
    <h3>Контактная информация</h3>
    <input
        v-model="form.firstName"
        :class="{ 'input-error': showErrors && !form.firstName.trim() }"
        type="text"
        placeholder="Имя"
    />
    <input
        v-model="form.lastName"
        :class="{ 'input-error': showErrors && !form.lastName.trim() }"
        type="text"
        placeholder="Фамилия"
    />
    <input
        v-model="form.email"
        :class="{ 'input-error': showErrors && !form.email.trim() }"
        type="email"
        placeholder="Электронная почта"
    />
    <input
        v-model="form.phone"
        :class="{ 'input-error': showErrors && !form.phone.trim() }"
        type="text"
        placeholder="Телефон"
    />

    <h3>Адрес</h3>
    <select
        v-model="form.address.country"
        :class="{ 'input-error': showErrors && !form.address.country.trim() }"
    >
      <option disabled value="">Выберите страну</option>
      <option
          v-for="country in countries"
          :key="country.code"
          :value="country.name"
      >
        {{ country.name }}
      </option>
    </select>
    <input
        v-model="form.address.city"
        :class="{ 'input-error': showErrors && !form.address.city.trim() }"
        type="text"
        placeholder="Город"
    />
    <input
        v-model="form.address.street"
        :class="{ 'input-error': showErrors && !form.address.street.trim() }"
        type="text"
        placeholder="Улица"
    />
    <input
        v-model="form.address.house"
        :class="{ 'input-error': showErrors && !form.address.house.trim() }"
        type="text"
        placeholder="Дом"
    />
    <input
        v-model="form.address.apartment"
        type="text"
        placeholder="Квартира"
    />
    <input
        v-model="form.address.postalCode"
        :class="{ 'input-error': showErrors && !form.address.postalCode.trim() }"
        type="text"
        placeholder="Почтовый индекс"
    />
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
    showErrors: {
      type: Boolean,
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

.input-error {
  border: 1px solid red;
}

.input-form h3 {
  margin-top: 20px;
}
</style>
