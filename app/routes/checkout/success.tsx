import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { useEffect } from "react";
import { Link } from "react-router";
import { Button } from "~/components";
import { useCart } from "~/hooks";

export const meta = () => [
	{ title: "Payment Successful | Climate Dry" },
	{
		name: "description",
		content: "Your payment was successful. Thank you for your order.",
	},
];

export default function CheckoutSuccess() {
	const { invalidateCart } = useCart();

	useEffect(() => {
		invalidateCart();
	}, [invalidateCart]);

	return (
		<div className="mx-auto max-w-2xl px-4 py-12">
			{/* Success header */}
			<div className="mb-8 flex flex-col items-center gap-4 text-center">
				<CheckCircleIcon className="h-14 w-14 text-green" />
				<h1 className="font-bold text-3xl text-navy-darkest">
					Payment Successful
				</h1>
				<p className="text-base text-gray-dark">
					Your order has been confirmed and is being processed.
				</p>
			</div>

			{/* Next steps */}
			<div className="mb-8 rounded-xl border border-gray-lightest bg-white p-6 shadow-sm">
				<h2 className="mb-3 font-bold text-lg text-navy-darkest">Next Steps</h2>
				<ul className="space-y-2 text-gray-dark text-sm">
					<li>Confirmation email with order details will be sent shortly.</li>
					<li>Order will be processed within 1–2 business days.</li>
					<li>Delivery typically takes 3–5 business days after processing.</li>
					<li>Keep your order number for reference.</li>
					<li>
						Questions? Call us at{" "}
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

			{/* Continue shopping button */}
			<div className="flex justify-center">
				<Button as={Link} to="/" variant="default" className="w-full sm:w-auto">
					Continue Shopping
				</Button>
			</div>
		</div>
	);
}
