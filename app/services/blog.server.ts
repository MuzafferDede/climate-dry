import type { ApiListResponse, ApiResponse, BlogPost } from "~/types";
import { queryBuilder } from "~/utils";
import { fetcher } from "./api.server";

export async function getBlogPosts(
	request: Request,
	params: { category: string },
) {
	const api = await fetcher(request);

	const query = queryBuilder({
		"filter[categories]": params.category,
	});

	return await api.get<ApiListResponse<BlogPost>>(`/blog-posts?${query}`);
}

export async function getBlogPostBySlug(request: Request, slug: string) {
	const api = await fetcher(request);
	return await api.get<ApiResponse<BlogPost>>(`/blog-posts/${slug}`);
}
