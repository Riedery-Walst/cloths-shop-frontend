<template>
  <div class="input-form">
    <div class="input-group">
      <label for="firstName">Имя</label>
      <input
          id="firstName"
          v-model="form.firstName"
          :class="{ 'input-error': showErrors && !form.firstName.trim() }"
          type="text"
      />
    </div>

    <div class="input-group">
      <label for="lastName">Фамилия</label>
      <input
          id="lastName"
          v-model="form.lastName"
          :class="{ 'input-error': showErrors && !form.lastName.trim() }"
          type="text"
      />
    </div>

    <div class="input-group">
      <label for="email">Электронная почта</label>
      <input
          id="email"
          v-model="form.email"
          :class="{ 'input-error': showErrors && !form.email.trim() }"
          type="email"
      />
    </div>

    <div class="input-group">
      <label for="phone">Телефон</label>
      <input
          id="phone"
          v-model="form.phone"
          :class="{ 'input-error': showErrors && !form.phone.trim() }"
          type="text"
      />
    </div>

    <div class="input-group">
      <label for="country">Страна</label>
      <select
          id="country"
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
    </div>

    <div class="input-group">
      <label for="city">Город</label>
      <input
          id="city"
          v-model="form.address.city"
          :class="{ 'input-error': showErrors && !form.address.city.trim() }"
          type="text"
      />
    </div>

    <div class="input-group">
      <label for="street">Улица</label>
      <input
          id="street"
          v-model="form.address.street"
          :class="{ 'input-error': showErrors && !form.address.street.trim() }"
      />
    </div>

    <div class="input-group">
        <label for="house">Дом</label>
        <input
            id="house"
            v-model="form.address.house"
            :class="{ 'input-error': showErrors && !form.address.house.trim() }"
            type="text"
        />
    </div>
    <div class="input-group">
        <label for="apartment">Квартира</label>
        <input
            id="apartment"
            v-model="form.address.apartment"
            type="text"
        />
    </div>

    <div class="input-group">
      <label for="postalCode">Почтовый индекс</label>
      <input
          id="postalCode"
          v-model="form.address.postalCode"
          :class="{ 'input-error': showErrors && !form.address.postalCode.trim() }"
          type="text"
      />
    </div>
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
  gap: 1rem;
  margin-bottom: 24px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-form input,
.input-form select {
  padding: 16px;
  border: 0 solid #F5F5F5;
  border-radius: 4px;
  font-size: 16px;
  background-color: #F5F5F5;
}

.input-error {
  border: 1px solid red;
}

.input-group label {
  color: rgba(0, 0, 0, 0.4);
  margin-bottom: 8px;
}

.input-form h3 {
  margin-top: 20px;
}
</style>
