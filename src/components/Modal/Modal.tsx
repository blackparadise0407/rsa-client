import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

import ModalMask from './ModalMask';

type ModalProps = {
    children: ReactNode;
    open?: boolean;
    onCancel?: () => void;
    onClose?: () => void;
};

const dropIn = {
    hidden: { opacity: 0, y: '-100vh' },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 100,
            stiffness: 500,
        },
    },
    exit: { opacity: 0, y: '100vh' },
};

export default function Modal({ children, open = false, onClose }: ModalProps) {
    const handleClickOutside = () => {
        onClose?.();
    };

    return (
        <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
        >
            {open && (
                <ModalMask onClick={handleClickOutside}>
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        className=""
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropIn}
                    >
                        {children}
                    </motion.div>
                </ModalMask>
            )}
        </AnimatePresence>
    );
}
