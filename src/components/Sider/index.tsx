import { ReactNode, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MdOutlineDashboard } from 'react-icons/md';
import { BiExpand, BiCollapse } from 'react-icons/bi';

import { FlexGrow } from 'components';

interface ISiderItem {
    key: string;
    label: string;
    icon: ReactNode;
    callback?: () => void;
}

const items: ISiderItem[] = [
    {
        key: '/',
        label: 'Dashboard',
        icon: <MdOutlineDashboard />,
        callback: () => {},
    },
    {
        key: 'dashboard',
        label: 'Dashboard',
        icon: <MdOutlineDashboard />,
        callback: () => {},
    },
];

const variants = {
    open: { width: 230 },
    collapsed: { width: 70 },
};

export default function Sider() {
    const { pathname } = useLocation();
    const [selectedKey, setSelectedKey] = useState('dashboard');
    const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);

    const handleMenuToggleCollapse = useCallback(() => {
        setIsCollapsed(!isCollapsed);
    }, [isCollapsed]);

    useEffect(() => {
        setSelectedKey(pathname);
    }, [pathname]);

    return (
        <motion.div
            animate={isCollapsed ? 'collapsed' : 'open'}
            variants={variants}
            className="relative bg-primary h-[calc(100vh-64px)] w-[230px] overflow-hidden"
        >
            <ul className="w-full flex flex-col items-center px-4 space-y-4 font-bold">
                {items.map(({ key, icon, label, callback }) => (
                    <motion.div
                        className="w-full"
                        key={key}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to={key}
                            className={clsx(
                                'flex items-center h-10 text-white text-sm px-4 py-2.5 rounded-lg cursor-pointer overflow-hidden',
                                selectedKey === key && 'bg-white text-primary',
                                isCollapsed && 'justify-center',
                            )}
                            onClick={() => {
                                setSelectedKey(key);
                                callback?.();
                            }}
                        >
                            <span>{icon}</span>
                            {!isCollapsed && (
                                <span className="ml-2">{label}</span>
                            )}
                        </Link>
                    </motion.div>
                ))}
            </ul>
            <div className="absolute w-full bottom-0 px-4 py-3 bg-secondary">
                <div className="flex items-center">
                    <AnimatePresence
                        initial={false}
                        exitBeforeEnter={true}
                        onExitComplete={() => null}
                    >
                        {!isCollapsed && (
                            <motion.div
                                className="flex items-center"
                                initial={{ opacity: 0, x: -200 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    position: 'absolute',
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -200,
                                }}
                            >
                                <div className="w-10 h-10 rounded-lg overflow-hidden">
                                    <img
                                        src="https://i.pravatar.cc/300"
                                        alt="avatar"
                                    />
                                </div>
                                <div className="flex flex-col ml-2 text-white">
                                    <span>Khoa Pham</span>
                                    <span className="text-xs">
                                        Web designer
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <FlexGrow />
                    <div
                        className={clsx('p-2')}
                        onClick={handleMenuToggleCollapse}
                    >
                        {isCollapsed ? (
                            <BiExpand className="text-white text-xl" />
                        ) : (
                            <BiCollapse className="text-white text-xl" />
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
