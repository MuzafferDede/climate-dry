import type { AdviceLink, FooterLink, Navigation } from "~/types";

export const mainNavigation: Navigation[] = [
	{
		slug: "/new-arrivals",
		name: "New Arrivals",
	},
	{
		slug: "/info-hub",
		name: "Advice Hub",
	},
	{
		slug: "/sale",
		name: "Sale",
	},
];

export const adviceHubNav: AdviceLink[] = [
	{ label: "Advice & Articles", path: "/info-hub" },
	{ label: "Case Studies", path: "/info-hub/case-studies" },
	{ label: "Drying Calculator", path: "/drying-calculator" },
	{
		label: "Evaporative Cooling Calculator",
		path: "/evaporative-cooling-calculator",
	},
	{ label: "Help & Info", path: "/pages/all" },
	{ label: "Solutions Centre", path: "/solution/agriculture" },
];

export const footerProductLinks: FooterLink[] = [
	{ label: "Dehumidifiers", path: "/" },
	{ label: "Domestic Dehumidifiers", path: "/" },
	{ label: "Commercial Dehumidifiers", path: "/" },
	{ label: "Industrial Dehumidifiers", path: "/" },
	{ label: "Desiccant Dehumidifiers", path: "/" },
	{ label: "Refrigerant Dehumidifiers", path: "/" },
	{ label: "Ventilation Fans", path: "/" },
	{ label: "Space Heaters", path: "/" },
	{ label: "Water Pumps", path: "/" },
	{ label: "Bundle Deals", path: "/" },
];

/*
dmclean 7th July 2025
temp removed so we can have dynamic page links, I think after testic static links will be best though 
export const footerHelperLinks: FooterLink[] = [
	{ label: "Bestsellers", path: "/" },
	{ label: "Advice Hub", path: "/" },
	{ label: "Price Match", path: "/" },
	{ label: "Warranty & Servicing", path: "/" },
	{ label: "Accessories & Parts", path: "/" },
	{ label: "Payment & Rapid Delivery", path: "/" },
	{ label: "Terms & Conditions", path: "/" },
	{ label: "Privacy Policy", path: "/" },
	{ label: "Contact Us", path: "/" },
	{ label: "About Us", path: "/" },
];
*/

export const footerLogos: (FooterLink & { logo: string; sister?: boolean })[] =
	[
		{ label: "LMP", path: "/", logo: "/images/logos/LMP.webp" },
		{ label: "NHS", path: "/", logo: "/images/logos/NHS.webp" },
		{ label: "CD", path: "/", logo: "/images/logos/CD.webp" },
		{ label: "zebra", path: "/", logo: "/images/logos/zebra.webp" },
		{ label: "OL", path: "/", logo: "/images/logos/OL.webp" },
		{ label: "LS", path: "/", logo: "/images/logos/LS.webp" },
		{ label: "OS", path: "/", logo: "/images/logos/OS.webp" },
		{ label: "PPS", path: "/", logo: "/images/logos/PPS.webp" },
		{ label: "NSS", path: "/", logo: "/images/logos/NSS.webp" },
	];

export const sisterLogos: (FooterLink & { logo: string; sister?: boolean })[] =
	[{ label: "NTH", path: "/", logo: "/images/logos/NTH.webp" }];

export const headerTools = [
	{
		label: "Drying Calculator",
		description: "Work out the correct product for what you need",
		icon: "/images/icons/calculator.webp",
		path: "/",
	},
	{
		label: "Water Damage Restoration",
		description: "Restore your property to its pre-damage condition",
		icon: "/images/icons/water-damage.webp",
		path: "/",
	},
	{
		label: "Solutions Centre",
		description: "Restore your property to its pre-damage condition",
		icon: "/images/icons/solutions-centre.webp",
		path: "/solution/agriculture/",
	},
];
