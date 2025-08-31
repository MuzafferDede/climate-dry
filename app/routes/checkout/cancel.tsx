import { XCircleIcon } from "@heroicons/react/16/solid";
import { useEffect } from "react";
import { Link } from "react-router";
import { Button } from "~/components";
import { useCart } from "~/hooks";

export const meta = () => [
	{ title: "Payment Cancelled | Climate Dry" },
	{
		name: "description",
		content:
			"Your payment was cancelled. You can return to your cart and try again.",
	},
];

export default function CheckoutCancel() {
	const { invalidateCart } = useCart();

	useEffect(() => {
		invalidateCart();
	}, [invalidateCart]);

	return (
		<div className="mx-auto max-w-2xl px-4 py-12">
			{/* Cancel header */}
			<div className="mb-8 flex flex-col items-center gap-4 text-center">
				<XCircleIcon className="h-14 w-14 text-red" />
				<h1 className="font-bold text-3xl text-navy-darkest">
					Payment Cancelled
				</h1>
				<p className="text-base text-gray-dark">
					Your payment was not completed. Your cart items are still saved.
				</p>
			</div>

			{/* Next steps */}
			<div className="mb-8 rounded-xl border border-gray-lightest bg-white p-6 shadow-sm">
				<h2 className="mb-3 font-bold text-lg text-navy-darkest">Next Steps</h2>
				<p className="mb-4 text-gray-dark text-sm">
					Here’s what you can do to complete your purchase:
				</p>
				<ul className="space-y-2 text-gray-dark text-sm">
					<li>Return to your cart and try the payment again.</li>
					<li>Browse our products and add more items before checkout.</li>
					<li>
						Need help? Call us at{" "}
						<a
							href="tel:0808 196 6381"
							className="font-semibold text-teal hover:underline"
						>
							0808 196 6381
						</a>
						.
					</li>
				</ul>
			</div>

			{/* Action buttons */}
			<div className="mb-8 flex flex-col justify-center gap-3 sm:flex-row">
				<Button as={Link} to="/" variant="outline" className="w-full sm:w-auto">
					Continue Shopping
				</Button>
				<Button
					as={Link}
					to="/cart"
					variant="default"
					className="w-full sm:w-auto"
				>
					Return to Cart
				</Button>
			</div>

			{/* Tips / info */}
			<div className="rounded-xl border border-gray-lightest bg-white p-6 shadow-sm">
				<h2 className="mb-3 font-bold text-lg text-navy-darkest">
					Payment Tips
				</h2>
				<ul className="space-y-2 text-gray-dark text-sm">
					<li>Check that your card details are correct.</li>
					<li>Ensure you have sufficient funds.</li>
					<li>Try a different payment method if needed.</li>
					<li>Clear your browser cache and try again.</li>
				</ul>
			</div>
		</div>
	);
}
