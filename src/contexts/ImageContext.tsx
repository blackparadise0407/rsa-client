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
        user: { name: 'Kyle' },
        url: 'https://i.pravatar.cc/150?img=1',
    },
    {
        id: 2,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
        user: { name: 'Kyle' },
        url: 'https://i.pravatar.cc/150?img=2',
    },
    {
        id: 3,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
        url: 'https://i.pravatar.cc/150?img=3',
    },
    {
        id: 4,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
        url: 'https://i.pravatar.cc/150?img=4',
    },
    {
        id: 5,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
        url: 'https://i.pravatar.cc/150?img=5',
    },
    {
        id: 6,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
        url: 'https://i.pravatar.cc/150?img=6',
    },
    {
        id: 7,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
        url: 'https://i.pravatar.cc/150?img=7',
    },
    {
        id: 8,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
        url: 'https://i.pravatar.cc/150?img=8',
    },
    {
        id: 9,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
        url: 'https://i.pravatar.cc/150?img=9',
    },
    {
        id: 10,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
        url: 'https://i.pravatar.cc/150?img=10',
    },
    {
        id: 11,
        blob: 'a',
        user_id: 'bob',
        createdAt: 1640398365,
        isSelected: false,
        url: 'https://i.pravatar.cc/150?img=11',
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
