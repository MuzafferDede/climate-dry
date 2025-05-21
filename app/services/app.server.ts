import { mainNavigation } from "~/static";
import type { HeroBannerItem, HeroCategoryItem, NavigationItem } from "~/types";
import { fetcher } from "./api.server";

export const navigationBuilder = async (
	request: Request,
): Promise<NavigationItem[]> => {
	try {
		const api = await fetcher(request);
		const categories: NavigationItem[] = await api.get("/site/navigation");

		return [
			{ slug: "/", name: "Our Products", children: categories },
			...mainNavigation,
		];
	} catch (error) {
		console.error("Error fetching categories:", error);
		return [...mainNavigation];
	}
};

export const heroCategoryBuilder = async (
	request: Request,
): Promise<HeroCategoryItem[]> => {
	try {
		const api = await fetcher(request);
		return await api.get("/site/hero-categories");
	} catch (error) {
		console.error("Error fetching categories:", error);
		return [];
	}
};

export const heroBannerBuilder = async (
	request: Request,
): Promise<HeroBannerItem[]> => {
	try {
		const api = await fetcher(request);
		return await api.get("/site/hero-banners");
	} catch (error) {
		console.error("Error fetching banners:", error);
		return [];
	}
};
