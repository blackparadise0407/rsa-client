import clsx from 'clsx';
import { ImageCard } from 'components';
import { useImageContext } from 'contexts/ImageContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';
import {
    BiDownload,
    BiCheckboxMinus,
    BiTrash,
    BiCheckboxChecked,
} from 'react-icons/bi';

export default function Dashboard() {
    const { data, onSelectSingle, onSelectOrDeselectAll, onDeleteSingle } =
        useImageContext();
    const isSelectAll = useMemo(() => data.every((x) => x.isSelected), [data]);

    const hasSelectedData = useMemo(
        () => data.some((x) => x.isSelected),
        [data],
    );

    const handleSelectOrDeselectAll = () => {
        onSelectOrDeselectAll(isSelectAll);
    };

    return (
        <div className="space-y-4">
            <div className="sticky z-50 top-0 right-8 bg-white p-3 rounded-lg shadow transition-all">
                <ul className="flex flex-wrap space-x-5">
                    <li
                        className="flex flex-grow sm:flex-grow-0 items-center space-x-2 cursor-pointer"
                        onClick={handleSelectOrDeselectAll}
                    >
                        {isSelectAll ? (
                            <BiCheckboxMinus />
                        ) : (
                            <BiCheckboxChecked />
                        )}
                        <span className="text-sm">
                            {isSelectAll ? 'Deselect' : 'Select'} all
                        </span>
                    </li>
                    <li
                        className={clsx(
                            'flex items-center space-x-2 cursor-pointer',
                            hasSelectedData
                                ? 'text-blue-500'
                                : 'text-gray-400 pointer-events-none',
                        )}
                    >
                        <BiDownload />
                        <span className="text-sm">Download</span>
                    </li>
                    <li
                        className={clsx(
                            'flex items-center space-x-2 cursor-pointer',
                            hasSelectedData
                                ? 'text-red-500'
                                : 'text-gray-400 pointer-events-none',
                        )}
                    >
                        <BiTrash />
                        <span className="text-sm">Delete</span>
                    </li>
                </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
                <AnimatePresence initial={false}>
                    {data.map((item) => (
                        <motion.div
                            key={item.id}
                            exit={{
                                scale: 0.4,
                                opacity: 0,
                                transition: {
                                    duration: 0.3,
                                },
                            }}
                        >
                            <ImageCard
                                data={item}
                                isSelected={item.isSelected}
                                onSelect={onSelectSingle}
                                onDelete={onDeleteSingle}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
