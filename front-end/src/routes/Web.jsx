import {createBrowserRouter, Navigate} from "react-router-dom";
import {AuthRoute} from "../guards/AuthRoute.jsx";
import {Login} from "../pages/auth/Login.jsx";
import {MainLayout} from "../layout/MainLayout.jsx";
import {UserList} from "../pages/UserList.jsx";
import {NotFound} from "../pages/error/NotFound.jsx";

export const router = createBrowserRouter([
    {
        element: <AuthRoute type='guest'/>,
        children: [
            {path: '/login', element: <Login/>}
        ]
    },
    {
        element: <AuthRoute/>,
        children: [
            {
                path: '/',
                element: <MainLayout/>,
                children: [
                    {path: '/users', element: <UserList/>},
                    {path: '/', element: <Navigate to="/users" replace/>}
                ]
            }
        ]
    },
    {
        path: '*', element: <NotFound/>
    }
])