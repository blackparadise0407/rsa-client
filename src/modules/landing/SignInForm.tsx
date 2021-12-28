import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import { Button, Input } from 'components';
import { SVGS } from 'assets';

export default function SignInForm() {
    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values));
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
                    Sign in with your account
                </div>
                <p className="text-xs sm:text-sm text-left">
                    Don't have an account yet?{' '}
                    <Link to="/register">
                        <span className="text-sm text-indigo-600 underline">
                            Sign up!
                        </span>
                    </Link>
                </p>
            </div>

            <div className="space-y-5">
                <Input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder="Name"
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
                <Button type="primary" htmlType="submit" block>
                    Sign in
                </Button>
            </div>
        </form>
    );
}
