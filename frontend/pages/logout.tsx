"use client"
import { subtitle, title } from "@/components/primitives"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "@/styles/globals.css"

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.post("http://localhost:8000/api/user/logout/"+token)
        localStorage.removeItem("token");
        localStorage.removeItem("userDetails");
        router.push("/login");
    }, [router]);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className={title({size: "lg", color:"red"})}>Logging out...</div>
            <div className={title({size:"md", color: "green"})}>Good Bye</div>
        </div>
    );
};

export default Logout;