import { Header, Sider } from 'components';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <div>
            <Header />
            <div className="flex">
                <Sider />
                <main className="flex-grow bg-gray-100 p-5 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
