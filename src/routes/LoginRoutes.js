import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
const RecoverPassword =  Loadable(lazy(() => import('pages/authentication/Recover_Password')));
const ActivateUser = Loadable(lazy(() => import('pages/authentication/ActivateUser')))

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/',
            element: <AuthLogin />
        },
        // {
        //     path: 'register/:token',
        //     element: <AuthRegister />
        // },
        {
            path: 'recover-password',
            element: <RecoverPassword />
        },
        {
            path: 'recover-password/:token',
            element: <RecoverPassword />
        },
        {
            path: 'auth/restorepass',
            element: <AuthRegister />,
        },
        {
            path: 'activate-user',
            element: <ActivateUser />
        }
    ]
};

export default LoginRoutes;
