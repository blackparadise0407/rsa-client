import { useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import {
    BiDownload,
    BiCheckboxMinus,
    BiTrash,
    BiCheckboxChecked,
    BiCloudUpload,
} from 'react-icons/bi';

import { Empty, FlexGrow, ImageCard, MaskedLoader, Modal } from 'components';
import { useImageContext } from 'contexts/ImageContext';
import ImageUploadForm from './ImageUploadForm';
import { getFileNameFromPath, getImageSrcFromBase64 } from 'utils';

export default function Dashboard() {
    const {
        loading,
        data,
        onAdd,
        onSelectSingle,
        onSelectOrDeselectAll,
        onDeleteSingle,
        onDeleteMultiple,
    } = useImageContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isSelectAll = useMemo(() => data.every((x) => x.isSelected), [data]);

    const selectedData = useMemo(
        () => data.filter((x) => x.isSelected),
        [data],
    );

    const hasSelectedData = useMemo(
        () => data.some((x) => x.isSelected),
        [data],
    );

    const handleUploadImage = (files: CustomFile[]) => {
        onAdd(files, (err) => {
            if (err) return;
            setIsModalOpen(false);
        });
    };

    const handleSelectAll = () => {
        onSelectOrDeselectAll();
    };

    const handleDeselectAll = () => {
        onSelectOrDeselectAll(true);
    };

    const handleToggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const handleRemoveMultipleImages = () => {
        if (!selectedData.length) return;
        onDeleteMultiple(selectedData.map((x) => x.id));
    };

    const handleDownloadSingleImage = useCallback((data: IImage) => {
        const link = document.createElement('a');
        link.href = getImageSrcFromBase64(data.blob, data.url);
        link.setAttribute(
            'download',
            `download-${getFileNameFromPath(data.url)}`,
        );
        document.body.appendChild(link);
        link.click();
    }, []);

    const handleDownloadMultipleImages = useCallback(() => {
        selectedData.forEach(handleDownloadSingleImage);
    }, [selectedData]);

    return (
        <>
            {loading && <MaskedLoader />}
            <div className="space-y-4">
                <div className="sticky z-10 top-0 right-8 bg-white p-3 rounded-lg shadow transition-all">
                    <ul className="flex flex-wrap space-x-5 font-semibold select-none">
                        <li
                            className="flex items-center p-2 space-x-2 cursor-pointer bg-blue-500 text-white hover:bg-blue-400 rounded transition-colors"
                            onClick={handleToggleModal}
                        >
                            <BiCloudUpload />
                            <span className="text-sm">Upload</span>
                        </li>
                        <FlexGrow />
                        <li
                            className={clsx(
                                'flex flex-grow sm:flex-grow-0 p-2 items-center space-x-2 cursor-pointer text-green-500 hover:bg-green-500 hover:text-white hover:shadow-lg rounded transition-all',
                                isSelectAll &&
                                    'text-gray-400 pointer-events-none',
                            )}
                            onClick={handleSelectAll}
                        >
                            <BiCheckboxChecked />
                            <span className="text-sm">Select all</span>
                        </li>
                        <li
                            className={clsx(
                                'flex flex-grow sm:flex-grow-0 p-2 items-center space-x-2 cursor-pointer text-green-500 hover:bg-green-500 hover:text-white hover:shadow-lg rounded transition-all',
                                !hasSelectedData &&
                                    'text-gray-400 pointer-events-none',
                            )}
                            onClick={handleDeselectAll}
                        >
                            <BiCheckboxMinus />
                            <span className="text-sm">Deselect all</span>
                        </li>
                        <li
                            className={clsx(
                                'flex items-center p-2 space-x-2 cursor-pointer hover:bg-blue-500 hover:shadow-lg rounded transition-all',
                                hasSelectedData
                                    ? 'text-blue-500 hover:text-white'
                                    : 'text-gray-400 pointer-events-none',
                            )}
                            onClick={handleDownloadMultipleImages}
                        >
                            <BiDownload />
                            <span className="text-sm">Download</span>
                        </li>
                        <li
                            className={clsx(
                                'flex items-center p-2 space-x-2 cursor-pointer hover:bg-red-500 hover:shadow-lg rounded transition-all',
                                hasSelectedData
                                    ? 'text-red-500 hover:text-white'
                                    : 'text-gray-400 pointer-events-none',
                            )}
                            onClick={handleRemoveMultipleImages}
                        >
                            <BiTrash />
                            <span className="text-sm">Delete</span>
                        </li>
                    </ul>
                </div>
                {!data.length && !loading ? (
                    <Empty />
                ) : (
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
                                        onDownload={handleDownloadSingleImage}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
            <Modal open={isModalOpen} onClose={handleToggleModal}>
                <ImageUploadForm onSubmit={handleUploadImage} />
            </Modal>
        </>
    );
}
