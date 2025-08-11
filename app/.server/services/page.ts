import type { ApiListResponse, Page } from "~/types";
import { type TSession, fetcher } from "../libs";

export async function getPage(session: TSession, slug?: string) {
	const api = fetcher(session);

	const endpoint = slug ? `/pages/${slug}` : "/pages";

	const { response, error } = await api.get<Page>(endpoint);

	return { response, error };
}

export async function getPages(session: TSession) {
	const api = fetcher(session);

	const { response, error } = await api.get<ApiListResponse<Page>>(
		"/pages?include=category",
	);

	return { response, error };
}
