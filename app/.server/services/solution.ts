import type { ApiListResponse, Solution } from "~/types";
import { type TSession, fetcher } from "../libs";

export async function getSolution(session: TSession, slug?: string) {
	const api = fetcher(session);
	return await api.get<Solution>(`/solutions/${slug || ""}`);
}

export async function getSolutions(session: TSession) {
	const api = fetcher(session);
	return await api.get<ApiListResponse<Solution>>("/solutions");
}
