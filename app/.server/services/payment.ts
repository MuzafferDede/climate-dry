import type { StripePaymentIntent } from "~/types";
import { type TSession, fetcher } from "../libs";

export async function getPaymentIntentSecret(
	session: TSession,
	formData: FormData,
) {
	const formValues = Object.fromEntries(formData);

	const api = fetcher(session);

	return await api.post<StripePaymentIntent>(
		"/orders/create-payment-intent",
		formValues,
	);
}
