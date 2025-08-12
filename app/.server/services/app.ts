import type {
	ApiListResponse,
	HeroBanner,
	Navigation,
	ProductCategory,
} from "~/types";
import { type TSession, fetcher } from "../libs";

export const getNavigation = async (session: TSession) => {
	const api = fetcher(session);

	return await api.get<ApiListResponse<Navigation>>("/sites/navigation");
};

export const getFeaturedCategories = async (session: TSession) => {
	const api = fetcher(session);
	return await api.get<ApiListResponse<ProductCategory>>(
		"/product-categories?include=products&filter[is_featured]=true&has_products=true&product_limit=4&per_page=6&sort=sort",
	);
};

export const getShopByCategories = async (session: TSession) => {
	const api = fetcher(session);
	return await api.get<ApiListResponse<ProductCategory>>(
		"/product-categories?filter[slug]=dehumidifiers,industrial-fans,floor-dryers,bundles&per_page=4&sort=created_at",
	);
};

export const getBanners = async (session: TSession) => {
	const api = fetcher(session);
	return await api.get<ApiListResponse<HeroBanner>>("/sites/hero-banners");
};

export const contact = async (session: TSession, formData: FormData) => {
	const { first_name, last_name, email, phone, message } =
		Object.fromEntries(formData);

	const api = fetcher(session);

	return await api.post("/sites/contact", {
		first_name,
		last_name,
		email,
		phone,
		message,
	});
};
