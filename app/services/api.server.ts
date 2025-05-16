// utils/fetcher.ts
import { getCustomer } from "./customer.server";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const SITE_ID = import.meta.env.VITE_SITE_ID || "1";

interface FetcherInit extends RequestInit {
	data?: unknown;
}

// 🧠 Main utility – accepts the `request` object and returns a scoped fetcher
export async function fetcher(request: Request) {
	const customer = await getCustomer(request);

	async function call<T = unknown>(
		endpoint: string,
		{ data, method = "GET", ...init }: FetcherInit = {},
	): Promise<T> {
		const headers: HeadersInit = {
			"Content-Type": "application/json",
			Accept: "application/json",
			"X-Site-ID": SITE_ID,
			...(customer?.token ? { Authorization: `Bearer ${customer.token}` } : {}),
			...init.headers,
		};

		const config: RequestInit = {
			method,
			headers,
			...init,
			...(data ? { body: JSON.stringify(data) } : {}),
		};

		const res = await fetch(`${BASE_URL}${endpoint}`, config);

		if (!res.ok) {
			const errorData = await res.json().catch(() => ({
				message: res.statusText,
			}));
			throw new Error(errorData.message || `HTTP ${res.status}`);
		}

		return res.status === 204 ? (undefined as T) : res.json();
	}

	return {
		get: <T = unknown>(endpoint: string, init?: RequestInit) =>
			call<T>(endpoint, { ...init, method: "GET" }),

		post: <T = unknown>(endpoint: string, data: unknown, init?: RequestInit) =>
			call<T>(endpoint, { ...init, method: "POST", data }),

		put: <T = unknown>(endpoint: string, data: unknown, init?: RequestInit) =>
			call<T>(endpoint, { ...init, method: "PUT", data }),

		patch: <T = unknown>(endpoint: string, data: unknown, init?: RequestInit) =>
			call<T>(endpoint, { ...init, method: "PATCH", data }),

		delete: <T = unknown>(endpoint: string, init?: RequestInit) =>
			call<T>(endpoint, { ...init, method: "DELETE" }),
	};
}
