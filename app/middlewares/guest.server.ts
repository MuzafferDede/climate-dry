import { redirect, type unstable_MiddlewareFunction } from "react-router";
import { getCustomer, getSession } from "~/.server";

export const guestMiddleware: unstable_MiddlewareFunction = async (
	{ request },
	next,
) => {
	const session = await getSession(request.headers.get("Cookie"));
	const customer = getCustomer(session);

	if (customer) {
		throw redirect("/account");
	}

	return await next();
};
