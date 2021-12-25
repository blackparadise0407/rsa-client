import { ImageCard } from 'components';
import { AnimatePresence, motion } from 'framer-motion';

const DATA: IImage[] = [
    { id: 1, blob: 'a', user_id: 'bob', createdAt: 1640398365 },
    { id: 2, blob: 'a', user_id: 'bob', createdAt: 1640398365 },
    { id: 3, blob: 'a', user_id: 'bob', createdAt: 1640398365 },
    { id: 4, blob: 'a', user_id: 'bob', createdAt: 1640398365 },
    { id: 5, blob: 'a', user_id: 'bob', createdAt: 1640398365 },
    { id: 6, blob: 'a', user_id: 'bob', createdAt: 1640398365 },
    { id: 7, blob: 'a', user_id: 'bob', createdAt: 1640398365 },
    { id: 8, blob: 'a', user_id: 'bob', createdAt: 1640398365 },
];

export default function Dashboard() {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
                <AnimatePresence initial={false}>
                    {DATA.map((item) => (
                        <motion.div>
                            <ImageCard data={item} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
