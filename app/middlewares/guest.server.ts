import { redirect, type unstable_MiddlewareFunction } from "react-router";
import { getCustomer } from "~/services";

export const guestMiddleware: unstable_MiddlewareFunction = async (
	{ request },
	next,
) => {
	const customer = await getCustomer(request);

	if (customer) {
		throw redirect("/account");
	}

	return await next();
};
