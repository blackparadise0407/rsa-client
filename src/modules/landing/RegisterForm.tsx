import { useFormik } from 'formik';

import { Button, Input } from 'components';
import { SVGS } from 'assets';
import { useAuthContext } from 'contexts/AuthContext';

export default function RegisterForm() {
    const { loading, onRegister } = useAuthContext();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            await onRegister(values);
        },
    });
    return (
        <form
            onSubmit={formik.handleSubmit}
            className="relative bg-white w-96 sm:w-[28rem] px-8 py-8 sm:px-12 shadow-3xl shadow-indigo-400 rounded-3xl"
        >
            <div className="flex flex-col items-center mb-8 space-y-1">
                <img
                    className="w-[3rem] sm:w-[4rem]"
                    src={SVGS.LogoSvg}
                    alt="logo"
                />
                <div className="text-xl sm:text-2xl font-bold text-center">
                    Create your account
                </div>
            </div>

            <div className="space-y-5">
                <Input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="Username"
                />
                <Input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Password"
                />
            </div>

            <div className="flex justify-center mt-5 text-center">
                <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    block
                >
                    Register
                </Button>
            </div>
        </form>
    );
}
