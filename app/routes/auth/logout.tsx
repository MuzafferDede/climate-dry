import { redirect } from "react-router";
import { authMiddleware } from "~/middlewares";
import { destroySession, fetcher, getSession, putToast } from "~/services";
import { ToastType } from "~/types";
import type { Route } from "./+types/logout";

export async function loader({ request }: Route.LoaderArgs) {
	try {
		const api = await fetcher(request);

		await api.post<{ message: string }>("/customer/logout", {});

		const session = await getSession(request.headers.get("Cookie"));

		putToast(session, { message: "Logout successful!", type: ToastType.Info });

		return redirect("/login", {
			headers: {
				"Set-Cookie": await destroySession(session),
			},
		});
	} catch (error) {
		const session = await getSession(request.headers.get("Cookie"));

		putToast(session, { message: "Logout failed!", type: ToastType.Error });

		return redirect("/login", {
			headers: {
				"Set-Cookie": await destroySession(session),
			},
		});
	}
}

export const unstable_middleware = [authMiddleware];
