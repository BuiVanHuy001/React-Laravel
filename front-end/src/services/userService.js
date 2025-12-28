import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api/users';

export const getUsers = async (page = 1, perPage = 10) => {
    const response = await axios.get(API_URL, {
        params: {
            page,
            per_page: perPage
        }
    });

    return response.data;
};

export const getUser = async (id) => {
    const response = await axios.get(API_URL + `/${id}`);

    return response.data;
}

export const destroyUser = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);

    return response.data;
}

export const storeUser = async (userData) => {
    const response = await axios.post(API_URL, userData);

    return response.data;
}

export const updateUser = async (userId, userData) => {
    // Kiểm tra nếu là FormData thì mới dùng Method Spoofing cho Laravel
    if (userData instanceof FormData) {
        userData.append('_method', 'PUT');
        // Laravel yêu cầu POST + _method=PUT khi gửi file
        const response = await axios.post(`${API_URL}/${userId}`, userData);
        return response.data;
    }

    // Nếu là JSON Object thông thường, sử dụng PATCH/PUT trực tiếp
    const response = await axios.patch(`${API_URL}/${userId}`, userData);
    return response.data;
}