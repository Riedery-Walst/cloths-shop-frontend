import { getCart } from '@services/cartService';
import { fetchColors, fetchSizes } from '@services/productOptionsService';
import axios from '@axios';

/**
 * Получение полной информации о корзине: продукты, цвета и размеры.
 */
export const getFullCartData = async () => {
    try {
        const cartResponse = await getCart();
        const cart = cartResponse.data;

        const productsResponse = await axios.get('/products');
        const products = productsResponse.data;

        const colors = await fetchColors();
        const sizes = await fetchSizes();

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
                colorId: cartItem.colorId,
                sizeId: cartItem.sizeId,
                imageUrl,
            };
        }).filter(Boolean);

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
