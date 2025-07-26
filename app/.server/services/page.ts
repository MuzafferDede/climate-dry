import type { Session } from "react-router";
import type { ApiListResponse, Page } from "~/types";
import { fetcher } from "../libs";

export async function getPage(session: Session, slug?: string) {
	const api = fetcher(session);

	const { response, error } = await api.get<Page>(`/pages/${slug}`);

	return { response, error };
}

export async function getPages(session: Session) {
	const api = fetcher(session);

	const { response, error } = await api.get<ApiListResponse<Page>>(
		"/pages?include=category",
	);

	return { response, error };
}
