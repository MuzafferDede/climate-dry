import { Outlet } from "react-router";
import { Footer, Header } from "~/components";
import { getCustomer } from "~/services";
import type { Route } from "./+types/layout";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const customer = await getCustomer(request);

	return customer;
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
