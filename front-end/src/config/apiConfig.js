import axios from "axios";
import {API_PATHS} from "./apiPaths.js";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
})

api.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            window.location.href = API_PATHS.AUTH.LOGIN;
        }
        return Promise.reject(error);
    }
);

export default api;