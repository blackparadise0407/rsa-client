import { Button, FlexGrow } from 'components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div className="h-screen flex flex-col">
            <nav className="flex py-8 bg-white px-2 sm:px-10 md:px-20 lg:px-36">
                <div className="font-bold">Secure storage</div>
                <FlexGrow />
                <ul className="flex space-x-10">
                    <li className="hover:text-gray-400 transition-colors cursor-pointer">
                        Home
                    </li>
                    <li className="hover:text-gray-400 transition-colors cursor-pointer">
                        About us
                    </li>
                    <li className="hover:text-gray-400 transition-colors cursor-pointer">
                        Contact us
                    </li>
                </ul>
            </nav>
            <div className="flex flex-col justify-center h-full bg-indigo-200 px-2 sm:px-10 md:px-20 lg:px-36">
                <div className="max-w-xl space-y-4">
                    <motion.div
                        animate={{ x: [-500, 0], opacity: [0, 1] }}
                        transition={{ duration: 1 }}
                    >
                        <p className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl">
                            Secure storage
                        </p>
                    </motion.div>
                    <p className="text-sm sm:text-base">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Illum, ea. Debitis dolore distinctio numquam
                        ducimus, natus omnis voluptates necessitatibus iusto ab
                        vel quia voluptatum. Nobis ut minima voluptas eaque
                        blanditiis ad, fuga natus nemo consectetur dolor?
                        Tempora consectetur vero quidem.
                    </p>
                    <div className="h-10">
                        <Link to="/register">
                            <Button type="primary">Get started now</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
