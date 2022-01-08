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
    loading: false,
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
    const [state, setState] = useState<
        Omit<IAuthContext, 'onRegister' | 'onSignIn' | 'onSignOut'>
    >({
        user: initialState.user,
        isAuth: initialState.isAuth,
        loading: initialState.loading,
    });
    const { data } = useData(getCurrentUser, null);

    const handleSignIn = useCallback(async (data: LoginDto) => {
        setState((prev) => ({ ...prev, loading: true }));
        try {
            const { access_token, token_type } = await login(data);
            localStorage.setItem(
                ACCESS_TOKEN_KEY,
                `${token_type} ${access_token}`,
            );
            const user = await getCurrentUser();
            setState((prev) => ({ ...prev, user, isAuth: true }));
        } catch (e: any) {
            enqueue(e, { variant: 'error' });
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    }, []);

    const handleSignOut = useCallback(() => {
        setState({ ...state, isAuth: false, user: null });
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        window.location.reload();
    }, []);

    const handleRegister = useCallback(async (data: RegisterDto) => {
        setState((prev) => ({ ...prev, loading: true }));
        try {
            const message = await register(data);
            enqueue(message, { variant: 'success' });
        } catch (e: any) {
            enqueue(e, { variant: 'error' });
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    }, []);

    useEffect(() => {
        if (data) {
            setState({ ...state, user: data, isAuth: true });
        }
    }, [data]);

    return (
        <AuthContext.Provider
            value={{
                ...state,
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
