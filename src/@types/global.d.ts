import { Dayjs } from 'dayjs';
import { RouteProps } from 'react-router-dom';

declare global {
    type IRoute = RouteProps;

    interface IAuthContext {
        user: any;
        onSignIn: () => void;
        onSignOut: () => void;
        onRegister: () => void;
    }

    interface IImage {
        id: string;
        url?: string;
        blob: string;
        user_id: string;
        user?: any;
        createdAt: Dayjs | number;
    }
}

export {};
