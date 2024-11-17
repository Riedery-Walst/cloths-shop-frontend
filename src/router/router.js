import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import LoginPage from "@/views/LoginPage.vue";
import RegistrationPage from "@/views/RegistrationPage.vue";
import AdminColorsPage from "@/views/admin/AdminColorsPage.vue";
import AdminSizesPage from "@/views/AdminSizesPage.vue";
import AdminAddColorPage from "@/views/admin/AdminAddColorPage.vue";
import AdminAddSizePage from "@/views/admin/AdminAddSizePage.vue";
import ProductPage from "@/views/ProductPage.vue";
import CartPage from "@/views/CartPage.vue";
import axios from 'axios';

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
        meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    },
    {
        path: '/colors/add',
        name: 'AdminAddColorPage',
        component: AdminAddColorPage,
        meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    },
    {
        path: '/sizes',
        name: 'AdminSizesPage',
        component: AdminSizesPage,
        meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    },
    {
        path: '/sizes/add',
        name: 'AdminAddSizePage',
        component: AdminAddSizePage,
        meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    },
    {
        path: '/products',
        name: 'AdminProductsPage',
        component: () => import('../views/admin/AdminProductsPage.vue'),
        meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    },
    {
        path: '/products/add',
        name: 'AdminAddProductPage',
        component: () => import('../views/admin/AdminChangeAndAddProductPage.vue'),
        props: { isEdit: false },
        meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    },
    {
        path: '/products/edit/:id',
        name: 'AdminEditProductPage',
        component: () => import('../views/admin/AdminChangeAndAddProductPage.vue'),
        props: route => ({ isEdit: true, productId: parseInt(route.params.id) }),
        meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    },
    {
        path: '/product/:id', // Добавляем маршрут для страницы продукта
        name: 'ProductPage',
        component: ProductPage,
        props: true // Передаем параметр id как prop
    },
    {
        path: '/cart', // Добавляем маршрут для корзины
        name: 'CartPage',
        component: CartPage,
        meta: { requiresAuth: true },
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('authToken');
    const role = token ? getRoleFromToken(token) : null;  // Извлекаем роль из токена

    // Проверка, нужен ли доступ к защищенному маршруту
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            // Если токена нет, перенаправляем на страницу логина
            next('/login');
        } else {
            // Если токен есть, проверяем роль
            const requiredRole = to.meta.requiredRole;
            if (requiredRole && role !== requiredRole) {
                // Если роль не совпадает с требуемой для маршрута
                next('/');  // Перенаправляем на главную страницу
            } else {
                // Если роль совпадает, продолжаем переход
                next();
            }
        }
    } else {
        next();  // Если маршрут не требует авторизации, просто продолжаем переход
    }
});

function getRoleFromToken(token) {
    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Декодируем токен
        return decodedToken.role; // Возвращаем роль из токена
    } catch (error) {
        console.error('Ошибка при декодировании токена', error);
        return null;
    }
}

export default router;
