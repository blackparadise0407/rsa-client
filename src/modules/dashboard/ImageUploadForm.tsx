import {
    ChangeEvent,
    memo,
    useRef,
    useState,
    useEffect,
    useCallback,
} from 'react';
import dayjs from 'dayjs';
import { AiOutlineFileImage } from 'react-icons/ai';
import { BiCloudUpload, BiXCircle } from 'react-icons/bi';

import { Button, FlexGrow } from 'components';
import { useToast } from 'contexts/ToastContext';
import { validateImageMimeType } from 'utils';
import { v4 } from 'uuid';

type ImageUploadFormProps = {
    onSubmit?: (files: CustomFile[]) => void;
};

export default memo(function ImageUploadForm({
    onSubmit,
}: ImageUploadFormProps) {
    const { enqueue } = useToast();
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<Array<CustomFile>>([]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const fileList: FileList = e.target.files;

        if (!!fileList.length) {
            const validFiles: CustomFile[] = [];
            Array.prototype.forEach.call(fileList, (file: CustomFile) => {
                if (!validateImageMimeType(file.type)) {
                    enqueue(`${file.name}: Unsupported mime type`, {
                        variant: 'error',
                    });
                    return;
                }
                file.id = v4();
                validFiles.push(file);
            });
            setFile((prev) => prev.concat(validFiles));
        }
    }, []);

    const openFileDialog = () => {
        inputRef.current?.click();
    };

    const handleSubmit = () => {
        if (!file.length) {
            enqueue('No file selected!', { variant: 'error' });
            return;
        }
        onSubmit?.(file);
    };

    const handleRemoveSelectedImageById = useCallback((id: string) => {
        setFile((prev) => {
            const foundIdx = prev.findIndex((x) => x.id === id);
            if (foundIdx > -1) {
                const clone = prev.slice();
                clone.splice(foundIdx, 1);
                return clone;
            }
            return prev;
        });
    }, []);

    useEffect(() => {
        return () => {
            setFile(null);
        };
    }, []);

    return (
        <div className="bg-white shadow rounded-md p-5 w-[400px] max-w-[400px] space-y-5">
            <span className="font-bold">Upload your images</span>
            <div
                className="flex justify-center items-center p-2 cursor-pointer hover:shadow bg-blue-500 rounded text-white text-center"
                onClick={openFileDialog}
            >
                <BiCloudUpload className="text-2xl mr-2" />
                <span>Press here to upload</span>
            </div>
            <div className="space-y-3">
                {file.map((file, idx) => (
                    <div
                        key={idx}
                        className="relative flex justify-between items-center p-2 bg-white shadow shadow-gray-300 rounded"
                    >
                        <div className="flex items-center">
                            <AiOutlineFileImage className="text-lg mr-2" />
                            <span className="max-w-[200px] overflow-hidden text-ellipsis">
                                {file.name}
                            </span>
                        </div>
                        <FlexGrow />
                        <span className="text-sm text-gray-500">
                            {dayjs(file.lastModified).format('MMM DD, YYYY')}
                        </span>
                        <BiXCircle
                            onClick={() =>
                                handleRemoveSelectedImageById(file.id)
                            }
                            className="text-red-500 ml-2 hover:text-red-400 transition-colors text-xl cursor-pointer"
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-end mt-2">
                <Button onClick={handleSubmit} type="primary">
                    Submit
                </Button>
            </div>
            <input
                className="hidden"
                type="file"
                multiple
                ref={inputRef}
                onChange={handleChange}
            />
        </div>
    );
});
