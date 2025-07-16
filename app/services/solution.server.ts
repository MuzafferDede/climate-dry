import type { ApiResponse,ApiListResponse, Solution } from "~/types";
import { fetcher } from "./api.server";

export async function getSolution(request: Request, slug?: string) {
	const api = await fetcher(request);
	return await api.get<ApiResponse<Solution>>(`/solution/${slug || ""}`);
}

export async function getSolutions(request: Request) {
	const api = await fetcher(request);
	return await api.get<ApiListResponse<Solution>>("/solution");
}
