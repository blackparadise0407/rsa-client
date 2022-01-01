import { RouteObject } from 'react-router-dom';

import { NotFound, RequiredAuth } from 'components';
import { MainLayout } from 'layouts';
import { Register } from 'modules/auth';
import { Dashboard } from 'modules/dashboard';
import { Landing } from 'modules/landing';

const routes: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            {
                element: <RequiredAuth />,
                children: [
                    {
                        path: '/',
                        element: <Dashboard />,
                    },
                ],
            },
        ],
    },
    {
        path: '/welcome',
        element: <Landing />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/login',
        element: <Register />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
];

export default routes;
