import {createBrowserRouter, Navigate} from "react-router-dom";
import {AuthRoute} from "../guards/AuthRoute.jsx";
import {Login} from "../pages/auth/Login.jsx";
import {MainLayout} from "../layout/MainLayout.jsx";
import {UserList} from "../pages/users/UserList.jsx";
import {NotFound} from "../pages/errors/NotFound.jsx";
import {WEB_PATHS} from "../config/webPath.js";
import {Profile} from "../pages/account/Profile.jsx";

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
                    {path: WEB_PATHS.USERS.INDEX, element: <UserList/>},
                    {path: '/', element: <Navigate to="/users" replace/>},
                    {path: WEB_PATHS.ACCOUNT.PROFILE, element: <Profile/>},
                ]
            },
        ]
    },
    {
        path: '*', element: <NotFound/>
    }
])