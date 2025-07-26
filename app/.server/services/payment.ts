import type { Session } from "react-router";
import type { StripePaymentIntent } from "~/types";
import { fetcher } from "../libs";

export async function getPaymentIntentSecret(
	session: Session,
	formData: FormData,
) {
	const formValues = Object.fromEntries(formData);

	const api = fetcher(session);

	return await api.post<StripePaymentIntent>(
		"/orders/create-payment-intent",
		formValues,
	);
}
