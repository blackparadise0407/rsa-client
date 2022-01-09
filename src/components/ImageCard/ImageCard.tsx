import { MouseEvent, memo, useMemo, useState, useRef } from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { BiCheck, BiDownload, BiShare, BiTrashAlt } from 'react-icons/bi';

import { IMAGES } from 'assets';
import { FlexGrow } from 'components';
import { useToast } from 'contexts/ToastContext';
import { useAuthContext } from 'contexts/AuthContext';
import { useOnClickOutside } from 'hooks';
import { getImageSrcFromBase64 } from 'utils';

type ImageCardProps = {
    data?: IImage;
    isSelected?: boolean;
    onDownload?: (image: IImage) => void;
    onShare?: (imageId: string, sharedToId: string, cb?: ErrorCb) => void;
    onDelete?: (id: any) => void;
    onSelect?: (id: string) => void;
};

export default memo(function ImageCard({
    data = null,
    isSelected = false,
    onDelete = () => {},
    onDownload = () => {},
    onShare = () => {},
    onSelect = () => {},
}: ImageCardProps) {
    const { enqueue } = useToast();
    const { user } = useAuthContext();
    const [isShareOpen, setIsShareOpen] = useState(false);
    const shareDialogRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useOnClickOutside(shareDialogRef, () => setIsShareOpen(false));

    const isSharedImage = useMemo(() => {
        if (!!data && !!user) {
            return data.created_by_id !== user.id;
        }
        return false;
    }, [user, data]);

    const handleDownload = (e: MouseEvent<HTMLLIElement>) => {
        e.stopPropagation();
        if (!data) {
            enqueue('Download is not available. Please try again later!', {
                variant: 'error',
            });
            return;
        }
        onDownload(data);
    };

    const handleDelete = (e: MouseEvent<HTMLLIElement>) => {
        e.stopPropagation();
        if (isSharedImage) {
            enqueue('Cannot delete shared image', { variant: 'error' });
            return;
        }
        onDelete(data?.id);
    };

    const handleOpenShareDialog = (e: MouseEvent<HTMLLIElement>) => {
        e.stopPropagation();
        if (isSharedImage) return;
        setIsShareOpen(true);
    };

    const handleShare = () => {
        const sharedById = inputRef.current.value;
        if (!sharedById) {
            enqueue('Shared to user ID is required', { variant: 'error' });
            return;
        }
        onShare(data?.id, sharedById, (err) => {
            if (err) return;
            setIsShareOpen(false);
        });
    };

    const handleCheck = () => {
        onSelect(data?.id);
    };

    return (
        <div
            className="relative min-w-[164px] w-full rounded-lg shadow bg-white p-3 cursor-pointer select-none"
            onClick={handleCheck}
        >
            <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                    src={
                        data?.blob
                            ? getImageSrcFromBase64(data.blob, data.url)
                            : IMAGES.Placeholder
                    }
                    alt=""
                />
            </div>
            <ul className="flex justify-around mt-2">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <li
                        className="p-2 text-green-500 bg-gray-100 rounded-md hover:text-white hover:bg-green-500 hover:shadow-md transition-colors cursor-pointer"
                        onClick={handleDownload}
                    >
                        <BiDownload />
                    </li>
                </motion.div>
                <div className="relative">
                    <motion.div
                        whileHover={{ scale: isSharedImage ? 1 : 1.1 }}
                        whileTap={{ scale: isSharedImage ? 1 : 0.9 }}
                    >
                        <li
                            className={clsx(
                                'p-2 text-blue-500 bg-gray-100 rounded-md hover:text-white hover:bg-blue-500 hover:shadow-md transition-colors cursor-pointer',
                                isSharedImage &&
                                    'pointer-events-none !text-gray-400',
                            )}
                            onClick={handleOpenShareDialog}
                        >
                            <BiShare />
                        </li>
                    </motion.div>
                    {!isSharedImage && isShareOpen && (
                        <div
                            ref={shareDialogRef}
                            className="absolute w-52 z-[100] -top-32 -left-10 right-0 text-sm bg-white p-2 rounded shadow-md border space-y-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span>Share to user:</span>
                            <input
                                ref={inputRef}
                                className="border w-full text-black rounded px-2 py-1"
                            />
                            <button
                                className="bg-blue-500 px-2 py-1 rounded shadow text-white float-right hover:bg-blue-400 hover:shadow transition-all"
                                onClick={handleShare}
                            >
                                Share!
                            </button>
                        </div>
                    )}
                </div>
                <motion.div
                    whileHover={{ scale: isSharedImage ? 1 : 1.1 }}
                    whileTap={{ scale: isSharedImage ? 1 : 0.9 }}
                >
                    <li
                        className={clsx(
                            'p-2 text-red-500 bg-gray-100 rounded-md hover:text-white hover:bg-red-500 hover:shadow-md transition-colors cursor-pointer',
                            isSharedImage &&
                                'pointer-events-none !text-gray-400',
                        )}
                        onClick={handleDelete}
                    >
                        <BiTrashAlt />
                    </li>
                </motion.div>
            </ul>
            <div className="flex flex-wrap mt-5 text-xs text-gray-500">
                {isSharedImage && (
                    <span>Shared by: {data?.created_by?.username}</span>
                )}
                <FlexGrow />
                <span>
                    Upload date:{' '}
                    {dayjs((data.created_at as number) * 1000).format(
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
