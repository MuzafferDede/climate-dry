import type { ApiListResponse, Product, ProductCategory } from "~/types";
import { queryBuilder } from "~/utils";
import { type TSession, fetcher } from "../libs";

export async function getProductCategory(
	session: TSession,
	slug: string | undefined,
) {
	const api = fetcher(session);

	return await api.get<ProductCategory>(
		`/product-categories/${slug}?include=parent,children,products`,
	);
}

export async function getProductCategories(session: TSession) {
	const api = fetcher(session);

	return await api.get<ApiListResponse<ProductCategory>>(
		"/product-categories?include=parent,children",
	);
}

export async function getProducts(session: TSession, url?: URL) {
	const searchParams = url
		? new URLSearchParams(url.search)
		: new URLSearchParams();

	const defaults: Record<string, string> = {
		page: "1",
		per_page: "20",
		sort: "price-low",
		include: "brand,discount,variants,approvedReviews",
	};

	const filters: Record<string, string> = {};

	const q = searchParams.get("q");
	if (q !== null) {
		filters["filter[q]"] = q;
	}

	const category = searchParams.get("category");
	if (category !== null) {
		filters["filter[category]"] = category;
	}

	// Build queryParams, excluding `q` and `category`
	const queryParams: Record<string, string> = {};
	for (const [key, value] of searchParams.entries()) {
		if (key !== "q" && key !== "category") {
			queryParams[key] = value;
		}
	}

	const mergedParams = {
		...defaults,
		...filters,
		...queryParams,
	};

	const query = queryBuilder(mergedParams);

	const api = fetcher(session);
	return await api.get<ApiListResponse<Product>>(`/products?${query}`);
}

export async function getBrandProducts(
	session: TSession,
	url: URL,
	brand: string | undefined,
) {
	const query = queryBuilder({
		"filter[brand]": brand,
		include: "brand,discount,variants,approvedReviews",
		page: url.searchParams.get("page") || 1,
		per_page: url.searchParams.get("per_page") || 20,
		sort: url.searchParams.get("sort") || "price-low",
	});

	const api = fetcher(session);

	const response = await api.get<ApiListResponse<Product>>(
		`/products?${query}`,
	);

	return response;
}

export async function getProduct(session: TSession, slug: string | undefined) {
	const api = fetcher(session);
	return await api.get<Product>(
		`/products/${slug}?include=brand,discount,category,categories,relatedProducts,extras,variants,approvedReviews`,
	);
}

export async function addReview(session: TSession, formData: FormData) {
	const api = fetcher(session);
	const rating = formData.get("rating");
	const review = formData.get("review");
	const slug = formData.get("slug");

	if (!rating || !review) {
		throw new Error("Missing rating or review.");
	}

	return await api.post<Product["reviews"]["data"][number]>(
		`/products/${slug}/reviews`,
		{
			rating: Number(rating),
			review: String(review),
		},
	);
}
