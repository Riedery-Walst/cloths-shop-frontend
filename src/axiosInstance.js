import axios from 'axios';
import jwt_decode from 'jwt-decode';
import router from './router/router';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api', // Укажите базовый URL для вашего API
    timeout: 10000, // Задает таймаут (по желанию)
});

// Функция для проверки срока действия токена
function isTokenExpired(token) {
    if (!token) return true;
    try {
        const decoded = jwt_decode(token);
        const currentTime = Date.now() / 1000; // Текущее время в секундах
        return decoded.exp < currentTime; // Возвращает true, если токен истёк
    } catch (error) {
        console.error('Ошибка при декодировании токена:', error);
        return true;
    }
}

// Перехватчик для добавления токена к каждому запросу
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken'); // Получаем токен из localStorage
        if (isTokenExpired(token)) {
            // Токен просрочен, перенаправляем на страницу входа
            localStorage.removeItem('authToken'); // Удаляем токен из localStorage
            router.push('/login').catch(err => console.error('Ошибка перенаправления:', err)); // Перенаправляем на страницу входа
            return Promise.reject(new Error('Токен просрочен'));
        }

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
            localStorage.removeItem('authToken'); // Удаляем токен, так как он недействителен
            router.push('/login').catch(err => console.error('Ошибка перенаправления:', err)); // Перенаправляем пользователя на страницу входа
        }
        return Promise.reject(error);
    }
);

export default instance;
