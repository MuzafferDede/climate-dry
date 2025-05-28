import type { Session } from "react-router";
import type { Toast } from "~/types";

export function putToast(session: Session, toast: Toast): Session {
	session.flash("toast", toast);
	return session;
}

export function popToast(session: Session): Toast | undefined {
	return session.get("toast") as Toast | undefined;
}
