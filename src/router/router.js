import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import LoginPage from "@/views/LoginPage.vue";
import RegistrationPage from "@/views/RegistrationPage.vue";
import AdminColorsPage from "@/views/AdminColorsPage.vue";
import AdminSizesPage from "@/views/AdminSizesPage.vue";

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
    {
        path: '/register',
        name: 'RegisterPage',
        component: RegistrationPage,
    },
    {
        path: '/colors',
        name: 'AdminColorsPage',
        component: AdminColorsPage
    },
    {
        path: '/sizes',
        name: 'AdminSizesPage',
        component: AdminSizesPage
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
