import { LoginDto, RegisterDto } from 'apis';
import { Dayjs } from 'dayjs';

declare global {
    interface IAuthContext {
        user: IUser;
        isAuth: boolean;
        onSignIn: (data: LoginDto) => Promise<void>;
        onSignOut: () => void;
        onRegister: (data: RegisterDto) => Promise<void>;
    }

    interface IToastContext {
        toasts: IToastItem[];
        enqueue: (message: string, opts?: ToastOpts) => void;
    }

    type ToastOpts = {
        variant?: IToastType;
    };

    type IToastType = 'success' | 'error' | 'default';
    interface IToastItem {
        id: string;
        message: string;
        type: IToastType;
    }

    interface IUser {
        id: string;
        username: string;
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
