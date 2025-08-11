import { redirect } from "react-router";
import { buildHeaders, destroySession, getSession, logout } from "~/.server";
import { authMiddleware } from "~/middlewares";
import { ToastType } from "~/types";
import { putToast } from "~/utils";
import type { Route } from "./+types/logout";

export async function loader({ request }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const { error } = await logout(session);

	if (error) {
		putToast(session, { message: "Logout failed!", type: ToastType.Error });

		return redirect("/account", {
			headers: await buildHeaders(session),
		});
	}

	return redirect("/login", {
		headers: {
			"Set-Cookie": await destroySession(session),
		},
	});
}

export const unstable_middleware = [authMiddleware];
