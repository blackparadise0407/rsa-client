import { Outlet } from 'react-router-dom';

import { Sider } from 'components';

export default function MainLayout() {
    return (
        <div>
            <div className="flex">
                <Sider />
                <main className="h-[calc(100vh)] flex-auto bg-gray-100 p-5 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
