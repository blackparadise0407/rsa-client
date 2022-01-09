import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from 'react';

import {
    deleteImages,
    getCurrentUserImages,
    uploadMultipleImages,
} from 'apis/image';
import { useToast } from './ToastContext';
import { useAuthContext } from './AuthContext';

const initialState: IImageContext = {
    loading: false,
    data: [],
    error: null,
    onAdd: () => {},
    onDeleteSingle: () => {},
    onSelectSingle: () => {},
    onSelectOrDeselectAll: () => {},
    onDeleteMultiple: () => {},
    handleFetchImage: () => {},
};

const ImageContext = createContext<IImageContext>(initialState);

type ImageContextProviderProps = {
    children: ReactNode;
};

function ImageContextProvider({ children }: ImageContextProviderProps) {
    const { enqueue } = useToast();
    const { user } = useAuthContext();
    const [state, setState] = useState<
        Omit<
            IImageContext,
            | 'onAdd'
            | 'onSelectOrDeselectAll'
            | 'onSelectSingle'
            | 'onDeleteSingle'
            | 'onDeleteMultiple'
            | 'handleFetchImage'
        >
    >({
        loading: false,
        data: [],
        error: null,
    });

    const handleAddNewImage = useCallback(
        async (files: CustomFile[], cb: ErrorCb) => {
            setState((prev) => ({ ...prev, loading: true }));
            try {
                await uploadMultipleImages({ files });
                await handleFetchImage();
                enqueue('Upload images successfully', { variant: 'success' });
                cb(null);
            } catch (e: any) {
                enqueue(e, { variant: 'error' });
                cb(e);
            } finally {
                setState((prev) => ({ ...prev, loading: false }));
            }
        },
        [],
    );

    const handleFetchImage = async () => {
        setState({ ...state, loading: true });
        try {
            const images = await getCurrentUserImages();
            const data: IImageState[] = images.map((x) => ({
                ...x,
                isSelected: false,
            }));
            setState({ ...state, data });
        } catch (e: any) {
            setState({ ...state, error: e?.message });
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    const handleSelectSingleImage = useCallback((id: any) => {
        setState((prev) => {
            const foundIdx = prev.data.findIndex((x) => x.id === id);
            const updateData = [...prev.data];
            if (foundIdx > -1) {
                const updateImage = updateData[foundIdx];
                updateData[foundIdx] = {
                    ...updateImage,
                    isSelected: !updateImage.isSelected,
                };
                return { ...prev, data: updateData };
            } else return prev;
        });
    }, []);

    const handleSelectOrDeselectAllImage = useCallback((deselect = false) => {
        setState((prev) => ({
            ...prev,
            data: prev.data.map((x) => ({
                ...x,
                isSelected: !deselect,
            })),
        }));
    }, []);

    const handleDeleteSingleImage = useCallback(async (id: any) => {
        try {
            const msg = await deleteImages([id]);
            enqueue(msg, { variant: 'success' });
            setState((prev) => {
                const foundIdx = prev.data.findIndex((x) => x.id === id);
                const updateData = [...prev.data];
                if (foundIdx > -1) {
                    updateData.splice(foundIdx, 1);
                    return { ...prev, data: updateData };
                } else return prev;
            });
        } catch (e: any) {
            enqueue(e, { variant: 'error' });
        }
    }, []);

    const handleDeleteMultipleImage = useCallback(
        async (ids: Array<string>) => {
            try {
                const msg = await deleteImages(ids);
                setState((prev) => {
                    const updateData = prev.data.filter(
                        (x) =>
                            !ids.includes(x.id) || user.id !== x.created_by_id,
                    );
                    return {
                        ...prev,
                        data: updateData,
                    };
                });
                enqueue(msg, { variant: 'success' });
            } catch (e: any) {
                enqueue(e, { variant: 'error' });
            }
        },
        [user],
    );

    return (
        <ImageContext.Provider
            value={{
                ...state,
                onAdd: handleAddNewImage,
                onSelectOrDeselectAll: handleSelectOrDeselectAllImage,
                onSelectSingle: handleSelectSingleImage,
                onDeleteSingle: handleDeleteSingleImage,
                onDeleteMultiple: handleDeleteMultipleImage,
                handleFetchImage,
            }}
        >
            {children}
        </ImageContext.Provider>
    );
}

export function useImageContext() {
    return useContext(ImageContext);
}

export default ImageContextProvider;
