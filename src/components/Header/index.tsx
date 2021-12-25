import { FlexGrow } from 'components';
import { useAuthContext } from 'contexts/AuthContext';

const _renderUser = (user: any) => {
    return <div className="font-medium">Kyle Pham</div>;
};

export default function Header() {
    const { user } = useAuthContext();
    return (
        <nav className="flex bg-primary px-5 h-[64px] items-center text-white">
            <div className="font-bold">Secure storage</div>
            <FlexGrow />
            {!user && _renderUser(user)}
        </nav>
    );
}
