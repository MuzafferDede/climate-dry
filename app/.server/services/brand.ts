import type { ApiListResponse, Brand } from "~/types";
import { type TSession, fetcher } from "../libs";

export async function getBrand(session: TSession, slug: string) {
	const api = fetcher(session);
	return await api.get<Brand>(`/brands/${slug}`);
}

//named getBrandItems as Site already exports getBrands for the homepage
export async function getBrands(session: TSession) {
	const api = fetcher(session);
	return await api.get<ApiListResponse<Brand>>("/brands");
}
