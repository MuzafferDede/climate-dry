import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";
import { Button } from "~/components";

export const meta = () => [
	{ title: "Payment Successful | Climate Dry" },
	{
		name: "description",
		content:
			"Your payment was successful. Thank you for your order at Climate Dry.",
	},
];

export default function CheckoutSuccess() {
	return (
		<div className="mx-auto max-w-2xl px-4 py-12">
			<div className="mb-8 flex flex-col items-center gap-4 text-center">
				<CheckCircleIcon className="h-14 w-14 text-green" />
				<h1 className="font-bold text-3xl text-navy-darkest">
					Payment Successful!
				</h1>
				<p className="text-base text-gray-dark">
					Thank you for your purchase. Your order has been confirmed and is
					being processed.
				</p>
			</div>

			<div className="mb-8 rounded-xl border border-gray-lightest bg-white p-6 shadow-sm">
				<h2 className="mb-3 font-bold text-lg text-navy-darkest">
					What happens next?
				</h2>
				<ul className="space-y-2 text-left text-gray-dark text-sm">
					<li>
						<span className="font-semibold text-navy-darkest">
							Confirmation Email:
						</span>{" "}
						You'll receive a confirmation email with your order details within
						the next few minutes.
					</li>
					<li>
						<span className="font-semibold text-navy-darkest">
							Order Processing:
						</span>{" "}
						Our team will process your order and prepare it for shipping within
						1-2 business days.
					</li>
					<li>
						<span className="font-semibold text-navy-darkest">Need Help?</span>{" "}
						If you have any questions, call us at{" "}
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
				<Button as={Link} to="/" variant="default" className="w-full sm:w-auto">
					Continue Shopping
				</Button>
				<Button
					as={Link}
					to="/account"
					variant="outline"
					className="w-full sm:w-auto"
				>
					View My Orders
				</Button>
			</div>

			<div className="rounded-xl bg-gray-lightest p-6">
				<h3 className="mb-2 font-semibold text-navy-darkest">
					Important Information
				</h3>
				<ul className="space-y-1 text-gray-dark text-sm">
					<li>Your order confirmation has been sent to your email address</li>
					<li>Please keep your order number for future reference</li>
					<li>Delivery typically takes 3-5 business days</li>
					<li>You can track your order status in your account</li>
				</ul>
			</div>
		</div>
	);
}
