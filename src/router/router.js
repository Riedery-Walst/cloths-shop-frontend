import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import LoginPage from "@/views/LoginPage.vue";
import RegistrationPage from "@/views/RegistrationPage.vue";
import AdminColorsPage from "@/views/AdminColorsPage.vue";
import AdminSizesPage from "@/views/AdminSizesPage.vue";
import AdminAddColorPage from "@/views/AdminAddColorPage.vue";
import AdminAddSizePage from "@/views/AdminAddSizePage.vue";
import ProductPage from "@/views/ProductPage.vue";
import axios from "axios";

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
        component: AdminColorsPage,
        meta: { requiresAuth: true },
    },
    {
        path: '/colors/add',
        name: 'AdminAddColorPage',
        component: AdminAddColorPage,
        meta: { requiresAuth: true },
    },
    {
        path: '/sizes',
        name: 'AdminSizesPage',
        component: AdminSizesPage,
        meta: { requiresAuth: true },
    },
    {
        path: '/sizes/add',
        name: 'AdminAddSizePage',
        component: AdminAddSizePage,
        meta: { requiresAuth: true },
    },
    {
        path: '/products',
        name: 'AdminProductsPage',
        component: () => import('../views/AdminProductsPage.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/products/add',
        name: 'AdminAddProductPage',
        component: () => import('../views/AdminChangeAndAddProductPage.vue'),
        props: { isEdit: false },
        meta: { requiresAuth: true },
    },
    {
        path: '/products/edit/:id',
        name: 'AdminEditProductPage',
        component: () => import('../views/AdminChangeAndAddProductPage.vue'),
        props: route => ({ isEdit: true, productId: parseInt(route.params.id) }),
        meta: { requiresAuth: true },
    },
    {
        path: '/product/:id', // Добавляем маршрут для страницы продукта
        name: 'ProductPage',
        component: ProductPage,
        props: true // Передаем параметр id как prop
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('authToken');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (isAuthenticated) {
            try {
                // Проверяем действительность токена на сервере перед переходом
                await axios.get('/auth/validate-token'); // Ваш API для проверки токена
                next();
            } catch (error) {
                console.error('Token expired or invalid');
                localStorage.removeItem('authToken');
                next('/login'); // Перенаправляем на страницу авторизации
            }
        } else {
            next('/login'); // Если нет токена, перенаправляем на страницу авторизации
        }
    } else {
        next(); // Разрешаем переход на страницу, если она не требует авторизации
    }
});


export default router;
