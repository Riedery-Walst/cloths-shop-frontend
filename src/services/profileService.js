import axios from "@axios";

export const getProfile = async () => {
    try {
        const response = await axios.get("/users/profile");
        return response.data;
    } catch (error) {
        console.error("Ошибка получения данных профиля:", error);
        throw error;
    }
};

export const updateProfile = async (form) => {
    try {
        const response = await axios.put("/users/profile", form);
        return response.data;
    } catch (error) {
        console.error("Ошибка обновления данных профиля:", error);
        throw error;
    }
};

export const deleteProfile = async () => {
    try {
        await axios.delete("/users/profile");
    } catch (error) {
        console.error("Ошибка удаления профиля:", error);
        throw error;
    }
};
