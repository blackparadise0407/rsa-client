import { HTMLProps } from 'react';
import clsx from 'clsx';

import Spinner from '../Spinner';

type ButtonType = 'primary' | 'secondary' | 'default';

type HTMLButtonType = 'button' | 'submit' | 'reset';

type ButtonProps = {
    type?: ButtonType;
    htmlType?: HTMLButtonType;
    block?: boolean;
    loading?: boolean;
} & Omit<HTMLProps<HTMLButtonElement>, 'type'>;

const _getButtonClassNameFromType = (type: ButtonType): string => {
    switch (type) {
        case 'default':
            return 'bg-gray-100 border-gray-300 text-black';
        case 'primary':
            return 'bg-indigo-500 border-indigo-600 hover:bg-indigo-400 text-white';
        case 'secondary':
            return 'bg-teal-500 border-teal-600 hover:bg-teal-400 text-white';
        default:
            return '';
    }
};

export default function Button({
    type = 'default',
    htmlType = 'button',
    block = false,
    children,
    className,
    loading = false,
    ...rest
}: ButtonProps) {
    return (
        <div
            className={clsx(
                'h-10 flex items-center',
                block && 'block w-full',
                className,
            )}
        >
            <button
                className={clsx(
                    'flex justify-center select-none items-center px-3 md:px-4 py-1 font-medium md:font-bold text-sm md:text-base border-b-[5px] active:translate-y-[3px] active:border-b-[2px] transition-all rounded-full',
                    block && 'block w-full',
                    _getButtonClassNameFromType(type),
                    loading && 'pointer-events-none',
                )}
                type={htmlType}
                {...rest}
            >
                {loading && <Spinner className="mr-2" />}
                {children}
            </button>
        </div>
    );
}
