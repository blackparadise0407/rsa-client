import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from 'contexts/AuthContext';

type RequiredAuthProps = {};
export default function RequiredAuth(props: RequiredAuthProps) {
    const { isAuth } = useAuthContext();

    if (!isAuth) return <Navigate to="/welcome" />;
    return <Outlet />;
}
