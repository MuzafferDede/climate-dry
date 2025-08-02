// utils/fetcher.ts
import type { Session } from "react-router";
import { getCustomer } from "./customer";

const BACKEND_URL = process.env.BACKEND_URL || "/api";
const SITE_CODE = process.env.SITE_CODE || "CD";

// Custom init type, similar to RequestInit but with typed `data` and `method`
type FetcherInit = Omit<RequestInit, "body" | "method" | "headers"> & {
	data?: unknown;
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	headers?: Record<string, string>;
};

// Discriminated union response
type FetcherResponse<T> =
	| { response: T; error: never }
	| { response: never; error: string };

export function fetcher(session: Session) {
	const customer = getCustomer(session);

	async function call<T = unknown>(
		endpoint: string,
		{ data, method = "GET", ...init }: FetcherInit = {},
	): Promise<FetcherResponse<T>> {
		const isAbsoluteUrl =
			endpoint.startsWith("http://") || endpoint.startsWith("https://");

		const headers: Record<string, string> = {
			"Content-Type": "application/json",
			Accept: "application/json",
			"X-Site-Code": SITE_CODE,
			"X-GUEST-ID": session.get("guestId") ?? "",
			...(init.headers ?? {}),
		};

		if (!isAbsoluteUrl && customer?.token) {
			headers.Authorization = `Bearer ${customer.token}`;
		}

		const config: RequestInit = {
			method,
			headers,
			...init,
			...(data !== undefined ? { body: JSON.stringify(data) } : {}),
		};

		const url = isAbsoluteUrl ? endpoint : `${BACKEND_URL}/api${endpoint}`;

		try {
			const res = await fetch(url, config);

			if (!res.ok) {
				const errorData: { message: string } = await res
					.json()
					.catch(() => ({ message: res.statusText }));

				return { response: undefined as never, error: errorData.message };
			}

			const json = (await res.json()) as T;
			return { response: json, error: undefined as never };
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "Unknown fetch error";
			return { response: undefined as never, error: message };
		}
	}

	return {
		get: <T = unknown>(
			endpoint: string,
			init?: Omit<FetcherInit, "method" | "data">,
		) => call<T>(endpoint, { ...init, method: "GET" }),

		post: <T = unknown>(
			endpoint: string,
			data: unknown,
			init?: Omit<FetcherInit, "method" | "data">,
		) => call<T>(endpoint, { ...init, method: "POST", data }),

		put: <T = unknown>(
			endpoint: string,
			data: unknown,
			init?: Omit<FetcherInit, "method" | "data">,
		) => call<T>(endpoint, { ...init, method: "PUT", data }),

		patch: <T = unknown>(
			endpoint: string,
			data: unknown,
			init?: Omit<FetcherInit, "method" | "data">,
		) => call<T>(endpoint, { ...init, method: "PATCH", data }),

		delete: <T = unknown>(
			endpoint: string,
			init?: Omit<FetcherInit, "method" | "data">,
		) => call<T>(endpoint, { ...init, method: "DELETE" }),
	};
}
