import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

const initialState: IImageContext = {
    loading: false,
    data: [],
    error: null,
    onAdd: () => {},
    onDeleteSingle: () => {},
    onSelectSingle: () => {},
    onSelectOrDeselectAll: () => {},
};

const mockData: IImageState[] = [
    {
        id: 1,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
    },
    {
        id: 2,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
    },
    {
        id: 3,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
    },
    {
        id: 4,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
    },
    {
        id: 5,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
    },
    {
        id: 6,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
    },
    {
        id: 7,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
    },
    {
        id: 8,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
    },
    {
        id: 9,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
    },
    {
        id: 10,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
    },
    {
        id: 11,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
    },
];

const ImageContext = createContext<IImageContext>(initialState);

type ImageContextProviderProps = {
    children: ReactNode;
};

function ImageContextProvider({ children }: ImageContextProviderProps) {
    const [state, setState] = useState<
        Omit<
            IImageContext,
            | 'onAdd'
            | 'onSelectOrDeselectAll'
            | 'onSelectSingle'
            | 'onDeleteSingle'
        >
    >({
        loading: false,
        data: [...mockData],
        error: null,
    });

    const handleAddNewImage = () => {};

    const handleFetchImage = async () => {
        setState({ ...state, loading: true });
        try {
        } catch (e: any) {
            setState({ ...state, error: e?.message, loading: false });
        } finally {
            setState({ ...state, loading: false });
        }
    };

    const handleSelectSingleImage = useCallback(
        (id: any) => {
            const foundIdx = state.data.findIndex((x) => x.id === id);
            const updateData = [...state.data];
            if (foundIdx > -1) {
                const updateImage = updateData[foundIdx];
                updateData[foundIdx] = {
                    ...updateImage,
                    isSelected: !updateImage.isSelected,
                };
                setState({ ...state, data: updateData });
            }
        },
        [state],
    );

    const handleSelectOrDeselectAllImage = useCallback(
        (deselect = false) => {
            const updateData = state.data.map((x) => ({
                ...x,
                isSelected: !deselect,
            }));
            setState({ ...state, data: updateData });
        },
        [state],
    );

    const handleDeleteSingleImage = useCallback(
        (id: any) => {
            const foundIdx = state.data.findIndex((x) => x.id === id);
            const updateData = [...state.data];
            if (foundIdx > -1) {
                updateData.splice(foundIdx, 1);
                setState({ ...state, data: updateData });
            }
        },
        [state],
    );

    useEffect(() => {
        handleFetchImage();
    }, []);

    return (
        <ImageContext.Provider
            value={{
                ...state,
                onAdd: handleAddNewImage,
                onSelectOrDeselectAll: handleSelectOrDeselectAllImage,
                onSelectSingle: handleSelectSingleImage,
                onDeleteSingle: handleDeleteSingleImage,
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
