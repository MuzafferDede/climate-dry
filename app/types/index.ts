export type Customer = {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	token: string;
};

export type NavigationItem = {
	name: string;
	slug: string;
	banner_link?: string;
	banner_url?: string;
	thumbnail_url?: string;
	children?: NavigationItem[];
};

export type HeroCategoryItem = {
	name: "string";
	slug: "string";
};

export type HeroBannerItem = {
	title: "string";
	description: "string";
	url: string;
	button_text: string;
	banner_url: string;
};

export type FooterLink = { label: string; path: string };
