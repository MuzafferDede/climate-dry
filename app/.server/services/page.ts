import type { ApiListResponse, Page } from "~/types";
import { type TSession, fetcher } from "../libs";
import { cached } from "../libs/cache";

export async function getPage(session: TSession, slug?: string) {
	const api = fetcher(session);

	const endpoint = slug ? `/pages/${slug}` : "/pages";

	const { response, error } = await api.get<Page>(endpoint);

	return { response, error };
}

export async function getPages(session: TSession) {
	const cachedPages = cached.get<ApiListResponse<Page>>("pages");
	if (cachedPages) {
		return { response: cachedPages, error: undefined };
	}

	const api = fetcher(session);

	const { response, error } = await api.get<ApiListResponse<Page>>(
		"/pages?include=category",
	);

	if (response) {
		cached.set("pages", response);
	}

	return { response, error };
}
