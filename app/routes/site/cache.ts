import { redirect } from "react-router";
import { cached } from "~/.server";

export const loader = () => {
	cached.clear();
	return redirect("/");
};
