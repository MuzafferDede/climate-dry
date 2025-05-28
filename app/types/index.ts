export type Customer = {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	token: string;
};

export type Navigation = {
	name: string;
	slug: string;
	banner_link?: string;
	banner_url?: string;
	thumbnail_url?: string;
	children?: Navigation[];
};

export type FeaturedCategory = {
	name: string;
	slug: string;
};

export type HeroBanner = {
	title: string;
	description: string;
	url: string;
	button_text: string;
	banner_url: string;
};

export type Brand = {
	name: string;
	slug: string;
	logo_url: string;
};

export type FooterLink = { label: string; path: string };

export enum ToastType {
	Success = "success",
	Info = "info",
	Error = "error",
}

export type Toast = {
	message?: string;
	type: ToastType;
};
