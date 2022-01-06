import { IMAGES } from 'assets';

type EmptyProps = {
    title?: string;
};
export default function Empty({
    title = 'No images found. Try uploading one',
}: EmptyProps) {
    return (
        <div className="p-4 flex-grow flex flex-col items-center justify-center rounded">
            <img className="w-64" src={IMAGES.Empty} alt="empty" />
            <span className="font-bold text-sm text-blue-500 mt-2">
                {title}
            </span>
        </div>
    );
}
