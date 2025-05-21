import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("pages/home/index.tsx"),
	route("login", "pages/auth/login.tsx"),
	route("register", "pages/auth/register.tsx"),
	route("forgot-password", "pages/auth/forgot-password.tsx"),
	route("reset-password", "pages/auth/reset-password.tsx"),
	route("account", "pages/account/index.tsx"),
	route("logout", "pages/auth/logout.tsx"),
	route("cart", "pages/cart/index.tsx"),
] satisfies RouteConfig;
