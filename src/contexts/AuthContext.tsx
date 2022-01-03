import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

import { getCurrentUser, login, LoginDto, register, RegisterDto } from 'apis';
import { ACCESS_TOKEN_KEY } from 'app-constants/commons';
import { useData } from 'hooks';
import { useToast } from './ToastContext';

const initialState: IAuthContext = {
    user: null,
    isAuth: !!localStorage.getItem('access_token'),
    onRegister: async () => {},
    onSignIn: async () => {},
    onSignOut: () => {},
};
const AuthContext = createContext<IAuthContext>(initialState);

type AuthContextProviderProps = {
    children: ReactNode;
};

function AuthContextProvider({ children }: AuthContextProviderProps) {
    const { enqueue } = useToast();
    const [user, setUser] = useState(initialState.user);
    const [isAuth, setIsAuth] = useState(initialState.isAuth);
    const { data } = useData(getCurrentUser, null);

    const handleSignIn = useCallback(async (data: LoginDto) => {
        try {
            const { access_token, token_type } = await login(data);
            localStorage.setItem(
                ACCESS_TOKEN_KEY,
                `${token_type} ${access_token}`,
            );
            const user = await getCurrentUser();
            setIsAuth(true);
            setUser(user);
        } catch (e: any) {
            enqueue(e, { variant: 'error' });
        }
    }, []);

    const handleSignOut = useCallback(() => {
        setIsAuth(false);
        setUser(null);
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    }, []);

    const handleRegister = useCallback(async (data: RegisterDto) => {
        try {
            const message = await register(data);
            enqueue(message, { variant: 'success' });
        } catch (e: any) {
            enqueue(e, { variant: 'error' });
        }
    }, []);

    useEffect(() => {
        if (data) {
            setUser(data);
            setIsAuth(true);
        }
    }, [data]);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuth,
                onRegister: handleRegister,
                onSignIn: handleSignIn,
                onSignOut: handleSignOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}

export default AuthContextProvider;
