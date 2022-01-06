import ModalMask from 'components/Modal/ModalMask';
import { BiLoader } from 'react-icons/bi';

export default function MaksedLoader() {
    return (
        <ModalMask>
            <BiLoader className="animate-spin text-white text-6xl" />
        </ModalMask>
    );
}
