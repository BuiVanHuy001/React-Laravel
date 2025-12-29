import {API_PATHS} from "../config/apiPaths.js";
import api from "../config/apiConfig.js";

export const getUsers = async (page = 1, perPage = 10) => {
    return await api.get(API_PATHS.USERS.INDEX, {
        params: {
            page,
            per_page: perPage
        }
    });
};

export const getUser = async (id) => {
    return await api.get(API_PATHS.USERS.SHOW(id));
}

export const destroyUser = async (id) => {
    return await api.delete(API_PATHS.USERS.DESTROY(id));
}

export const storeUser = async (userData) => {
    return await api.post(API_PATHS.USERS.STORE, userData);
}

export const updateUser = async (userId, userData) => {
    const url = API_PATHS.USERS.UPDATE(userId);

    if (userData instanceof FormData) {
        userData.append('_method', 'PUT');
        return await api.post(url, userData);
    }

    return await api.patch(url, userData);
}