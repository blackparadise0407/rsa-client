import { Route, Routes } from 'react-router-dom';

import { NotFound } from 'components';
import { Register } from 'modules/auth';
import { Dashboard } from 'modules/dashboard';
import { Landing } from 'modules/landing';
import { MainLayout } from 'layouts';

export default function App() {
    return (
        <div className="scroll-smooth">
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                </Route>
                <Route path="/welcome" element={<Landing />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}
