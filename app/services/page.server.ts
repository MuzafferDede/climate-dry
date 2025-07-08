import type { ApiResponse, Page } from "~/types";
import { fetcher } from "./api.server";

export async function getPage(request: Request, slug?: string) {
	const api = await fetcher(request);
	return await api.get<ApiResponse<Page>>(`/pages/${slug || ""}`);
}

export async function getPages(request: Request) {
	const api = await fetcher(request);
	return await api.get<ApiResponse<Page>>("/pages?include=category");
}
