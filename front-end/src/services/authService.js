import {API_PATHS} from "../config/apiPaths.js";
import api from "../config/apiConfig.js";

export const login = async (credentials) => {
    return await api.post(API_PATHS.AUTH.LOGIN, credentials);
}

export const logout = async () => {
    return await api.post(API_PATHS.AUTH.LOGOUT);
}