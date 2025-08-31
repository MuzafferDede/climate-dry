import { getCustomer, getSession } from "~/.server";
import type { Route } from "./+types/detail";

export function meta() {
	return [
		{ title: "My Account | Climate Dry" },
		{ name: "description", content: "Manage your Climate Dry account" },
	];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await getSession(request.headers.get("Cookie"));
	const customer = await getCustomer(session);
	return { customer };
};

export default function AccountPage({ loaderData }: Route.ComponentProps) {
	const { customer } = loaderData;

	if (!customer) {
		return (
			<div className="account-page mx-auto max-w-3xl p-6 text-center">
				<p className="text-gray-600">Loading account details…</p>
			</div>
		);
	}

	return (
		<div className="account-page mx-auto my-10 max-w-3xl rounded-md bg-white p-8 shadow">
			<h1 className="mb-6 font-semibold text-3xl text-gray-900">
				Welcome to your Customer Dashboard, {customer.first_name}.
			</h1>

			<p className="mb-4 text-gray-700 leading-relaxed">
				To enhance your shopping experience, any contact or address information
				added during checkout is securely saved for future purchases.
			</p>

			<p className="mb-8 text-gray-700 italic leading-relaxed">
				More features, including order history and address management, are
				coming soon.
			</p>

			<section className="account-info mb-10 border-gray-200 border-t pt-6">
				<h2 className="mb-4 font-semibold text-2xl text-gray-800">
					Account Information
				</h2>
				<ul className="space-y-3 text-gray-700">
					<li>
						<span className="font-medium">Full Name:</span>{" "}
						{customer.first_name} {customer.last_name}
					</li>
					<li>
						<span className="font-medium">Email:</span> {customer.email}
					</li>
					<li>
						<span className="font-medium">Phone:</span> {customer.phone}
					</li>
				</ul>
			</section>

			<section className="reviews-section border-gray-200 border-t pt-6">
				<h2 className="mb-4 font-semibold text-2xl text-gray-800">
					Share Your Feedback
				</h2>
				<p className="text-gray-600">
					We value your input. Visit the product pages to leave reviews and help
					us improve.
				</p>
				{/* Optional: Add button/link to product reviews here */}
			</section>
		</div>
	);
}
