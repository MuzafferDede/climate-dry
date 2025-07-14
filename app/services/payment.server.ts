import type { StripePaymentIntent } from "~/types";
import { fetcher } from "./api.server";

export async function getPaymentIntentSecret(
	request: Request,
	formData: FormData,
) {
	const formValues = Object.fromEntries(formData);

	const api = await fetcher(request);

	return await api.post<StripePaymentIntent>(
		"/orders/create-payment-intent",
		formValues,
	);
}
