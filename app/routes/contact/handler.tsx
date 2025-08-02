import { data } from "react-router";
import { commitSession, contact, getSession } from "~/.server";
import { ToastType } from "~/types";
import { putToast } from "~/utils";
import type { Route } from "./+types/handler";

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
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		},
	);
};
