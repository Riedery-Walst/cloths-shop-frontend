import { createRouter, createWebHistory } from "vue-router";

// Импортируем компоненты
import MainPage from '@/views/MainPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegistrationPage from '@/views/RegistrationPage.vue';
import AdminColorsPage from '@/views/admin/ColorListPage.vue';
import AdminSizesPage from '@/views/admin/SizeListPage.vue';
import AdminAddColorPage from '@/views/admin/AddColorPage.vue';
import AdminAddSizePage from '@/views/admin/AddSizePage.vue';
import ProductPage from '@/views/ProductPage.vue';
import CartPage from '@/views/CartPage.vue';
import CheckoutPage from '@/views/CheckoutPage.vue';
import AdminProductsPage from '@/views/admin/ProductListPage.vue';
import AdminChangeAndAddProductPage from '@/views/admin/ChangeAndAddProductPage.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import ThanksPage from '@/views/ThanksPage.vue';
import OrdersPage from '@/views/admin/OrderListPage.vue';
import TermsOfServicePage from '@/views/TermsOfServicePage.vue';
import PrivacyPolicyPage from '@/views/PrivacyPolicyPage.vue';
import FAQPage from '@/views/FAQPage.vue';
import AdminMainPage from '@/views/admin/MainPage.vue'

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
        meta: { title: 'Товары' },
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage,
        meta: { title: 'Вход' },
    },
    {
        path: '/register',
        name: 'RegisterPage',
        component: RegistrationPage,
        meta: { title: 'Регистрация' },
    },
    {
        path: '/product/:id',
        name: 'ProductPage',
        component: ProductPage,
        props: true,
        meta: { title: 'Товар' },
    },
    {
        path: '/cart',
        name: 'CartPage',
        component: CartPage,
        meta: { requiresAuth: true, title: 'Корзина' },
    },
    {
        path: '/checkout',
        name: 'CheckoutPage',
        component: CheckoutPage,
        meta: { requiresAuth: true, title: 'Оформление заказа' },
    },
    {
        path: '/profile',
        name: 'ProfilePage',
        component: ProfilePage,
        meta: { requiresAuth: true, title: 'Профиль' },
    },
    {
        path: '/thanks',
        name: 'ThanksPage',
        component: ThanksPage,
        meta: { title: 'Спасибо за заказ' },
    },
    {
        path: '/terms-of-service',
        name: 'TermsOfServicePage',
        component: TermsOfServicePage,
        meta: { title: 'Условия использования' },
    },
    {
        path: '/privacy-policy',
        name: 'PrivacyPolicyPage',
        component: PrivacyPolicyPage,
        meta: { title: 'Политика конфиденциальности' },
    },
    {
        path: '/faq',
        name: 'FAQPage',
        component: FAQPage,
        meta: { title: 'Часто задаваемые вопросы' },
    },
    {
        path: '/admin/colors',
        name: 'AdminColorsPage',
        component: AdminColorsPage,
        meta: { requiresAuth: true, requiredRole: 'ADMIN', title: 'Управление цветами' },
    },
    {
        path: '/admin/colors/add',
        name: 'AdminAddColorPage',
        component: AdminAddColorPage,
        meta: { requiresAuth: true, requiredRole: 'ADMIN', title: 'Добавить цвет' },
    },
    {
        path: '/admin/sizes',
        name: 'AdminSizesPage',
        component: AdminSizesPage,
        meta: { requiresAuth: true, requiredRole: 'ADMIN', title: 'Управление размерами' },
    },
    {
        path: '/admin/sizes/add',
        name: 'AdminAddSizePage',
        component: AdminAddSizePage,
        meta: { requiresAuth: true, requiredRole: 'ADMIN', title: 'Добавить размер' },
    },
    {
        path: '/admin/products',
        name: 'AdminProductsPage',
        component: AdminProductsPage,
        meta: { requiresAuth: true, requiredRole: 'ADMIN', title: 'Управление товарами' },
    },
    {
        path: '/admin/products/add',
        name: 'AdminAddProductPage',
        component: AdminChangeAndAddProductPage,
        props: { isEdit: false },
        meta: { requiresAuth: true, requiredRole: 'ADMIN', title: 'Добавить товар' },
    },
    {
        path: '/admin/products/edit/:id',
        name: 'AdminEditProductPage',
        component: AdminChangeAndAddProductPage,
        props: route => ({ isEdit: true, productId: parseInt(route.params.id) }),
        meta: { requiresAuth: true, requiredRole: 'ADMIN', title: 'Редактировать товар' },
    },
    {
        path: '/admin/orders',
        name: 'OrdersPage',
        component: OrdersPage,
        props: true,
        meta: { requiresAuth: true, requiredRole: 'ADMIN', title: 'Заказы' },
    },
    {
        path: '/admin',
        name: 'AdminPage',
        component: AdminMainPage,
        props: true,
        meta: { requiresAuth: true, requiredRole: 'ADMIN', title: 'Админ-панель' },
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

    // Установка заголовка страницы
    const pageTitle = to.meta.title || 'ArtShaped';
    document.title = `${pageTitle} | ArtShaped`;

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
        const decoded = atob(parts[1]);
        return JSON.parse(decoded);
    } catch (error) {
        throw new Error('Ошибка при декодировании токена: ' + error.message);
    }
}

export default router;