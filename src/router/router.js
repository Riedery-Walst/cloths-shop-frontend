import { createRouter, createWebHistory } from 'vue-router';

// Динамически загружаем все компоненты
const MainPage = () => import('@/views/MainPage.vue');
const LoginPage = () => import('@/views/LoginPage.vue');
const RegistrationPage = () => import('@/views/RegistrationPage.vue');
const AdminColorsPage = () => import('@/views/admin/AdminColorsPage.vue');
const AdminSizesPage = () => import('@/views/AdminSizesPage.vue');
const AdminAddColorPage = () => import('@/views/admin/AdminAddColorPage.vue');
const AdminAddSizePage = () => import('@/views/admin/AdminAddSizePage.vue');
const ProductPage = () => import('@/views/ProductPage.vue');
const CartPage = () => import('@/views/CartPage.vue');
const AdminProductsPage = () => import('@/views/admin/AdminProductsPage.vue');
const AdminChangeAndAddProductPage = () => import('@/views/admin/AdminChangeAndAddProductPage.vue');

// Определяем маршруты
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
        component: AdminProductsPage,
        meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    },
    {
        path: '/products/add',
        name: 'AdminAddProductPage',
        component: AdminChangeAndAddProductPage,
        props: { isEdit: false },
        meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    },
    {
        path: '/products/edit/:id',
        name: 'AdminEditProductPage',
        component: AdminChangeAndAddProductPage,
        props: route => ({ isEdit: true, productId: parseInt(route.params.id) }),
        meta: { requiresAuth: true, requiredRole: 'ADMIN' },
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
    const role = token ? getRoleFromToken(token) : null;

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

// Функция для получения роли пользователя из токена
function getRoleFromToken(token) {
    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Декодируем токен
        return decodedToken.role; // Возвращаем роль
    } catch (error) {
        console.error('Ошибка при декодировании токена', error);
        return null;
    }
}

export default router;
