import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("login", "routes/auth/login.tsx"),
	route("register", "routes/auth/register.tsx"),
	route("forgot-password", "routes/auth/forgot-password.tsx"),
	route("reset-password", "routes/auth/reset-password.tsx"),
	route("account", "routes/account/detail.tsx"),
	route("logout", "routes/auth/logout.tsx"),
	route("info-hub", "routes/blog-posts/list.tsx", { id: "blog" }),
	route("info-hub/:category", "routes/blog-posts/list.tsx"),
	route("info-hub/article/:slug", "routes/blog-posts/detail.tsx"),
	route("cart", "routes/cart/detail.tsx"),

	route("drying-calculator/", "routes/drying-calculator.tsx"),
	route("evaporative-cooling-calculator/", "routes/evaporative-cooling-calculator.tsx"),
	route("water-damage-restoration/", "routes/water-damage-restoration.tsx"),

	route("checkout/success", "routes/checkout/success.tsx"),
	route("checkout/cancel", "routes/checkout/cancel.tsx"),
	route("brands", "routes/brand/list.tsx"),
	route("brand/:slug", "routes/brand/detail.tsx"),
	route("pages/:slug?", "routes/pages/detail.tsx"),
	route("c/:slug", "routes/product-category/list.tsx"),
	route("p/:slug", "routes/product/detail.tsx"),
	route("solution/:slug?", "routes/solution/detail.tsx"),
] satisfies RouteConfig;
