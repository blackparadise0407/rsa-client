import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from 'react';

const initialState: IAuthContext = {
    user: null,
    onRegister: () => {},
    onSignIn: () => {},
    onSignOut: () => {},
};
const AuthContext = createContext<IAuthContext>(initialState);

type AuthContextProviderProps = {
    children: ReactNode;
};

function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState(initialState.user);

    const handleSignIn = useCallback(() => {}, []);
    const handleSignOut = useCallback(() => {}, []);
    const handleRegister = useCallback(() => {}, []);

    return (
        <AuthContext.Provider
            value={{
                user,
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
