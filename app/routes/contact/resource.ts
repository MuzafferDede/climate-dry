import { data } from "react-router";
import { buildHeaders, contact, getSession } from "~/.server";
import { ToastType } from "~/types";
import { putToast } from "~/utils";
import type { Route } from "./+types/resource";

export const action = async ({ request }: Route.ActionArgs) => {
	const formData = await request.formData();
	const session = await getSession(request.headers.get("Cookie"));

	const { error } = await contact(session, formData);

	putToast(session, {
		message:
			error || "Thanks for contacting us! We will get back to you shortly.",
		type: error ? ToastType.Error : ToastType.Success,
	});

	return data(
		{ success: !error },
		{
			headers: await buildHeaders(session),
		},
	);
};
