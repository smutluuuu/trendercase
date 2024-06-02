"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, userRouter } from "next/navigation";
import toast from 'react-hot-toast';

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { data: session, status  } = useSession();
   
    
    const handleLogin = async (e) => {
        
        e.preventDefault();
       
        if (!password || password.length < 6) {
            setError('Password must be greater than 5 characters')
            return;
        }
        const res = await signIn('credentials', {
            redirect: false,
            username,
            password
        });


        if (res.status =='200' && res.ok == true) {
            toast.success('Login successful!');
                router.push('/');
        }else {
            toast.error('Login failed. Please check your credentials and try again.');
        }
    };
    return (

        <div className="justify-center mt-16">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-purple-700">Login</h1>
                <form id="loginForm" onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input type="text" placeholder="Username" value={username}
                            onChange={(e) => setUsername(e.target.value)} required className="w-full input input-bordered input-primary" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Password" value={password}
                            onChange={(e) => setPassword(e.target.value)} required className="w-full input input-bordered input-primary" />
                    </div>
                    <div>
                        <button
                            form="loginForm"
                            type="submit"
                            className="btn btn-primary"
                        >

                            Sign In
                        </button>
                        <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
                    </div>
                </form>
                <Link
                    className="block text-center text-blue-500 hover:underline mt-2"
                    href="/register"
                >
                    Register Here
                </Link>
            </div>
        </div>

    );
};

export default Login;