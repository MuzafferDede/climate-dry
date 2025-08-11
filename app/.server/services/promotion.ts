import type { Promotion } from "~/types";
import { type TSession, fetcher } from "../libs";

export async function getPromotion(session: TSession, slug: string) {
	const api = fetcher(session);
	return await api.get<Promotion>(`/promotions/${slug}`);
}
