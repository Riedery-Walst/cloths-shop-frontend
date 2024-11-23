import { getCart } from '@services/cartService';
import { fetchColors, fetchSizes } from '@services/productOptionsService';
import axios from '@axios';

/**
 * Получение полной информации о корзине: продукты, цвета и размеры.
 */
export const getFullCartData = async () => {
    try {
        // Шаг 1: Получаем корзину
        const cartResponse = await getCart();
        const cart = cartResponse.data;

        // Шаг 2: Получаем продукты
        const productsResponse = await axios.get('/products');
        const products = productsResponse.data;

        // Шаг 3: Получаем цвета и размеры
        const colors = await fetchColors();
        const sizes = await fetchSizes();

        // Шаг 4: Обогащаем данные корзины
        const enrichedCartItems = cart.items.map((cartItem) => {
            const product = products.find((p) => p.id === cartItem.productId);
            if (!product) return null;

            const color = colors.find((c) => c.id === cartItem.colorId);
            const size = sizes.find((s) => s.id === cartItem.sizeId);

            const imageUrl = product.photos && product.photos.length > 0
                ? product.photos[0].replace(/\\/g, '/')
                : null;

            return {
                id: cartItem.id,
                productId: cartItem.productId,
                name: product.name,
                price: product.price,
                quantity: cartItem.quantity,
                color: color ? color.name : 'Неизвестно',
                size: size ? size.name : 'Неизвестно',
                imageUrl,
            };
        }).filter(Boolean);

        // Возвращаем обогащенные данные корзины и итоговую сумму
        const totalPrice = enrichedCartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        return {
            items: enrichedCartItems,
            totalPrice,
        };
    } catch (error) {
        console.error('Ошибка обработки данных корзины:', error);
        throw error;
    }
};
