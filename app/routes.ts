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
	route("drying-calculator", "routes/drying-calculator.tsx"),
	route("checkout", "routes/checkout/page.tsx"),
	route("pages/:slug?", "routes/pages/detail.tsx"),
	route("product-category/:slug", "routes/product-category/list.tsx"),
	route("product/:slug", "routes/product/detail.tsx"),
] satisfies RouteConfig;
