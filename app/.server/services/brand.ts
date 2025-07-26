import type { Session } from "react-router";
import type { ApiListResponse, Brand } from "~/types";
import { fetcher } from "../libs";

export async function getBrand(session: Session, slug: string) {
	const api = fetcher(session);
	return await api.get<Brand>(`/brands/${slug}`);
}

//named getBrandItems as Site already exports getBrands for the homepage
export async function getBrands(session: Session) {
	const api = fetcher(session);
	return await api.get<ApiListResponse<Brand>>("/brands");
}
