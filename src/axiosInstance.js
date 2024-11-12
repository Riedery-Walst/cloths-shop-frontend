import axios from 'axios';
import router from './router/router.js'; // Убедитесь, что путь соответствует структуре проекта

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
});

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized, redirecting to login');
            localStorage.removeItem('authToken');
            router.push('/login'); // Перенаправляем на страницу авторизации
        }
        return Promise.reject(error);
    }
);

export default instance;
