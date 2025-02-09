<script setup>
import './assets/main.css';
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<template>
  <div id="app">
    <AppHeader />
    <Breadcrumbs />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>
