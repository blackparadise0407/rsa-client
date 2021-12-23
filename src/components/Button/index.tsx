import clsx from 'clsx';
import { HTMLProps } from 'react';

type ButtonType = 'primary' | 'secondary' | 'default';

type HTMLButtonType = 'button' | 'submit' | 'reset';

type ButtonProps = {
    type?: ButtonType;
    htmlType?: HTMLButtonType;
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
    children,
    ...rest
}: ButtonProps) {
    return (
        <div className="h-10 flex items-center">
            <button
                className={clsx(
                    'px-3 md:px-4 py-1 font-medium md:font-bold text-sm md:text-base border-b-[5px] active:translate-y-[3px] active:border-b-[2px] transition-all rounded-full',
                    _getButtonClassNameFromType(type),
                )}
                type={htmlType}
                {...rest}
            >
                {children}
            </button>
        </div>
    );
}
