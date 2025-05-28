import { Hono } from "hono";
import { createRequestHandler } from "react-router";

import * as build from "virtual:react-router/server-build";

declare module "react-router" {
	interface AppLoadContext {}
}

const app = new Hono();

// Add any additional Hono middleware here

const handler = createRequestHandler(build);
app.mount("/", (req) => handler(req, new Map()));

export default app.fetch;
