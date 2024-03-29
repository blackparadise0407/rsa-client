import { ReactNode, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MdOutlineDashboard, MdOutlineAccountCircle } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import { RiMenuFoldLine, RiMenuLine } from 'react-icons/ri';

import { FlexGrow } from 'components';
import { SVGS } from 'assets';
import { useAuthContext } from 'contexts/AuthContext';

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
];

const variants = {
    open: { width: 230 },
    collapsed: { width: 70 },
};

export default function Sider() {
    const { pathname } = useLocation();
    const { user, onSignOut } = useAuthContext();
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
            className="relative bg-primary h-screen w-[230px] overflow-hidden"
        >
            <div
                className={clsx(
                    'flex h-[64px] text-xl p-3 items-center text-white',
                    isCollapsed ? 'justify-center' : 'justify-between',
                )}
            >
                {!isCollapsed && (
                    <img className="w-[36px]" src={SVGS.Logo2Svg} alt="" />
                )}
                <span
                    className="cursor-pointer"
                    onClick={handleMenuToggleCollapse}
                >
                    {isCollapsed ? <RiMenuLine /> : <RiMenuFoldLine />}
                </span>
            </div>

            <ul className="w-full flex flex-col items-center py-5 px-4 space-y-4 font-bold overflow-y-auto">
                {items.map(({ key, icon, label, callback }) => (
                    <motion.div
                        className="w-full"
                        key={key}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Link
                            to={key}
                            className={clsx(
                                'flex items-center h-10 text-white text-sm px-4 py-2.5 rounded-lg cursor-pointer overflow-hidden hover:text-black',
                                selectedKey === key
                                    ? 'bg-white text-primary'
                                    : 'hover:bg-white transition-colors ',
                                isCollapsed && 'justify-center',
                            )}
                            onClick={() => {
                                setSelectedKey(key);
                                callback?.();
                            }}
                        >
                            <span className="text-lg">{icon}</span>
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
                                    <span>{user?.username}</span>
                                    <span className="text-xs">
                                        Web designer
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <FlexGrow />
                    <div className="p-2 cursor-pointer">
                        <BiLogOut
                            onClick={onSignOut}
                            className="text-white text-xl"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
