import { mainNavigation } from "~/static";
import type { Brand, FeaturedCategory, HeroBanner, Navigation } from "~/types";
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
		return await api.get<FeaturedCategory[]>("/site/featured-categories");
	} catch (error) {
		const message = "Error fetching featured categories";
		console.error(message, error);

		return [];
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
