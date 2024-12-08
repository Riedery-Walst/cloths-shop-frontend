<script setup>
import './assets/main.css';
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import AppHeader from "@/components/AppHeader.vue";  // Импорт AppHeader
import AppFooter from "@/components/AppFooter.vue";  // Импорт AppFooter
</script>

<template>
  <div id="app">
    <AppHeader />  <!-- Добавляем AppHeader вверху -->
    <Breadcrumbs />
    <router-view />
    <AppFooter />  <!-- Добавляем AppFooter внизу -->
  </div>
</template>
