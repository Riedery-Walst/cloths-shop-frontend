import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegistrationPage from '@/views/RegistrationPage.vue';
import ProductPage from '@/views/ProductPage.vue';

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
        path: '/product/:id',
        name: 'ProductPage',
        component: ProductPage,
        props: true,
    },
    {
        path: '/admin/colors',
        name: 'AdminColorsPage',
        component: () => import('../views/AdminColorsPage.vue')
    },
    {
        path: '/admin/colors/add',
        name: 'AdminAddColorPage',
        component: () => import('../views/AdminAddColorPage.vue')
    },
    {
        path: '/admin/sizes',
        name: 'AdminSizesPage',
        component: () => import('../views/AdminSizesPage.vue')
    },
    {
        path: '/admin/sizes/add',
        name: 'AdminAddSizePage',
        component: () => import('../views/AdminAddSizePage.vue')
    },
    {
        path: '/admin/products',
        name: 'AdminProductsPage',
        component: () => import('../views/AdminProductsPage.vue')
    },
    {
        path: '/admin/products/add',
        name: 'AdminAddProductPage',
        component: () => import('../views/AdminChangeAndAddProductPage.vue'),
        props: { isEdit: false },
    },
    {
        path: '/admin/products/edit/:id',
        name: 'AdminEditProductPage',
        component: () => import('../views/AdminChangeAndAddProductPage.vue'),
        props: route => ({ isEdit: true, productId: parseInt(route.params.id) }),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
