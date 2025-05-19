export type Customer = {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	token: string;
};

export type NavigationItem = {
	path: string;
	label: string;
	banner?: {
		url: string;
		image: string;
	};
	children?: NavigationItem[];
};
