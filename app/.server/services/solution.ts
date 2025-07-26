import type { Session } from "react-router";
import type { ApiListResponse, Solution } from "~/types";
import { fetcher } from "../libs";

export async function getSolution(session: Session, slug?: string) {
	const api = fetcher(session);
	return await api.get<Solution>(`/solutions/${slug || ""}`);
}

export async function getSolutions(session: Session) {
	const api = fetcher(session);
	return await api.get<ApiListResponse<Solution>>("/solutions");
}
