import { Hono } from "hono";
import { createRequestHandler } from "react-router";

import * as build from "virtual:react-router/server-build";

declare module "react-router" {
	interface AppLoadContext {}
}

const app = new Hono();

// ✅ Middleware to force lowercase URLs
app.use("*", async (c, next) => {
	const url = new URL(c.req.url);
	const originalPath = url.pathname;
	const lowercasePath = originalPath.toLowerCase();

	if (originalPath !== lowercasePath) {
		url.pathname = lowercasePath;
		return c.redirect(url.toString(), 301); // Permanent redirect
	}

	await next();
});

// ✅ Remix request handler
const handler = createRequestHandler(build);
app.mount("/", (req) => handler(req, new Map()));

export default app.fetch;
