// utils/fetcher.ts
import { getCustomer } from "./customer.server";
import { getSession } from "./session.server";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const SITE_ID = import.meta.env.VITE_SITE_ID || "1";

interface FetcherInit extends RequestInit {
	data?: unknown;
}

export async function fetcher(request: Request) {
	const customer = await getCustomer(request);
	const session = await getSession(request.headers.get("Cookie"));

	async function call<T = unknown>(
		endpoint: string,
		{ data, method = "GET", ...init }: FetcherInit = {},
	): Promise<T> {
		const isAbsoluteUrl =
			endpoint.startsWith("http://") || endpoint.startsWith("https://");

		// Start with a plain object for headers
		const headers: Record<string, string> = {
			"Content-Type": "application/json",
			Accept: "application/json",
			"X-Site-ID": SITE_ID,
			"X-GUEST-ID": session.get("guestId") ?? "",
			...(init.headers as Record<string, string>), // cast if needed
		};

		// Add Authorization header only for relative URLs and if token exists
		if (!isAbsoluteUrl && customer?.token) {
			headers.Authorization = `Bearer ${customer.token}`;
		}

		const config: RequestInit = {
			method,
			headers,
			...init,
			...(data ? { body: JSON.stringify(data) } : {}),
		};

		const url = isAbsoluteUrl ? endpoint : `${BASE_URL}${endpoint}`;

		const res = await fetch(url, config);

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
