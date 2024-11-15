import axios from '../axiosInstance';

// Получение содержимого корзины текущего пользователя
export const getCart = () => {
    return axios.get('/cart');
};

// Добавление продукта в корзину текущего пользователя
export const addProductToCart = (productId, quantity, colorId, sizeId) => {
    return axios.post('/cart/add', null, {
        params: { productId, quantity, colorId, sizeId },
    });
};

// Удаление продукта из корзины по идентификатору элемента корзины (cartItemId)
export const removeProductFromCart = (cartItemId) => {
    return axios.delete(`/cart/remove/${cartItemId}`);
};

// Очистка всей корзины текущего пользователя
export const clearCart = () => {
    return axios.delete('/cart/clear');
};
