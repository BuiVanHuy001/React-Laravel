import axios from "axios";
import {WEB_PATHS} from "./webPath.js";

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
            const isLoginRequest = error.config?.url?.includes(WEB_PATHS.AUTH.LOGIN);

            if (!isLoginRequest) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user');
                window.location.href = WEB_PATHS.AUTH.LOGIN;
            }
        }
        return Promise.reject(error);
    }
);

export default api;