import { redirect } from "react-router";
import { getCustomer } from "~/services";

export const authGuard = async (request: Request) => {
	const customer = await getCustomer(request);

	if (!customer) {
		throw redirect("/login");
	}
};

export const guestGuard = async (request: Request) => {
	const customer = await getCustomer(request);

	if (customer) {
		throw redirect("/account");
	}
};
