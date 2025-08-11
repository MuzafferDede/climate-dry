import type { TSession } from "~/.server";
import type { Toast } from "~/types";

export function putToast(session: TSession, toast: Toast) {
	session.flash("toast", toast);
}

export function popToast(session: TSession): Toast | undefined {
	const toast = session.get("toast") as Toast | undefined;
	return toast;
}
