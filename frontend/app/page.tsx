"use client"
import { subtitle, title } from "@/components/primitives"
import dynamic from "next/dynamic";
import { Issue } from "@/data/data"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
const DynamicMailList = dynamic(() => import("@/components/home/issue").then(mod => mod.default), { ssr: false });
const DynamicNew = dynamic(() => import("@/components/home/new").then(mod => mod.default), { ssr: false })


export default function Home() {
  const router = useRouter();
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (!storedUserDetails) {
      router.push('/login');
    }
    else {
      // Fetch issues here
      const fetchIssues = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/issue/");
          setIssues(response.data);
        } catch (error) {
          console.error("Failed to fetch data", error);
        }
      };

      fetchIssues();
    }
  }, [router]);

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Make Your&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>Issue&nbsp;</h1>
          <br />
          <h1 className={title()}> Easy to </h1>
          <h1 className={title({ color: "cyan" })}>track down </h1>
          <h1 className={title()}> and Get</h1>
          <h1 className={title({ color: "yellow" })}> Every Data</h1>
          <h1 className={title()}> at </h1>
          <br />
          <h1 className={title()}> your </h1>
          <h1 className={title({ color: "red" })}>Fingertips </h1>
          <br />
          <h2 className={subtitle({ class: "mt-4" })}> Fast, Beautiful and Modern Tech Support</h2>
        </div>
      </section>

      <div className="fixed bottom-4 right-4 bg-slate-400 rounded-full p-1 shadow-lg z-50">
        <div className="m-1">
          <DynamicNew />
        </div>
      </div>

      <div className="w-4/5 sm:w-3/5 md:w-1/2 mx-auto">
        <DynamicMailList issues={issues} />
      </div>


    </>)
}