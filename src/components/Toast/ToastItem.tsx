import { memo, useEffect } from 'react';
import clsx from 'clsx';
import { BiX } from 'react-icons/bi';

type ToastItemProps = {
    data: IToastItem;
    onRemove?: (id: string) => void;
};

const _getStyleFromType = (type: IToastType) => {
    switch (type) {
        case 'default':
            return 'text-black bg-white';
        case 'success':
            return 'text-white bg-green-500';
        case 'error':
            return 'text-white bg-red-500';
        default:
            return '';
    }
};

export default memo(function ToastItem({
    data: { type, message, id },
    onRemove = () => {},
}: ToastItemProps) {
    const handleRemoveById = () => {
        onRemove(id);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            onRemove?.(id);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={clsx(
                'relative text-sm min-w-[280px] max-w-[500px] shadow-lg rounded px-4 py-3',
                _getStyleFromType(type),
            )}
        >
            {message}
            <BiX
                className="absolute top-1 right-1 text-xl cursor-pointer"
                onClick={handleRemoveById}
            />
        </div>
    );
});
