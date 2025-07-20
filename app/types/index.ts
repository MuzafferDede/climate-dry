// ============================================================================
// Link TYPES
// ============================================================================
export type AdviceLink = {
	path: string;
	label: string;
};

// ============================================================================
// API TYPES
// ============================================================================

export type ApiLinks = {
	first?: string;
	last?: string;
	next?: string | null;
	prev?: string | null;
};

export type ApiMeta = {
	current_page: number;
	from: number;
	last_page: number;
	links: Array<{
		active: boolean;
		label: string;
		url: string | null;
	}>;
	path: string;
	per_page: number;
	to: number;
	total: number;
};

export type ApiResponse<T> = {
	data: T;
};

export type ApiListResponse<T> = {
	data: T[];
	links?: ApiLinks;
	meta?: ApiMeta;
	filters?: Filters;
};

// ============================================================================
// META INFO TYPE
// ============================================================================

export type MetaInfo = {
	meta_title?: string;
	meta_description?: string;
	meta_keywords?: string[];
};

// ============================================================================
// PRODUCT TYPES
// ============================================================================

export type ShippingMethods = {
	free_shipping: boolean;
	premium_shipping_cost: number;
	standard_shipping_cost: number;
};

export type ProductImage = {
	id: number;
	url: string;
	order: number;
};

export type Page = {
	id: number;
	name: string;
	slug: string;
	description: string;
	meta_title?: string;
	meta_description?: string;
	meta_keywords?: string[];
	created_at: string;
};

export type Variant = {
	attributes: Array<{
		id: number;
		name: string;
		value: string;
	}>;
	id: number;
	in_stock: boolean;
	name: string;
	price: number;
	retail_price: number;
	sku: string;
	product: Product;
} & ShippingMethods;

export type ProductCategory = {
	banner_link: string;
	banner_url: string;
	children?: ProductCategory[];
	description: string;
	introduction: string;
	is_featured: boolean;
	name: string;
	parent?: ProductCategory;
	products?: Product[];
	slug: string;
	thumbnail_url: string;
} & MetaInfo;

export type Product = {
	brand: {
		logo_url: string;
		name: string;
	};
	category: ProductCategory;
	default_variant: Variant;
	description: string;
	discount?: {
		id: number;
		name: string;
		type: string;
		value: number;
	};
	extra_products?: Product[];
	features: Array<{ key: string; value: string }>;
	id: number;
	images: ProductImage[];
	included_items: string[];
	introduction: string;
	key_features: string;
	most_popular: boolean;
	name: string;
	rating: number;
	related_products?: Product[];
	reviews: number;
	slug: string;
	specifications: Array<{ key: string; value: string }>;
	tax_amount: number;
	upsell_products?: Product[];
	variants: Variant[];
	videos: Array<{ url: string }>;
	warranty_period: number;
} & MetaInfo;

export type Solution = {
	id: number;
	name: string;
	slug: string;
	banner_url: string;
	introduction: string;
	description: string;
	meta_title?: string;
	meta_description?: string;
	meta_keywords?: string[];
	created_at: string;
};

// ============================================================================
// CART & SHIPPING TYPES
// ============================================================================

export type CartTotals = {
	subtotal?: number;
	pre_tax_subtotal: number;
	shipping_total: number;
	tax_amount: number;
	discount_amount: number;
	total: number;
};

export type CartItem = {
	id: number;
	quantity: number;
	shipping_method: string;
	shipping_methods: ShippingMethods;
	totals: CartTotals;
	variant: Variant;
};

export type Cart = {
	customer: Customer;
	discount: null | {
		id: number;
		name: string;
		type: string;
		value: number;
		code: string;
	};
	guest_id: string;
	id: number;
	items: CartItem[];
	totals: CartTotals;
};

// ============================================================================
// CUSTOMER & USER TYPES
// ============================================================================

export type Customer = {
	email: string;
	first_name: string;
	id: string;
	last_name: string;
	token: string;
};

// ============================================================================
// BLOG TYPES
// ============================================================================

export type BlogPost = {
	created_at: string;
	description: string;
	id: number;
	image_url: string;
	introduction: string;
	slug: string;
	title: string;
} & MetaInfo;

// ============================================================================
// UI & NAVIGATION TYPES
// ============================================================================

export type Brand = {
	logo_url: string;
	name: string;
	slug: string;
};

export type FooterLink = { label: string; path: string };

export type HeroBanner = {
	banner_url: string;
	button_text: string;
	description: string;
	title: string;
	url: string;
};

export type Navigation = {
	banner_link?: string;
	banner_url?: string;
	children?: Navigation[];
	name: string;
	slug: string;
	thumbnail_url?: string;
};

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

export enum ToastType {
	Success = "success",
	Info = "info",
	Error = "error",
}

export type Toast = {
	action?: {
		label: string;
		path: string;
	};
	message?: string;
	type: ToastType;
};

// ============================================================================
// STRIPE PAYMENT INTENT TYPE
// ============================================================================

export type StripePaymentIntent = {
	id: string;
	object: "payment_intent";
	amount: number;
	amount_capturable: number;
	amount_details: {
		tip: unknown[];
	};
	amount_received: number;
	application: string | null;
	application_fee_amount: number | null;
	automatic_payment_methods: unknown | null;
	canceled_at: number | null;
	cancellation_reason: string | null;
	capture_method: string;
	client_secret: string;
	confirmation_method: string;
	created: number;
	currency: string;
	customer: string | null;
	description: string | null;
	last_payment_error: unknown | null;
	latest_charge: string | null;
	livemode: boolean;
	metadata: Record<string, string> | unknown[];
	next_action: unknown | null;
	on_behalf_of: string | null;
	payment_method: string | null;
	payment_method_configuration_details: unknown | null;
	payment_method_options: {
		card?: {
			installments: unknown | null;
			mandate_options: unknown | null;
			network: string | null;
			request_three_d_secure: string;
		};
		paypal?: {
			preferred_locale: string | null;
			reference: string | null;
		};
	};
	payment_method_types: string[];
	processing: unknown | null;
	receipt_email: string | null;
	review: string | null;
	setup_future_usage: string | null;
	shipping: unknown | null;
	source: string | null;
	statement_descriptor: string | null;
	statement_descriptor_suffix: string | null;
	status: string;
	transfer_data: unknown | null;
	transfer_group: string | null;
};

// ============================================================================
// FILTERS TYPE (Discriminated Union)
// ============================================================================

type BaseFilter = {
	name: string;
	title: string;
};

type SliderOptions = {
	min: number;
	max: number;
	prefix?: string;
	suffix?: string;
};

type CheckboxOption = {
	id: number;
	name: string;
	value: string | number[];
	count: number;
};

export type SliderFilter = BaseFilter & {
	type: "slider";
	options: SliderOptions;
};

export type CheckboxFilter = BaseFilter & {
	type: "checkbox";
	options: CheckboxOption[];
};

export type MultiCheckboxFilter = BaseFilter & {
	type: "multi-checkbox";
	options: CheckboxOption[];
};

export type Filter = SliderFilter | CheckboxFilter | MultiCheckboxFilter;
export type Filters = Filter[];
