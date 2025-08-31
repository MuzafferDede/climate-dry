import type {
	ApiListResponse,
	HeroBanner,
	Navigation,
	ProductCategory,
} from "~/types";
import { type TSession, cached, fetcher } from "../libs";

export const getNavigation = async (session: TSession) => {
	const cachedNavigation =
		cached.get<ApiListResponse<Navigation>>("navigation");
	if (cachedNavigation) {
		return { response: cachedNavigation, error: undefined };
	}

	const api = fetcher(session);

	const { response, error } =
		await api.get<ApiListResponse<Navigation>>("/sites/navigation");

	if (response) {
		cached.set("navigation", response);
	}

	return { response, error };
};

export const getFeaturedCategories = async (session: TSession) => {
	const cachedFeaturedCategories = cached.get<ApiListResponse<ProductCategory>>("featured-categories");
	if (cachedFeaturedCategories) {
		return { response: cachedFeaturedCategories, error: undefined };
	}

	const api = fetcher(session);
	const { response, error } = await api.get<ApiListResponse<ProductCategory>>(
		"/product-categories?include=products&filter[is_featured]=true&has_products=true&product_limit=4&per_page=6&sort=sort",
	);

	if (response) {
		cached.set("featured-categories", response, 30 * 60 * 1000); // 30 minutes
	}

	return { response, error };
};

export const getShopByCategories = async (session: TSession) => {
	const cachedShopByCategories = cached.get<ApiListResponse<ProductCategory>>("shop-by-categories");
	if (cachedShopByCategories) {
		return { response: cachedShopByCategories, error: undefined };
	}

	const api = fetcher(session);
	const { response, error } = await api.get<ApiListResponse<ProductCategory>>(
		"/product-categories?filter[slug]=dehumidifiers,industrial-fans,floor-dryers,bundles&per_page=4&sort=created_at",
	);

	if (response) {
		cached.set("shop-by-categories", response, 30 * 60 * 1000); // 30 minutes
	}

	return { response, error };
};

export const getBanners = async (session: TSession) => {
	const cachedBanners = cached.get<ApiListResponse<HeroBanner>>("hero-banners");
	if (cachedBanners) {
		return { response: cachedBanners, error: undefined };
	}

	const api = fetcher(session);
	const { response, error } = await api.get<ApiListResponse<HeroBanner>>("/sites/hero-banners");

	if (response) {
		cached.set("hero-banners", response, 15 * 60 * 1000); // 15 minutes
	}

	return { response, error };
};

export const contact = async (session: TSession, formData: FormData) => {
	const { first_name, last_name, email, phone, message, website, _form_time } =
		Object.fromEntries(formData);

	const api = fetcher(session);

	return await api.post("/sites/contact", {
		first_name,
		last_name,
		email,
		phone,
		message,
		website,
		_form_time,
	});
};
