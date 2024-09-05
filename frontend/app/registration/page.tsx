/* eslint-disable react/no-unescaped-entities */
"use client"
import { subtitle, title } from "@/components/primitives"
import { Mobile, Mail, Lock } from '@/components/icons';
import { Checkbox } from '@/components/ui/checkbox';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [designation, setDesignation] = useState("");
    const [is_admin, setIs_Admin] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const storedUserDetails = localStorage.getItem('userDetails');
        if (!storedUserDetails || !(JSON.parse(storedUserDetails)).is_admin) {
            router.push('/login');
        }
    }, [router]);

    const handleRegistration = (e: React.FormEvent) => {
        e.preventDefault();

        if (password1 !== password2) {
            alert("Passwords do not match");
            return;
        }

        axios
            .post("http://localhost:8000/api/registration/", {
                email: email,
                username: email,
                password: password1,
                first_name: firstName,
                last_name: lastName,
                employeeId: employeeId,
                Degisnation: designation,
                is_superuser: is_admin
            })
            .then((response) => {
                router.push("/");
            })
            .catch((error) => {
                if (error.response) {
                    alert(JSON.stringify(error.response.data));
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    };

    return (
        <div className="pb-4">
            <div className="rounded-sm border border-stroke bg-slate-400/20 dark:bg-slate-800/20 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap items-center">
                    <div className="hidden w-full md:block md:w-1/2">
                        <div className="px-2 text-center inline-block">
                            <div className="px-12">
                                <div className={title({ size: 'sm', color: 'green' })}>Let's Welcome</div>
                                <div className={title({ size: 'sm' })}>New user to</div>
                                <br />
                                <div className={title({ size: 'md', color: 'red' })}>ISSUE MANAGEMENT SYSTEM</div>
                                <br />
                                <div className={title({ size: 'sm' })}>Get Issues from them</div>
                                <br />
                                <div className={title({ size: 'md' })}>AND</div>
                                <br />
                                <div className={title({ size: 'sm' })}>Solve it to make your system</div>
                                <br />
                                <div className={title({ size: 'md', color: 'violet' })}>BETTER AND BETTER OVERTIME</div>
                            </div>
                            <span className="mt-16 inline-block">
                                <Mobile />
                            </span>
                        </div>
                    </div>

                    <div className="w-full border-stroke dark:border-strokedark md:w-1/2 md:border-l-2">
                        <div className="w-full p-4 sm:p-12 md:p-16">
                            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                Register to Issue Management System
                            </h2>
                            <form onSubmit={handleRegistration}>
                                {/* Email */}
                                <div className="mb-4">
                                    <label className="mb-2 block font-medium text-black dark:text-white">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <span className="absolute right-4 top-4">
                                            <Mail />
                                        </span>
                                    </div>
                                </div>
                                {/* Password */}
                                <div className="mb-4">
                                    <label className="mb-2 block font-medium text-black dark:text-white">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="6+ Characters, 1 Capital letter"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            value={password1}
                                            onChange={(e) => setPassword1(e.target.value)}
                                        />

                                        <span className="absolute right-4 top-4">
                                            <Lock />
                                        </span>
                                    </div>
                                </div>
                                {/* Confirm Password */}
                                <div className="mb-4">
                                    <label className="mb-2 block font-medium text-black dark:text-white">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="6+ Characters, 1 Capital letter"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            value={password2}
                                            onChange={(e) => setPassword2(e.target.value)}
                                        />

                                        <span className="absolute right-4 top-4">
                                            <Lock />
                                        </span>
                                    </div>
                                </div>
                                {/* First Name */}
                                <div className="mb-4">
                                    <label className="mb-2 block font-medium text-black dark:text-white">
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="6+ Characters, 1 Capital letter"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* Last Name */}
                                <div className="mb-4">
                                    <label className="mb-2 block font-medium text-black dark:text-white">
                                        Last Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="6+ Characters, 1 Capital letter"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* Employee Id */}
                                <div className="mb-4">
                                    <label className="mb-2 block font-medium text-black dark:text-white">
                                        Employee Id
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="6+ Characters, 1 Capital letter"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            value={employeeId}
                                            onChange={(e) => setEmployeeId(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Degisnation */}
                                <div className="mb-4">
                                    <label className="mb-2 block font-medium text-black dark:text-white">
                                        Degisnation
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="6+ Characters, 1 Capital letter"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            value={designation}
                                            onChange={(e) => setDesignation(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Is Admin */}
                                <div className="mb-4">
                                    <label className="mb-2 block font-medium text-black dark:text-white">
                                        Is Admin
                                    </label>
                                    <div className="relative">
                                        <div className="items-top flex space-x-2">
                                            <Checkbox
                                                checked={is_admin}
                                                onCheckedChange={(checked) => setIs_Admin(!!checked)}
                                            />
                                            <div className="grid gap-1.5 leading-none">
                                                <label
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Mark this box to give the user admin authority
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-5 mt-8">
                                    <button
                                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                        type="submit"
                                    >
                                        Register
                                    </button>
                                </div>
                                {/* <div className="mt-6 text-center">
                                <p>
                                    Don’t have any account?{" "}
                                </p>
                                <p className="text-blue-500">Contact Admin</p>
                            </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register