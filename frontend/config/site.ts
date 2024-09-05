export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Issue Management System",
	description: "Align engineering software resources with business needs to reduce expenses",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
	],
	adminNavItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Admin",
			href: "/admin",
		},
		{
			label: "Registration",
			href: "/registration"
		}
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
		sponsor: "https://patreon.com/jrgarciadev"
	},
};
