import { BiDownload, BiShare, BiTrashAlt } from 'react-icons/bi';

import { IMAGES } from 'assets';
import { motion } from 'framer-motion';

type ImageCardProps = {
    data?: IImage;
    isSelected?: boolean;
    onDownload?: () => void;
    onShare?: (id: string) => void;
    onDelete?: (id: any) => void;
    onSelect?: (id: string) => void;
};

export default function ImageCard({
    data = null,
    isSelected = false,
    onDelete = () => {},
    onDownload = () => {},
    onShare = () => {},
    onSelect = () => {},
}: ImageCardProps) {
    const handleDelete = () => {
        onDelete(data?.id);
    };

    const handleShare = () => {
        onShare(data?.id);
    };

    const handleCheck = () => {
        onSelect(data?.id);
    };

    return (
        <div
            className="w-[200px] rounded shadow-lg overflow-hidden bg-white p-3"
            onClick={handleCheck}
        >
            <div className="relative aspect-video rounded overflow-hidden">
                <img
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    src={data?.url || IMAGES.Placeholder}
                    alt=""
                />
            </div>
            <ul className="flex justify-evenly mt-2">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <li
                        className="p-2 text-black bg-gray-100 rounded-md hover:bg-white transition-colors cursor-pointer border border-gray-100"
                        onClick={onDownload}
                    >
                        <BiDownload />
                    </li>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <li
                        className="p-2 text-black bg-gray-100 rounded-md hover:bg-white transition-colors cursor-pointer border border-gray-100"
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
                        className="p-2 text-black bg-gray-100 rounded-md hover:bg-white transition-colors cursor-pointer border border-gray-100"
                        onClick={handleDelete}
                    >
                        <BiTrashAlt />
                    </li>
                </motion.div>
            </ul>
        </div>
    );
}
