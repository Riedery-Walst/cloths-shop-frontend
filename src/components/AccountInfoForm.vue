<template>
  <div :class="['input-form', layoutStyle]">
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
          type="text"
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
      <input id="apartment" v-model="form.address.apartment" type="text" />
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
    layoutStyle: {
      type: String,
      default: "single-column", // По умолчанию — одноколоночный вид
    },
  },
};
</script>

<style scoped>
/* Общие стили */
.input-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-form input,
.input-form select {
  padding: 16px;
  border: 1px solid #f5f5f5;
  border-radius: 4px;
  font-size: 16px;
  background-color: #f5f5f5;
}

.input-error {
  border: 1px solid red;
}

.input-group label {
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 8px;
}

/* Стиль для одноколоночного отображения */
.single-column .input-group {
  width: 100%;
}

/* Стиль для двухколоночного отображения */
.multi-column .input-group {
  width: calc(50% - 1rem);
}
</style>
