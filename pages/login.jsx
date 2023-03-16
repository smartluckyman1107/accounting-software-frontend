import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useCookies } from "react-cookie"
import { useAtom } from 'jotai';
import { idAtom } from '../helpers/authorize';

import { instance } from '../helpers/axios';


const Login = () => {
    const router = useRouter();
    const [cookie, setCookie] = useCookies(["x-access-token"]);
    const [user, setUser] = useAtom(idAtom);

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('emaiil is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {

        instance.post('/users/verify', data)
            .then((res) => {
                setUser(res.data.id);
                setCookie("x-access-token", JSON.stringify(res.data.token), {
                    path: "/",
                    maxAge: 3600, // Expires after 1hr
                    sameSite: true,
                })
                const returnUrl = router.query.returnUrl || '/';
                router.push(returnUrl);
            }).catch(error => {
                setError('apiError', { message: error });
                console.log(errors);
            });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
                <div className="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-600" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-center">Join us</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4">
                        <div className="mt-4">
                            <label className="block" htmlFor="email">Email</label>
                            <input type="text" placeholder="Email" {...register('email')}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        </div>
                        <div className="mt-4">
                            <label className="block">Password</label>
                            <input type="password" placeholder="Password" {...register('password')}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        </div>
                        <div className="flex">
                            <button type='submit' className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Log in</button>
                        </div>
                        <div className="mt-6 text-grey-dark">
                            Don't have an account?
                            <a className="text-blue-600 hover:underline" href="#">
                                Register
                            </a>
                        </div>
                        {/* {errors.apiError &&
                            <div className='font-semibold text-red-600'>{errors.apiError?.message.response.data}</div>
                        } */}
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login;