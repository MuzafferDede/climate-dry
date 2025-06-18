import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home/index.tsx"),
	route("login", "routes/auth/login.tsx"),
	route("register", "routes/auth/register.tsx"),
	route("forgot-password", "routes/auth/forgot-password.tsx"),
	route("reset-password", "routes/auth/reset-password.tsx"),
	route("account", "routes/account/index.tsx"),
	route("logout", "routes/auth/logout.tsx"),
	route("cart", "routes/cart/index.tsx"),
	route("checkout", "routes/checkout/index.tsx"),
] satisfies RouteConfig;
