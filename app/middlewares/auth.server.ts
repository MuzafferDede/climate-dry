import { redirect, type unstable_MiddlewareFunction } from "react-router";
import { getCustomer, getSession } from "~/.server";

export const authMiddleware: unstable_MiddlewareFunction = async (
	{ request },
	next,
) => {
	const session = await getSession(request.headers.get("Cookie"));
	const customer = getCustomer(session);

	if (!customer) {
		throw redirect("/login");
	}

	return await next();
};
