import { ToastItem } from 'components';
import { AnimatePresence, motion } from 'framer-motion';
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from 'react';
import { v4 } from 'uuid';

const initialState: IToastContext = {
    toasts: [],
    enqueue: () => {},
};

const ToastContext = createContext<IToastContext>(initialState);

type ToastContextProviderProps = {
    children: ReactNode;
};

function ToastContextProvider({ children }: ToastContextProviderProps) {
    const [toasts, setToasts] = useState(initialState.toasts);

    const handleEnqueueToast = useCallback(
        (message: string, { variant = 'default' }: ToastOpts = {}) => {
            setToasts((prev) => {
                const clone = [...prev];
                clone.push({
                    id: v4(),
                    message,
                    type: variant,
                });
                return clone;
            });
        },
        [],
    );

    const handleRemoveToastById = useCallback((id: string) => {
        setToasts((prev) => {
            const foundIndex = prev.findIndex((i) => i.id === id);
            if (foundIndex > -1) {
                const clone = [...prev];
                clone.splice(foundIndex, 1);
                return clone;
            } else return prev;
        });
    }, []);

    return (
        <ToastContext.Provider
            value={{
                toasts,
                enqueue: handleEnqueueToast,
            }}
        >
            <div className="fixed top-5 right-5 z-[100] space-y-2">
                <AnimatePresence initial={false}>
                    {toasts.map((x) => (
                        <motion.div
                            key={x.id}
                            initial={{
                                opacity: 0,
                                x: 300,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                transition: {
                                    duration: 0.4,
                                    type: 'spring',
                                    damping: 20,
                                    stiffness: 300,
                                },
                            }}
                            exit={{
                                x: 300,
                                opacity: 0,
                                transition: { duration: 0.5 },
                            }}
                        >
                            <ToastItem
                                data={x}
                                onRemove={handleRemoveToastById}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}

export default ToastContextProvider;
