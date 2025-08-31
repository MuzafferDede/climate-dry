import { data } from "react-router";
import { buildHeaders, getCart, getSession } from "~/.server";
import type { Route } from "./+types/resource";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await getSession(request.headers.get("Cookie"));

	const { response: cart } = await getCart(session);

	session.set("guestId", cart.guest_id);

	return data(
		{ cart },
		{
			headers: await buildHeaders(session),
		},
	);
};
