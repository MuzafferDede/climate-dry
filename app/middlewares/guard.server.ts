import { redirect } from "react-router";
import { getCustomer, getSession } from "~/.server";

export const authGuard = async (request: Request) => {
	const session = await getSession(request.headers.get("Cookie"));
	const customer = getCustomer(session);

	if (!customer) {
		throw redirect("/login");
	}
};

export const guestGuard = async (request: Request) => {
	const session = await getSession(request.headers.get("Cookie"));
	const customer = getCustomer(session);

	if (customer) {
		throw redirect("/account");
	}
};
