import { ChangeEvent, memo, useRef, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { AiOutlineFileImage } from 'react-icons/ai';

import { Button } from 'components';
import { useToast } from 'contexts/ToastContext';
import { validateImageMimeType } from 'utils';

type ImageUploadFormProps = {
    onSubmit?: (file: File) => void;
};

export default memo(function ImageUploadForm({
    onSubmit,
}: ImageUploadFormProps) {
    const { enqueue } = useToast();
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileList: FileList = e.target.files;
        if (!!fileList.length) {
            const file = fileList[0];
            if (!validateImageMimeType(file.type)) {
                enqueue('Unsupported mime type', { variant: 'error' });
                return;
            }
            setFile(file);
        }
    };

    const openFileDialog = () => {
        inputRef.current?.click();
    };

    const handleSubmit = () => {
        if (!file) {
            enqueue('No file selected!', { variant: 'error' });
            return;
        }
        onSubmit?.(file);
    };

    useEffect(() => {
        return () => {
            setFile(null);
        };
    }, []);

    return (
        <div className="bg-white shadow rounded-md p-5 w-[400px] max-w-[400px] space-y-5">
            <div
                className="inline-block p-2 cursor-pointer hover:shadow bg-blue-500 rounded text-white"
                onClick={openFileDialog}
            >
                Press here to upload
            </div>
            {!!file && (
                <div className="flex justify-between items-center p-2 bg-white shadow rounded">
                    <div className="flex items-center">
                        <AiOutlineFileImage className="text-lg mr-2" />
                        <span className="max-w-[200px] overflow-hidden text-ellipsis">
                            {file.name}
                        </span>
                    </div>
                    <span className="text-sm text-gray-500">
                        {dayjs(file.lastModified).format('MMM DD, YYYY')}
                    </span>
                </div>
            )}
            <div className="flex justify-end mt-2">
                <Button onClick={handleSubmit} type="primary">
                    Submit
                </Button>
            </div>
            <input
                className="hidden"
                type="file"
                ref={inputRef}
                onChange={handleChange}
            />
        </div>
    );
});
