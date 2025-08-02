import type { AdviceLink, FooterLink, Navigation } from "~/types";

export const mainNavigation: Navigation[] = [
	{
		slug: "/c/new-arrivals",
		name: "New Arrivals",
	},
	{
		slug: "/info-hub",
		name: "Advice Hub",
	},
	{
		slug: "/c/sale",
		name: "Sale",
	},
];

export const mainExtras = [
	{
		slug: "dehumidifiers",
		name: "Find your solution",
		children: [
			{
				slug: "basement-dehumidifiers",
				name: "Basement",
			},
			{
				slug: "boat-dehumidifiers",
				name: "Boat",
			},
			{
				slug: "cellar-dehumidifiers",
				name: "Cellar",
			},
			{
				slug: "classic-car-dehumidifiers",
				name: "Classic Car",
			},
			{
				slug: "construction-dehumidifiers",
				name: "Construction",
			},
			{
				slug: "drying-room-dehumidifiers",
				name: "Drying Room",
			},
			{
				slug: "factory-dehumidifiers",
				name: "Factory",
			},
			{
				slug: "small-dehumidifiers",
				name: "Small Spaces",
			},
			{
				slug: "garage-dehumidifiers",
				name: "Garage",
			},
			{
				slug: "laundry-dehumidifiers",
				name: "Laundry",
			},
			{
				slug: "loft-dehumidifiers",
				name: "Loft",
			},
			{
				slug: "storage-dehumidifiers",
				name: "Storage",
			},
			{
				slug: "warehouse-dehumidifiers",
				name: "Warehouse",
			},
			{
				slug: "water-damage-dehumidifiers",
				name: "Water Damage",
			},
			{
				slug: "workshop-dehumidifiers",
				name: "Workshop",
			},
		],
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
	{ label: "Help & Info", path: "/pages/price-match" },
	{ label: "Solutions Centre", path: "/solution/agriculture" },
];

export const footerProductLinks: FooterLink[] = [
	{ label: "Dehumidifiers", path: "/c/dehumidifiers" },
	{ label: "Domestic Dehumidifiers", path: "/c/home-dehumidifiers" },
	{ label: "Commercial Dehumidifiers", path: "/c/commercial-dehumidifiers" },
	{ label: "Industrial Dehumidifiers", path: "/c/industrial-dehumidifiers" },
	{ label: "Desiccant Dehumidifiers", path: "/c/desiccant-dehumidifiers" },
	{ label: "Refrigerant Dehumidifiers", path: "/c/refrigerant-dehumidifiers" },
	{ label: "Ventilation Fans", path: "/c/ventilation" },
	{ label: "Space Heaters", path: "/c/heaters" },
	{ label: "Water Pumps", path: "/c/water-pumps" },
	{ label: "Bundle Deals", path: "/c/bundles" },
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
		{
			label: "LMP",
			path: "https://www.linemarkerpaint.co.uk",
			logo: "/images/logos/LMP.webp",
		},
		{
			label: "NHS",
			path: "https://www.nationalheatershops.co.uk",
			logo: "/images/logos/NHS.webp",
		},
		{
			label: "CD",
			path: "https://www.climatedry.co.uk",
			logo: "/images/logos/CD.webp",
		},
		{
			label: "zebra",
			path: "https://www.zebralinemarking.co.uk",
			logo: "/images/logos/zebra.webp",
		},
		{
			label: "OL",
			path: "https://www.outdoor-lighting.co.uk",
			logo: "/images/logos/OL.webp",
		},
		{
			label: "LS",
			path: "https://liteshop.co.uk",
			logo: "/images/logos/LS.webp",
		},
		{
			label: "OS",
			path: "https://outdoor-style.co.uk",
			logo: "/images/logos/OS.webp",
		},
		{
			label: "PPS",
			path: "https://www.professionalpaintsupplies.co.uk",
			logo: "/images/logos/PPS.webp",
		},
		{
			label: "NSS",
			path: "https://www.nationalsitesupplies.co.uk",
			logo: "/images/logos/NSS.webp",
		},
	];

export const sisterLogos: (FooterLink & { logo: string; sister?: boolean })[] =
	[
		{
			label: "NTH",
			path: "https://www.nationaltoolhireshops.co.uk",
			logo: "/images/logos/NTH.webp",
		},
	];

export const headerTools = [
	{
		label: "Drying Calculator",
		description: "Work out the correct product for what you need",
		icon: "/images/icons/calculator.webp",
		path: "/drying-calculator",
	},
	{
		label: "Water Damage Restoration",
		description: "Restore your property to its pre-damage condition",
		icon: "/images/icons/water-damage.webp",
		path: "/water-damage-restoration",
	},
	{
		label: "Solutions Centre",
		description: "Restore your property to its pre-damage condition",
		icon: "/images/icons/solutions-centre.webp",
		path: "/solution/agriculture",
	},
];

export const sitemapLinks = [{}];
