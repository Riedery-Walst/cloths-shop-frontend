import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import LoginPage from "@/views/LoginPage.vue";

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
