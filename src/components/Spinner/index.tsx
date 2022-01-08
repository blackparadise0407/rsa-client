import clsx from 'clsx';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type SpinnerProps = {
    className?: string;
};

export default function Spinner({ className }: SpinnerProps) {
    return (
        <AiOutlineLoading3Quarters
            className={clsx('text-md text-white animate-spin', className)}
        />
    );
}
