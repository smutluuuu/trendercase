"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();

    const [error, setError] = useState("");
    const isValidEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };
    const handleRegister = async (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setError("Email is invalid");
            return;
        }

        if (!password || password.length < 6) {
            setError("Password is invalid");
            return;
        }

        try {
            const response = await axios.post("/api/register", { email, username, password });
            console.log(response);
            if (response.status == '200') {
                toast.success('Register successful!');
            }
            router.push("/login")
        } catch (error) {
            toast.error('Register failed. Please check your credentials and try again.');
        }
    }
    return (
        <div className="justify-center mt-16">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-purple-700">Register</h1>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input type="text" value={username}
                            onChange={(e) => setUsername(e.target.value)} placeholder="Username" required className="w-full input input-bordered input-primary" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input type="text" value={email}
                            onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required className="w-full input input-bordered input-primary" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required className="w-full input input-bordered input-primary" />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        {" "}
                        Register
                    </button>
                    <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
                </form>
                <div className="text-center text-gray-500 mt-4">- OR -</div>
                <Link
                    className="block text-center text-blue-500 hover:underline mt-2"
                    href="/login"
                >
                    Login with an existing account
                </Link>
            </div>
        </div>
    );
};

export default Register