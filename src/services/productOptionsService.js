import axios from '@axios';

export const fetchColors = async () => {
    try {
        const response = await axios.get('/colors');
        return response.data;
    } catch (error) {
        console.error('Ошибка загрузки цветов:', error);
        throw error;
    }
};

export const fetchSizes = async () => {
    try {
        const response = await axios.get('/sizes');
        return response.data;
    } catch (error) {
        console.error('Ошибка загрузки размеров:', error);
        throw error;
    }
};
