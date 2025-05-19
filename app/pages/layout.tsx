import { Outlet } from "react-router";
import { Footer, Header } from "~/components";
import { getCustomer, navigationBuilder } from "~/services";
import type { Route } from "./+types/layout";

export const loader = async ({ request }: Route.LoaderArgs) => {
	try {
		const customer = await getCustomer(request);
		const menu = navigationBuilder(request);

		return { customer, menu };
	} catch (error) {
		throw {
			message:
				error instanceof Error
					? error.message
					: "There was an issue. Please try again.",
		};
	}
};

export default function Layout() {
	return (
		<div>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}
