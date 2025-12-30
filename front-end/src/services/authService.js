import {API_PATHS} from "../config/apiPaths.js";
import api from "../config/apiConfig.js";

export const loginRequest = async (credentials) => {
    return await api.post(API_PATHS.AUTH.LOGIN, credentials);
}

export const logoutRequest = async () => {
    return await api.post(API_PATHS.AUTH.LOGOUT);
}