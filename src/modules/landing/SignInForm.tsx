import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import { Button, Input } from 'components';
import { IMAGES } from 'assets';

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
            className="relative bg-white w-96 px-12 py-8 shadow-xl rounded-3xl overflow-hidden"
        >
            <div>
                <img className="w-[8rem]" src={IMAGES.Logo2} alt="logo" />
            </div>

            <div className="text-2xl font-bold my-4 text-center">Sign in</div>
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
            <p className="mt-2 text-sm text-left">
                Don't have an account yet?{' '}
                <Link to="/register">
                    <span className="text-indigo-600 hover:underline">
                        Sign up!
                    </span>
                </Link>
            </p>
            <div className="flex justify-center mt-5 text-center">
                <Button type="primary" htmlType="submit">
                    Sign in
                </Button>
            </div>
        </form>
    );
}
