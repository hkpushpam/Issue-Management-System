"use client"
import "@/styles/littlechart.css"
import { title, subtitle } from "@/components/primitives";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { CardDataProvider } from "@/data/admin_data"

const DynamicSpaklineChart1 = dynamic(() => import("@/components/littlechartone").then(mod => mod.default), { ssr: false });
const DynamicSpaklineChart2 = dynamic(() => import("@/components/littlecharttwo").then(mod => mod.default), { ssr: false });
const DynamicSpaklineChart3 = dynamic(() => import("@/components/littlechartthree").then(mod => mod.default), { ssr: false });
const DynamicSpilineChart1 = dynamic(() => import("@/components/chartone").then(mod => mod.default), { ssr: false });

function About() {
	const router = useRouter();

    useEffect(() => {
        const storedUserDetails = localStorage.getItem('userDetails');
		const token = localStorage.getItem("token");
		if(!token)
		{router.push('/login');}
        if (!storedUserDetails || !(JSON.parse(storedUserDetails)).is_admin) {
            router.push('/login');
        }
    }, [router]);

	return (
		<>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-lg text-center justify-center">
					<h1 className={title()}>Make Your&nbsp;</h1>
					<h1 className={title({ color: "violet" })}>Issues&nbsp;</h1>
					<br />
					<h1 className={title()}> Easy to </h1>
					<h1 className={title({ color: "cyan" })}>track down </h1>
					<h1 className={title()}> and Get</h1>
					<h1 className={title({ color: "yellow" })}> Every Data</h1>
					<h1 className={title()}> at </h1>
					<br />
					<h1 className={title()}> your </h1>
					<h1 className={title({ color: "pink" })}>Fingertips </h1>
					<br />
					<h2 className={subtitle({ class: "mt-4" })}> Fast, Beautiful and Modern Tech Support</h2>
				</div>
			</section>

			<div className="grid md:grid-cols-3 m-4 ">
				<div className="shadow-xl shadow-slate-600/20 dark:shadow-slate-400/20 scale-95 hover:scale-105 m-2 min-w-fit md:min-w-fit">
					<DynamicSpaklineChart1 />
				</div>
				<div className="shadow-xl shadow-slate-600/20 dark:shadow-slate-400/20 scale-95 hover:scale-105 m-2 min-w-fit md:min-w-fit">
					<DynamicSpaklineChart2 />
				</div>
				<div className="shadow-xl shadow-slate-600/20 dark:shadow-slate-400/20 scale-95 hover:scale-105 m-2 min-w-fit md:min-w-fit">
					<DynamicSpaklineChart3 />
				</div>
			</div>

			<DynamicSpilineChart1 />
		</>
	)
}

export default About