import type { Session } from "react-router";
import type { ApiListResponse, BlogPost } from "~/types";
import { queryBuilder } from "~/utils";
import { fetcher } from "../libs";

export async function getBlogPost(session: Session, slug: string) {
	const api = fetcher(session);
	return await api.get<BlogPost>(`/blog-posts/${slug}`);
}

export async function getBlogPosts(session: Session, category?: string) {
	const api = fetcher(session);

	const query: Record<string, string> = {};

	if (category) {
		query["filter[categories]"] = category;
	}

	const queryString = queryBuilder(query);

	return await api.get<ApiListResponse<BlogPost>>(`/blog-posts?${queryString}`);
}

export async function getFeaturedBlogPosts(session: Session) {
	const api = fetcher(session);

	const query = queryBuilder({
		"filter[featured]": 1,
	});

	return await api.get<ApiListResponse<BlogPost>>(
		`/blog-posts?${query}&post_limit=4`,
	);
}
