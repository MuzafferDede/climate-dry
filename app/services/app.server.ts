import { mainNavigation } from "~/static";
import type {
	ApiListResponse,
	Brand,
	HeroBanner,
	Navigation,
	ProductCategory,
} from "~/types";
import { fetcher } from "./api.server";

export const getNavigation = async (request: Request) => {
	try {
		const api = await fetcher(request);
		const categories: Navigation[] = await api.get("/site/navigation");

		return [
			{ slug: "/", name: "Our Products", children: categories },
			...mainNavigation,
		];
	} catch (error) {
		const message = "Error fetching navigation";
		console.error(message, error);

		return mainNavigation;
	}
};

export const getFeaturedCategories = async (request: Request) => {
	try {
		const api = await fetcher(request);
		return await api.get<ApiListResponse<ProductCategory>>(
			"/product-categories?include=products&filter[is_featured]=true&has_products=true&product_limit=4&per_page=4&sort=created_at",
		);
	} catch (error) {
		const message = "Error fetching featured categories";
		console.error(message, error);

		return { data: [] };
	}
};

export const getShopByCategories = async (request: Request) => {
	try {
		const api = await fetcher(request);
		return await api.get<ApiListResponse<ProductCategory>>(
			"/product-categories?filter[id]=20,21,22,23&has_products=true&per_page=4&sort=created_at",
		);
		// return await api.get<ProductCategory[]>("/site/shop-by-categories?slugs=a,b,c");
	} catch (error) {
		const message = "Error fetching featured categories";
		console.error(message, error);

		return { data: [] };
	}
};

export const getBanners = async (request: Request) => {
	try {
		const api = await fetcher(request);
		return await api.get<HeroBanner[]>("/site/hero-banners");
	} catch (error) {
		const message = "Error fetching banners";
		console.error(message, error);

		return [];
	}
};

export const getBrands = async (request: Request) => {
	try {
		const api = await fetcher(request);
		return await api.get<Brand[]>("/site/brands");
	} catch (error) {
		const message = "Error fetching brands";
		console.error(message, error);

		return [];
	}
};
