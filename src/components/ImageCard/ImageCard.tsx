import { MouseEvent, memo } from 'react';
import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import { BiCheck, BiDownload, BiShare, BiTrashAlt } from 'react-icons/bi';

import { IMAGES } from 'assets';
import { FlexGrow } from 'components';

type ImageCardProps = {
    data?: IImage;
    isSelected?: boolean;
    onDownload?: () => void;
    onShare?: (id: string | number) => void;
    onDelete?: (id: any) => void;
    onSelect?: (id: string | number) => void;
};

export default memo(function ImageCard({
    data = null,
    isSelected = false,
    onDelete = () => {},
    onDownload = () => {},
    onShare = () => {},
    onSelect = () => {},
}: ImageCardProps) {
    const handleDownload = (e: MouseEvent<HTMLLIElement>) => {
        e.stopPropagation();
        onDownload();
    };

    const handleDelete = (e: MouseEvent<HTMLLIElement>) => {
        e.stopPropagation();
        onDelete(data?.id);
    };

    const handleShare = (e: MouseEvent<HTMLLIElement>) => {
        e.stopPropagation();
        onShare(data?.id);
    };

    const handleCheck = () => {
        onSelect(data?.id);
    };

    return (
        <div
            className="relative min-w-[164px] w-full rounded-lg shadow overflow-hidden bg-white p-3 cursor-pointer select-none"
            onClick={handleCheck}
        >
            <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                    src={data?.url || IMAGES.Placeholder}
                    alt=""
                />
            </div>
            <ul className="flex justify-around mt-2">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <li
                        className="p-2 text-green-500 bg-gray-100 rounded-md hover:bg-white hover:border-green-500 transition-colors cursor-pointer border border-gray-100"
                        onClick={handleDownload}
                    >
                        <BiDownload />
                    </li>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <li
                        className="p-2 text-blue-500 bg-gray-100 rounded-md hover:bg-white hover:border-blue-500 transition-colors cursor-pointer border border-gray-100"
                        onClick={handleShare}
                    >
                        <BiShare />
                    </li>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <li
                        className="p-2 text-red-500 bg-gray-100 rounded-md hover:bg-white hover:border-red-500 transition-colors cursor-pointer border border-gray-100"
                        onClick={handleDelete}
                    >
                        <BiTrashAlt />
                    </li>
                </motion.div>
            </ul>
            <div className="flex flex-wrap mt-5 text-xs text-gray-500">
                <span>Author</span>
                <FlexGrow />
                <span>
                    Upload date:{' '}
                    {dayjs((data.createdAt as number) * 1000).format(
                        'MMM DD, YYYY',
                    )}
                </span>
            </div>
            <AnimatePresence initial={false}>
                {isSelected && (
                    <motion.div
                        initial={{ scale: 0.2, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            transition: {
                                duration: 0.1,
                                type: 'spring',
                                stiffness: 400,
                                damping: 10,
                            },
                        }}
                        exit={{ scale: 0.2, opacity: 0 }}
                        className="absolute flex items-center top-2 right-2 rounded-full z-10 bg-green-500 text-white text-lg shadow font-bold"
                    >
                        <BiCheck />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});
