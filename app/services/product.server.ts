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

	const defaults = {
		page: "1",
		per_page: "20",
		sort: "price-low",
	};

	const params = Object.fromEntries(url.searchParams.entries());

	const mergedParams = { ...defaults, ...params };

	const query = queryBuilder({
		"filter[category]": category,
		include: "brand,discount,variants,approvedReviews",
		...mergedParams,
	});

	const api = await fetcher(request);

	const response = await api.get<ApiListResponse<Product>>(
		`/products?${query}`,
	);

	return response;
}
export async function getBrandProducts(
	request: Request,
	brand: string | undefined,
) {
	const url = new URL(request.url);

	const query = queryBuilder({
		"filter[brand]": brand,
		include: "brand,discount,variants,approvedReviews",
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
		`/products/${slug}?include=brand,discount,category,relatedProducts,extras,variants,approvedReviews`,
	);
}

export async function getProducts(request: Request) {
	const url = new URL(request.url);
	const q = url.searchParams.get("q");

	const query = queryBuilder({
		...(q ? { "filter[q]": q } : {}),
		include: "brand,approvedReviews",
	});

	if (!q) return;
	const api = await fetcher(request);
	return await api.get<ApiListResponse<Product>>(`/products?${query}`);
}

export async function addReview(request: Request, formData: FormData) {
	const api = await fetcher(request);
	const rating = formData.get("rating");
	const review = formData.get("review");
	const slug = formData.get("slug");

	if (!rating || !review) {
		throw new Error("Missing rating or review.");
	}

	return await api.post<ApiResponse<Product["reviews"]["data"][number]>>(
		`/products/${slug}/reviews`,
		{
			rating: Number(rating),
			review: String(review),
		},
	);
}
