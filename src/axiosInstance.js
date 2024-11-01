import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api', // Укажите базовый URL для вашего API
    timeout: 10000, // Задает таймаут (по желанию)
});

// Перехватчик для добавления токена к каждому запросу
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken'); // Получаем токен из localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Устанавливаем заголовок Authorization
        }
        return config;
    },
    error => Promise.reject(error)
);

// Обработка ошибок глобально
instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Обработка ошибки 401 (Unauthorized)
            console.error('Unauthorized, redirecting to login');
            // Здесь можно перенаправить пользователя на страницу входа, если токен недействителен
        }
        return Promise.reject(error);
    }
);

export default instance;
