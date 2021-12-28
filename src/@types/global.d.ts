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
        id: string | number;
        url?: string;
        blob: string;
        user_id: string;
        user?: any;
        createdAt: Dayjs | number;
    }

    interface IImageState extends IImage {
        isSelected: boolean;
    }

    interface IImageContext {
        data: IImageState[];
        loading: boolean;
        error: string;
        onAdd: (data: IImage) => void;
        onDeleteSingle: (id: any) => void;
        onSelectSingle: (id: any) => void;
        onSelectOrDeselectAll: (deselect?: boolean) => void;
    }
}

export {};
