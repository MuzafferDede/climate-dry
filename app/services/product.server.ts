import type {
	ApiListResponse,
	ApiResponse,
	Product,
	ProductCategory,
} from "~/types";
import { queryBuilder } from "~/utils";
import { fetcher } from "./api.server";

export async function getProductCategory(
	request: Request,
	slug: string | undefined,
) {
	const api = await fetcher(request);

	return await api.get<ApiResponse<ProductCategory>>(
		`/product-categories/${slug}?include=parent,children`,
	);
}

export async function getCategoryProducts(
	request: Request,
	category: string | undefined,
) {
	const url = new URL(request.url);

	const query = queryBuilder({
		"filter[category]": category,
		include: "brand,discount,variants",
		page: url.searchParams.get("page") || 1,
		per_page: url.searchParams.get("per_page") || 20,
		sort: url.searchParams.get("sort") || "price-low",
	});

	const api = await fetcher(request);

	const response = await api.get<ApiListResponse<Product>>(
		`/products?${query}`,
	);

	return response;
}

export async function getProduct(request: Request, slug: string | undefined) {
	const api = await fetcher(request);
	return await api.get<ApiResponse<Product>>(
		`/products/${slug}?include=brand,discount,category,relatedProducts,extras,variants`,
	);
}

export async function getProducts(request: Request) {
	const url = new URL(request.url);
	const q = url.searchParams.get("q");

	const query = queryBuilder({
		...(q ? { "filter[q]": q } : {}),
		include: "brand",
	});

	if (!q) return;
	const api = await fetcher(request);
	return await api.get<ApiListResponse<Product>>(`/products?${query}`);
}
