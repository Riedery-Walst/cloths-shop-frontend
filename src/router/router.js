import { createRouter, createWebHistory } from "vue-router";

// Импортируем компоненты
import MainPage from '@/views/MainPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegistrationPage from '@/views/RegistrationPage.vue';
import AdminColorsPage from '@/views/admin/ColorsPage.vue';
import AdminSizesPage from '@/views/admin/SizesPage.vue';
import AdminAddColorPage from '@/views/admin/AddColorPage.vue';
import AdminAddSizePage from '@/views/admin/AddSizePage.vue';
import ProductPage from '@/views/ProductPage.vue';
import CartPage from '@/views/CartPage.vue';
import CheckoutPage from '@/views/CheckoutPage.vue';
import AdminProductsPage from '@/views/admin/ProductsPage.vue';
import AdminChangeAndAddProductPage from '@/views/admin/ChangeAndAddProductPage.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import ThanksPage from '@/views/ThanksPage.vue';
import OrdersPage from '@/views/admin/OrdersPage.vue';
import TermsOfService from '@/views/TermsOfService.vue';
import PrivacyPolicy from '@/views/PrivacyPolicy.vue';

// Определяем маршруты
const routes = [
    {
        path: '/',
        redirect: '/products',
    },
    {
        path: '/home',
        redirect: '/products',
    },
    {
        path: '/products',
        name: 'ProductsPage',
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
        path: '/product/:id',
        name: 'ProductPage',
        component: ProductPage,
        props: true,
    },
    {
        path: '/cart',
        name: 'CartPage',
        component: CartPage,
        meta: { requiresAuth: true },
    },
    {
        path: '/checkout',
        name: 'CheckoutPage',
        component: CheckoutPage,
        meta: { requiresAuth: true },
    },
    {
        path: '/profile',
        name: 'ProfilePage',
        component: ProfilePage,
        meta: { requiresAuth: true },
    },
    {
        path: '/thanks',
        name: 'ThanksPage',
        component: ThanksPage,
    },
    {
        path: '/terms-of-service',
        name: 'TermsOfService',
        component: TermsOfService,  // Новый маршрут для страницы условий
    },
    {
        path: '/privacy-policy',
        name: 'PrivacyPolicy',
        component: PrivacyPolicy,  // Новый маршрут для страницы политики конфиденциальности
    },
    {
        path: '/admin/colors',
        name: 'AdminColorsPage',
        component: AdminColorsPage,
        meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    },
    {
        path: '/admin/colors/add',
        name: 'AdminAddColorPage',
        component: AdminAddColorPage,
        meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    },
    {
        path: '/admin/sizes',
        name: 'AdminSizesPage',
        component: AdminSizesPage,
        meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    },
    {
        path: '/admin/sizes/add',
        name: 'AdminAddSizePage',
        component: AdminAddSizePage,
        meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    },
    {
        path: '/admin/products',
        name: 'AdminProductsPage',
        component: AdminProductsPage,
        meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    },
    {
        path: '/admin/products/add',
        name: 'AdminAddProductPage',
        component: AdminChangeAndAddProductPage,
        props: { isEdit: false },
        meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    },
    {
        path: '/admin/products/edit/:id',
        name: 'AdminEditProductPage',
        component: AdminChangeAndAddProductPage,
        props: route => ({ isEdit: true, productId: parseInt(route.params.id) }),
        meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    },
    {
        path: '/admin/orders',
        name: 'OrdersPage',
        component: OrdersPage,
        props: true,
        meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    }
];

// Создаем и настраиваем маршрутизатор
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Защита маршрутов и проверка авторизации
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('authToken');
    let role = null;

    if (token) {
        role = getRoleFromToken(token);
    }

    // Проверяем, нужен ли доступ к защищенному маршруту
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next('/login');
        } else {
            const requiredRole = to.meta.requiredRole;
            if (requiredRole && role !== requiredRole) {
                next('/');
            } else {
                next();
            }
        }
    } else {
        next();
    }
});

// Функция для получения роли пользователя из токена с обработкой ошибок
function getRoleFromToken(token) {
    try {
        const decodedToken = decodeToken(token);
        return decodedToken?.role || null;
    } catch (error) {
        console.error('Ошибка при декодировании токена:', error);
        return null;
    }
}

// Функция для декодирования JWT токена
function decodeToken(token) {
    if (!token) {
        throw new Error('Токен отсутствует');
    }

    const parts = token.split('.');

    if (parts.length !== 3) {
        throw new Error('Некорректный JWT токен');
    }

    try {
        const decoded = atob(parts[1]); // Декодируем payload токена
        return JSON.parse(decoded); // Возвращаем объект данных
    } catch (error) {
        throw new Error('Ошибка при декодировании токена: ' + error.message);
    }
}

export default router;
