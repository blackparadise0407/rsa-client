import { RouteProps } from 'react-router-dom';

declare global {
    type IRoute = RouteProps;

    interface IAuthContext {
        user: any;
        onSignIn: () => void;
        onSignOut: () => void;
        onRegister: () => void;
    }
}

export {};
