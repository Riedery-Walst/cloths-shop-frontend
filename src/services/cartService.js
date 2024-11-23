import axios from '@axios';

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

export const updateCartItemQuantity = (cartItemId, quantity) => {
    return axios.patch(`/cart/updateQuantity/${cartItemId}`, null, {
        params: { quantity }
    });
};

// Удаление товара из корзины
export const removeCartItem = (cartItemId) => {
    return axios.delete(`/cart/remove/${cartItemId}`);
};
