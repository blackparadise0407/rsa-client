import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { IMAGES } from 'assets';
import { Button, FlexGrow, Modal } from 'components';
import { useAuthContext } from 'contexts/AuthContext';
import SignInForm from './SignInForm';
import RegisterForm from './RegisterForm';

import './Landing.css';

type FormKey = 'signin' | 'register';

export default function Landing() {
    const { isAuth } = useAuthContext();
    const navigate = useNavigate();
    const [modalKey, setModalKey] = useState<FormKey>(null);

    const handleOpenSignIn = () => {
        setModalKey('signin');
    };

    const handleCloseAllModal = () => {
        setModalKey(null);
    };

    const handleOpenRegister = () => {
        setModalKey('register');
    };

    useEffect(() => {
        if (isAuth) {
            navigate('/', { replace: true });
        }
    }, [isAuth]);

    return (
        <div className="landing-page h-screen overflow-y-hidden flex flex-col bg-indigo-200">
            <motion.div
                animate={{ y: [-200, 0], opacity: [0, 1] }}
                transition={{ duration: 1 }}
            >
                <nav className="flex items-center py-6 px-2 sm:px-10 md:px-20 lg:px-36">
                    <div className="font-bold">
                        <img
                            className="w-[129px]"
                            src={IMAGES.Logo2}
                            alt="logo"
                        />
                    </div>
                    <FlexGrow />
                    <ul className="flex items-center text-xs sm:text-sm md:text-base space-x-5 md:space-x-10">
                        <li className="hover:text-gray-400 transition-colors cursor-pointer">
                            Home
                        </li>
                        <li className="hover:text-gray-400 transition-colors cursor-pointer">
                            About us
                        </li>
                        <li className="hover:text-gray-400 transition-colors cursor-pointer">
                            Contact us
                        </li>
                        <li className="hover:text-gray-400 transition-colors cursor-pointer">
                            <Button type="primary" onClick={handleOpenSignIn}>
                                Sign in
                            </Button>
                        </li>
                    </ul>
                </nav>
            </motion.div>
            <div className="flex flex-col justify-center h-full px-2 sm:px-10 md:px-20 lg:px-36">
                <div className="max-w-full md:max-w-sm lg:max-w-lg space-y-5 md:bg-transparent bg-white bg-opacity-70 p-5 rounded">
                    <motion.div
                        animate={{ x: [-500, 0], opacity: [0, 1] }}
                        transition={{ duration: 1 }}
                    >
                        <p className="font-bold capitalize text-2xl sm:text-3xl md:text-4xl lg:text-6xl">
                            Secure storage
                        </p>
                    </motion.div>
                    <motion.div
                        animate={{ x: [500, 0], opacity: [0, 1] }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <p className="text-sm sm:text-base">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Illum, ea. Debitis dolore distinctio numquam
                            ducimus, natus omnis voluptates necessitatibus iusto
                            ab vel quia voluptatum. Nobis ut minima voluptas
                            eaque blanditiis ad.
                        </p>
                    </motion.div>
                    <motion.div
                        animate={{ y: [200, 0], opacity: [0, 1] }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                    >
                        <Button type="primary" onClick={handleOpenRegister}>
                            Get started now
                        </Button>
                    </motion.div>
                </div>
            </div>

            <Modal open={modalKey === 'signin'} onClose={handleCloseAllModal}>
                <SignInForm />
            </Modal>
            <Modal open={modalKey === 'register'} onClose={handleCloseAllModal}>
                <RegisterForm />
            </Modal>
        </div>
    );
}
