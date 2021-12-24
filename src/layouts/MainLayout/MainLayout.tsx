import { Header, Sider } from 'components';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <div>
            <Header />
            <div className="flex">
                <Sider />
                <main className="h-[calc(100vh-64px)] flex-auto bg-gray-100 p-5 overflow-y-scroll">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
