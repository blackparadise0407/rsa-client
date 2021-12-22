import { IMAGES } from 'assets';

export default function NotFound() {
    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <img className="w-[520px]" src={IMAGES.NotFound} alt="notfound" />
            <p className="font-bold text-3xl">There's nothing here</p>
            <a
                className="text-indigo-500 text-base underline font-medium mt-1"
                href="/"
            >
                Return home
            </a>
        </div>
    );
}
