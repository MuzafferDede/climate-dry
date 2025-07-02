import type {
	ApiListResponse,
	ApiResponse,
	BlogPost,
} from "~/types";
import { fetcher } from "./api.server";

export async function getBlogPosts(request: Request) {
	const api = await fetcher(request);
	return await api.get<ApiListResponse<BlogPost>>("/blog-posts"); // ← this should resolve to /api/blog-posts
}

export async function getBlogPostBySlug(request: Request, slug: string) {
	const api = await fetcher(request);
	return await api.get<ApiResponse<BlogPost>>(`/blog-posts/${slug}`);
}
