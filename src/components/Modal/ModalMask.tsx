import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type ModalMaskProps = {
    children: ReactNode;
    onClick?: () => void;
};

export default function ModalMask({ children, onClick }: ModalMaskProps) {
    return (
        <motion.div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}
