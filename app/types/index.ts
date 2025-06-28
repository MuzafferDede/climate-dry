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

export type Variant = {
	id: number;
	sku: string;
	retail_price: number;
	price: number;
	in_stock: boolean;
	attributes: [
		{
			id: number;
			name: string;
			value: string;
		},
	];
} & ShippingMethods;

export type Product = {
	id: number;
	brand: {
		name: string;
		logo_url: string;
	};
	images: [{ url: string }];
	name: string;
	rating: number;
	reviews: number;
	discount?: {
		id: number;
		name: string;
		type: string;
		value: number;
	};
	slug: string;
	default_variant: Variant;
	variants: Variant[];
	introduction: string;
	description: string;
	most_popular: boolean;
};

export type ProductCategory = {
	name: string;
	slug: string;
	description: string;
	introduction: string;
	banner_url: string;
	banner_link: string;
	thumbnail_url: string;
	is_featured: boolean;
	products?: Product[];
	parent?: ProductCategory;
	children?: ProductCategory[];
	meta_keywords: string[];
	meta_description: string;
	meta_title: string;
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
	action?: {
		label: string;
		path: string;
	};
};

export type CartTotals = {
	subtotal: number;
	tax_amount: number;
	discount_amount: number;
	total: number;
};

export type ShippingMethods = {
	free_shipping: boolean;
	standard_shipping_cost: number;
	premium_shipping_cost: number;
};

export type CartItem = {
	id: number;
	quantity: number;
	shipping_methods: ShippingMethods;
	shipping_method: string;
	variant: {
		sku: string;
		product: Product;
		attributes: Array<{
			id: number;
			name: string;
			value: string;
		}>;
	};
	totals: CartTotals;
};

export type Cart = {
	id: number;
	guest_id: string;
	customer: Customer;
	totals: CartTotals;
	discount: null | {
		id: number;
		name: string;
		type: string;
		value: number;
	};
	items: CartItem[];
};

export type ApiMeta = {
	current_page: number;
	from: number;
	last_page: number;
	links: Array<{
		url: string | null;
		label: string;
		active: boolean;
	}>;
	path: string;
	per_page: number;
	to: number;
	total: number;
};

export type ApiLinks = {
	first?: string;
	last?: string;
	prev?: string | null;
	next?: string | null;
};

export type ApiListResponse<T> = {
	data: T[];
	meta?: ApiMeta;
	links?: ApiLinks;
};

export type ApiResponse<T> = {
	data: T;
};
