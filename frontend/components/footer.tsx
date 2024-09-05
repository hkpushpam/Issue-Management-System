"use client"
import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const FOOTER = () => {
    const [navigation, setNavigation] = useState(siteConfig.navItems);
	const [userDetails, setUserDetails] = useState<any>(null);
	const router = useRouter();
	useEffect(() => {
		const storedUserDetails = localStorage.getItem('userDetails');
		if (storedUserDetails) {
			const parsedUserDeatils = JSON.parse(storedUserDetails)
			setUserDetails(parsedUserDeatils);
			if(parsedUserDeatils.is_admin) {
				setNavigation(siteConfig.adminNavItems);
			}
			else {
				setNavigation(siteConfig.navItems);
			}
		}
	},[]);
    return (
        <footer className="bottom-0 left-0 z-20 w-full p-4 bg-slate-400 dark:bg-slate-600 border-t border-gray-200 shadow  dark:border-gray-800">
            <div className="sm:flex sm:items-center sm:justify-between">
                <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{siteConfig.name}</span>
                </a>
                <span className=" hidden lg:block text-sm text-gray-500 sm:text-center dark:text-gray-200">
                    © 2023{" "}
                    <a href="https://flowbite.com/" className="hover:underline">
                        ONGC™
                    </a>
                    . All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 ">
                    {navigation.map((item) => (
                        <li key={item.href}>
                            <a href={item.href} className="hover:underline me-4 md:me-6">{item.label}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <hr className="block lg:hidden my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block lg:hidden text-sm text-gray-500 sm:text-center dark:text-gray-200">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
        </footer>
    );
};
