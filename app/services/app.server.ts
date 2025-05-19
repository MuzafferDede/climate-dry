import { staticNav } from "~/static";
import type { NavigationItem } from "~/types";
import { fetcher } from "./api.server";
type Category = {
	id: number;
	parent_id: number | null;
	name: string;
	slug: string;
	banner_link: string;
	banner_url: string;
	thumbnail_url: string;
};

export const navigationBuilder = async (
	request: Request,
): Promise<NavigationItem[]> => {
	const api = await fetcher(request);
	let categories: Category[] = [];

	try {
		categories = await api.get("/product-categories");
	} catch (error) {
		console.error("Error fetching categories:", error);
		categories = [];
	}
	// Group categories by parent_id for faster lookup
	const categoriesByParent = categories.reduce(
		(acc, category) => {
			const parentId =
				category.parent_id === null ? "null" : String(category.parent_id);
			if (!acc[parentId]) acc[parentId] = [];
			acc[parentId].push(category);
			return acc;
		},
		{} as Record<string, Category[]>,
	);

	// Recursive function to build the navigation tree
	const buildNavigationTree = (parentId: number | null): NavigationItem[] => {
		const children = categoriesByParent[parentId ?? "null"] || [];

		return children.map((category) => {
			const item: NavigationItem = {
				path: `/${category.slug}`,
				label: category.name,
				banner:
					category.banner_link && category.banner_url
						? {
								url: category.banner_link,
								image: category.banner_url,
							}
						: undefined,
			};

			const subItems = buildNavigationTree(category.id);
			if (subItems.length > 0) {
				item.children = subItems;
			}

			return item;
		});
	};

	// Build the dynamic navigation tree starting from root categories
	const dynamicNav = buildNavigationTree(null);

	// Merge with static navigation
	return [...dynamicNav, ...staticNav];
};
