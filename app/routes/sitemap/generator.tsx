import {
	getBlogPosts,
	getPages,
	getProductCategories,
	getProducts,
	getSession,
} from "~/.server";
import type { ApiListResponse } from "~/types";
import type { Route } from "./+types/generator";

type SitemapItem = { slug: string };

const convertToXML = (
	data: SitemapItem[],
	baseUrl: string,
	prefix = "",
): string => {
	const urls = data
		.map(({ slug }) => {
			const loc = slug.startsWith("http")
				? slug
				: `${baseUrl}/${prefix}/${slug}`.replace(/([^:]\/)\/+/g, "$1");
			return `<url><loc>${loc}</loc></url>`;
		})
		.join("");

	return `<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${urls}
		</urlset>`;
};
const sitemapCache = new Map<string, { xml: string; expiresAt: number }>();
const TTL = 1000 * 60 * 60; // 1 hour

export const loader = async ({ request, params }: Route.LoaderArgs) => {
	const { resource } = params;
	const url = new URL(request.url);

	const cacheKey = `${resource}:${url.origin}`;
	const cached = sitemapCache.get(cacheKey);

	// 🧠 If still valid, return cached version
	if (cached && cached.expiresAt > Date.now()) {
		return new Response(cached.xml, {
			headers: {
				"Content-Type": "application/xml",
				"X-Cache": "HIT",
			},
		});
	}

	// Otherwise, fetch fresh
	const session = await getSession(request.headers.get("Cookie"));

	let response: ApiListResponse<unknown> | undefined;

	switch (resource) {
		case "p":
			url.searchParams.set("per_page", "0");
			({ response } = await getProducts(session, url));
			break;
		case "c":
			({ response } = await getProductCategories(session));
			break;
		case "info-hub":
			({ response } = await getBlogPosts(session));
			break;
		case "pages":
			({ response } = await getPages(session));
			break;
		default:
			throw new Response("Not Found", { status: 404 });
	}

	if (!response) {
		throw new Response("Failed to generate sitemap", { status: 500 });
	}

	const xml = convertToXML(
		response.data as SitemapItem[],
		url.origin,
		resource,
	);

	// 💾 Save to cache
	sitemapCache.set(cacheKey, {
		xml,
		expiresAt: Date.now() + TTL,
	});

	return new Response(xml, {
		headers: {
			"Content-Type": "application/xml",
			"X-Cache": "MISS",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
