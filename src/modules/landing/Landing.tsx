import { Button, FlexGrow } from 'components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div className="h-screen flex flex-col bg-indigo-200">
            <motion.div
                animate={{ y: [-200, 0], opacity: [0, 1] }}
                transition={{ duration: 1 }}
            >
                <nav className="flex bg-white items-center py-6 px-2 sm:px-10 md:px-20 lg:px-36">
                    <div className="font-bold">Secure storage</div>
                    <FlexGrow />
                    <ul className="flex items-center space-x-10">
                        <li className="hover:text-gray-400 transition-colors cursor-pointer">
                            Home
                        </li>
                        <li className="hover:text-gray-400 transition-colors cursor-pointer">
                            About us
                        </li>
                        <li className="hover:text-gray-400 transition-colors cursor-pointer">
                            Contact us
                        </li>
                        <li className="h-10 hover:text-gray-400 transition-colors cursor-pointer">
                            <Button type="primary">Sign in</Button>
                        </li>
                    </ul>
                </nav>
            </motion.div>
            <div className="flex flex-col justify-center h-full  px-2 sm:px-10 md:px-20 lg:px-36">
                <div className="max-w-xl space-y-5">
                    <motion.div
                        animate={{ x: [-500, 0], opacity: [0, 1] }}
                        transition={{ duration: 1 }}
                    >
                        <p className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl">
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
                            eaque blanditiis ad, fuga natus nemo consectetur
                            dolor? Tempora consectetur vero quidem.
                        </p>
                    </motion.div>
                    <motion.div
                        animate={{ y: [200, 0], opacity: [0, 1] }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                    >
                        <div className="h-10">
                            <Link to="/register">
                                <Button type="primary">Get started now</Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
