import type { ApiListResponse, ApiResponse, Brand } from "~/types";
import { fetcher } from "./api.server";

export async function getBrand(request: Request, slug?: string) {
	const api = await fetcher(request);
	return await api.get<ApiResponse<Brand>>(`/brand/${slug || ""}`);
}

//named getBrandItems as Site already exports getBrands for the homepage
export async function getBrandItems(request: Request) {
	const api = await fetcher(request);
	return await api.get<ApiListResponse<Brand>>("/brand");
}
