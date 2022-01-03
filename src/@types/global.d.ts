import { LoginDto, RegisterDto } from 'apis';

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
        id: string;
        url: string;
        blob: string;
        created_by_id: string;
        created_by?: IUser;
        created_at: number;
    }

    interface IImageState extends IImage {
        isSelected: boolean;
    }

    interface IImageContext {
        data: IImageState[];
        loading: boolean;
        error: string;
        onAdd: (data: File, cb?: ErrorCb) => void;
        onDeleteSingle: (id: string) => void;
        onSelectSingle: (id: string) => void;
        onSelectOrDeselectAll: (deselect?: boolean) => void;
        onDeleteMultiple: (ids: Array<string>) => void;
    }

    interface ErrorCb {
        (error: string): void;
    }
}

export {};
