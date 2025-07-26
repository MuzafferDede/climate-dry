import { XCircleIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";
import { Button } from "~/components";

export const meta = () => [
	{ title: "Payment Cancelled | Climate Dry" },
	{
		name: "description",
		content:
			"Your payment was cancelled. You can return to your cart and try again.",
	},
];

export default function CheckoutCancel() {
	return (
		<div className="mx-auto max-w-2xl px-4 py-12">
			<div className="mb-8 flex flex-col items-center gap-4 text-center">
				<XCircleIcon className="h-14 w-14 text-red" />
				<h1 className="font-bold text-3xl text-navy-darkest">
					Payment Cancelled
				</h1>
				<p className="text-base text-gray-dark">
					Your payment was not completed. Don't worry, your cart items are still
					saved.
				</p>
			</div>

			<div className="mb-8 rounded-xl border border-gray-lightest bg-white p-6 shadow-sm">
				<h2 className="mb-3 font-bold text-lg text-navy-darkest">
					What can you do next?
				</h2>
				<ul className="space-y-2 text-left text-gray-dark text-sm">
					<li>
						<span className="font-semibold text-navy-darkest">
							Return to Cart:
						</span>{" "}
						Your items are still in your cart. You can review and try the
						payment again.
					</li>
					<li>
						<span className="font-semibold text-navy-darkest">
							Continue Shopping:
						</span>{" "}
						Browse our products and add more items to your cart before checkout.
					</li>
					<li>
						<span className="font-semibold text-navy-darkest">Need Help?</span>{" "}
						If you're having trouble, call us at{" "}
						<a
							href="tel:0808 196 6381"
							className="font-semibold text-teal hover:underline"
						>
							0808 196 6381
						</a>
					</li>
				</ul>
			</div>

			<div className="mb-8 flex flex-col justify-center gap-3 sm:flex-row">
				<Button
					as={Link}
					to="/cart"
					variant="default"
					className="w-full sm:w-auto"
				>
					Return to Cart
				</Button>
				<Button as={Link} to="/" variant="outline" className="w-full sm:w-auto">
					Continue Shopping
				</Button>
			</div>

			<div className="rounded-xl bg-gray-lightest p-6">
				<h3 className="mb-2 font-semibold text-navy-darkest">
					Common Payment Issues
				</h3>
				<ul className="space-y-1 text-gray-dark text-sm">
					<li>Check that your card details are correct</li>
					<li>Ensure you have sufficient funds in your account</li>
					<li>Try using a different payment method</li>
					<li>Clear your browser cache and try again</li>
				</ul>
			</div>
		</div>
	);
}
