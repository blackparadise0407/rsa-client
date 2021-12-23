import { HTMLProps } from 'react';

type InputProps = {} & HTMLProps<HTMLInputElement>;

export default function Input({ placeholder = '', ...rest }: InputProps) {
    return (
        <div className="relative h-10 my-3">
            <input
                placeholder=" "
                className="w-full h-full px-4 py-2 border border-gray-300 rounded-md font-medium bg-white peer ring-indigo-500 ring-1 focus:ring-1 placeholder-shown:ring-0"
                {...rest}
            />
            <label className="absolute px-1 pointer-events-none bg-white left-4 top-0 text-gray-600 -translate-y-1/2 text-sm transition-all peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:text-gray-600 peer-focus:text-sm peer-focus:bg-white">
                {placeholder}
            </label>
        </div>
    );
}
