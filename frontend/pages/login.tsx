'use client'
import { useEffect, useState } from "react";
import React from "react";
import { Lock, Mail, Mobile } from '@/components/icons';
import axios from "axios";
import { useRouter } from "next/navigation";
import "@/styles/globals.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        const storedUserDetails = localStorage.getItem('userDetails');
        if (storedUserDetails) {
            router.push('/logout');
        }
    }, [router]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/login/", {
            username: email,
            password: password,
        })
        .then((loginResponse) => {
            const token = loginResponse.data.key;
            localStorage.setItem("token", token);

            // Fetch user details
            return axios.get(`http://localhost:8000/api/user/${token}`);
        })
        .then((userDetailsResponse) => {
            const userDetails = userDetailsResponse.data;
            // Save user details in localStorage
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            router.push("/");
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
    };

    return (
        <div className="p-20  w-full mt-[50vh] ml-[50vw] -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-sm border-solid border-4 border-blue-500/75 bg-slate-400/20 dark:bg-slate-800/20 shadow-default dark:bg-boxdark">
            <div className="flex flex-wrap items-center">
                <div className="hidden w-full md:block md:w-1/2">
                    <div className="px-2 text-center inline-block">
                        <p className="px-16">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                            suspendisse.
                        </p>
                        <span className="mt-16 inline-block">
                            <Mobile />
                        </span>
                    </div>
                </div>
                {/* <Separator orientation="vertical"/> */}
                <div className="w-full border-blue-500/75 border-l-2  md:w-1/2 md:border-l-4">
                    <div className="w-full p-4 sm:p-12 md:p-16">
                        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                            Sign In to Issue Management System
                        </h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="mb-2 block font-medium text-black dark:text-white">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full rounded-lg border-2 border-solid border-blue-500/35 bg-transparent py-4 pl-6 pr-10 text-black outline-2 focus:border-primary focus-visible:shadow-none dark:border-solid dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <span className="absolute right-4 top-4">
                                        <Mail />
                                    </span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="mb-2 block font-medium text-black dark:text-white">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        placeholder="6+ Characters, 1 Capital letter"
                                        className="w-full rounded-lg border-2 border-solid border-blue-500/35 bg-transparent py-4 pl-6 pr-10 text-black outline-2 focus:border-primary focus-visible:shadow-none dark:border-blue-500/35 dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <span className="absolute right-4 top-4">
                                        <Lock />
                                    </span>
                                </div>
                            </div>

                            <div className="mb-5">
                                {/* <input
                                    type="submit"
                                    value="Sign In"
                                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                /> */}
                                <button
                                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                    type="submit"
                                >
                                    Sign In
                                </button>
                            </div>
                            <div className="mt-6 text-center">
                                <p>
                                    Don’t have any account?{" "}
                                </p>
                                <p className="text-blue-500">Contact Admin</p>
                                {/* <Link href="/auth/signup" className="text-primary">
                                        Sign Up
                                    </Link> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Login;
