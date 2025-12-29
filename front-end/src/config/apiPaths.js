export const API_PATHS = {
    AUTH: {
        LOGIN: '/login',
        LOGOUT: '/logout'
    },
    USERS: {
        INDEX: '/users',
        STORE: '/users',
        SHOW: (id) => `/users/${id}`,
        UPDATE: (id) => `/users/${id}`,
        DESTROY: (id) => `/users/${id}`,
    }
};