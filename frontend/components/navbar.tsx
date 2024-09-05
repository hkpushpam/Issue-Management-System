"use client"
import { Navbar as NextUINavbar, NavbarContent, NavbarMenu, NavbarMenuToggle, NavbarBrand, NavbarItem, NavbarMenuItem, } from "@nextui-org/navbar";
import { Button } from "@/components/ui/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react"
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon, LogoutIcon } from "@/components/icons";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@radix-ui/react-hover-card";
import { Sheet, SheetTrigger, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { useRouter } from "next/navigation";
import AvatarComponent from "./avatar";

const useWindowWidth = () => {
	const [windowWidth, setWindowWidth] = useState(0);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setWindowWidth(window.innerWidth);
			const handleResize = () => setWindowWidth(window.innerWidth);
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}

	}, []);

	return windowWidth;
};


//   Navbar
export const Navbar = () => {
	const windowWidth = useWindowWidth();
	const isMdOrLarger = windowWidth >= 768;
	const [navigation, setNavigation] = useState(siteConfig.navItems);
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userDegisnation, setUserDesignation] = useState("");

	useEffect(() => {
		const storedUserDetails = localStorage.getItem('userDetails');
		if (storedUserDetails) {
			const parsedUserDeatils = JSON.parse(storedUserDetails)
			setUserName(parsedUserDeatils.name);
			setUserEmail(parsedUserDeatils.email);
			setUserDesignation(parsedUserDeatils.Degisnation);
			if(parsedUserDeatils.is_admin) {
				setNavigation(siteConfig.adminNavItems);
			}
			else {
				setNavigation(siteConfig.navItems);
			}
		}
	},[userName]);

	// TODO: IMPLEMENT THIS SEARCH BAR LATER
	// const searchInput = (
	// 	<Input
	// 		aria-label="Search"
	// 		classNames={{
	// 			inputWrapper: "bg-default-100",
	// 			input: "text-sm",
	// 		}}
	// 		labelPlacement="outside"
	// 		placeholder="Search..."
	// 		endContent={
	// 			<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-2" />
	// 		}
	// 		type="search"
	// 	/>
	// );

	return (
		<NextUINavbar maxWidth="xl" position="sticky" className="bg-slate-400 dark:bg-slate-600">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<p className="font-bold text-inherit">{siteConfig.name}</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="center"
			>
				{/* // TODO: SEARCH BAR TO BE IMPLEMENTED */}
				{/* <NavbarItem className="hidden md:flex">{searchInput}</NavbarItem> */}
			</NavbarContent>
			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{navigation.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
				<NavbarItem className="hidden lg:flex gap-2">
					{" "}
					<ThemeSwitch />{" "}
				</NavbarItem>
				<NavbarItem className="hidden lg:flex">
					<HoverCard>
						<HoverCardTrigger asChild>
							<Button>
								<AvatarComponent name={userName}/>
							</Button>
						</HoverCardTrigger>
						<HoverCardContent className="w-80">
							<div className="flex flex-col bg-gray-400 dark:bg-gray-600 rounded-xl p-2">
								<Sheet>
									<SheetTrigger asChild>
										<Button className="text-sm font-normal text-default-600 m-2 dark:bg-zinc-700 bg-zinc-200 gap-1">
											<div className="rounded-2xl flex flex-row font-semibold items-center">
												<AvatarComponent name={userName}/>
												Profile
											</div>
										</Button>
									</SheetTrigger>
									<SheetContent side={isMdOrLarger ? 'right' : 'bottom'} className="bg-slate-400 dark:bg-slate-600">
										<SheetHeader>
											<SheetTitle className="flex flex-row items-center">
												<div className="rounded-full bg-slate-300 dark:bg-slate-700 mx-4">
												<AvatarComponent name={userName}/>
												</div>
												{userName}
											</SheetTitle>
											<SheetDescription>
												This is your profile
											</SheetDescription>
										</SheetHeader>
										<div className="grid gap-4 py-4">
											<table className="table-auto w-full">
												<tbody>
													<tr>
														<td className="">Name:</td>
														<td className=" ">{userName}</td>
														<td></td>
													</tr>
													<tr>
														<td className="">Email:</td>
														<td className="">{userEmail}</td>
														<td></td>
													</tr>
													<tr>
														<td className="">Designation:</td>
														<td className="">{userDegisnation}</td>
														<td></td>
													</tr>
												</tbody>
											</table>
										</div>
									</SheetContent>
								</Sheet>
								<Button className="text-sm font-normal text-default-600 m-2 dark:bg-zinc-700 bg-zinc-200 gap-1">
									<LogoutIcon />
									<Link href="/logout">Sign Out</Link>
								</Button>
							</div>
						</HoverCardContent>
					</HoverCard>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				{/* // TODO: SEARCH BAR TO BE IMPLEMENTED*/}
				{/* {searchInput} */}
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{navigation.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={"foreground"}
								href={item.href}
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
					<NavbarMenuItem>
						<Sheet>
							<SheetTrigger asChild>
								<Button className="hover:opacity-80 hover:bg-inherit font-normal p-0 text-lg text-default-700 bg-inherit h-fit">
									Profile
								</Button>
							</SheetTrigger>
							<SheetContent side={isMdOrLarger ? 'right' : 'bottom'} className="bg-slate-400 dark:bg-slate-600">
								<SheetHeader>
									<SheetTitle className="flex flex-row items-center">
										<div className="rounded-full bg-slate-300 dark:bg-slate-700 mx-4">
										<AvatarComponent name={userName}/>
										</div>
										{userName}
									</SheetTitle>
									<SheetDescription>
										This is your profile
									</SheetDescription>
								</SheetHeader>
								<div className="grid gap-4 py-4">
									<table className="table-auto w-full">
										<tbody>
											<tr>
												<td className="">Name:</td>
												<td className=" ">{userName}</td>
												<td></td>
											</tr>
											<tr>
												<td className="">Email:</td>
												<td className="">{userEmail}</td>
												<td></td>
											</tr>
											<tr>
												<td className=" ">Degisnation:</td>
												<td className=" ">{userDegisnation}</td>
												<td></td>
											</tr>
										</tbody>
									</table>
								</div>
							</SheetContent>
						</Sheet>
					</NavbarMenuItem>
					<NavbarMenuItem>
						<Button className="hover:opacity-80 hover:bg-inherit font-normal p-0 text-lg text-default-700 bg-inherit h-fit">
							<Link href="logout/">Sign Out</Link>
						</Button>
					</NavbarMenuItem>
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
