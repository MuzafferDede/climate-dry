import type { Session } from "react-router";
import type { ApiListResponse, Product, ProductCategory } from "~/types";
import { queryBuilder } from "~/utils";
import { fetcher } from "../libs";

export async function getProductCategory(
	session: Session,
	slug: string | undefined,
) {
	const api = fetcher(session);

	return await api.get<ProductCategory>(
		`/product-categories/${slug}?include=parent,children`,
	);
}

export async function getCategoryProducts(
	session: Session,
	url: URL,
	category: string | undefined,
) {
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

	const api = fetcher(session);

	const response = await api.get<ApiListResponse<Product>>(
		`/products?${query}`,
	);

	return response;
}
export async function getBrandProducts(
	session: Session,
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

export async function getProduct(session: Session, slug: string | undefined) {
	const api = fetcher(session);
	return await api.get<Product>(
		`/products/${slug}?include=brand,discount,category,relatedProducts,extras,variants,approvedReviews`,
	);
}

export async function getProducts(session: Session, url: URL) {
	const q = url.searchParams.get("q");

	const query = queryBuilder({
		...(q ? { "filter[q]": q } : {}),
		include: "brand,approvedReviews",
	});

	if (!q) return {};

	const api = fetcher(session);
	const { response, error } = await api.get<ApiListResponse<Product>>(
		`/products?${query}`,
	);

	return {
		response,
		error,
	};
}

export async function addReview(session: Session, formData: FormData) {
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
