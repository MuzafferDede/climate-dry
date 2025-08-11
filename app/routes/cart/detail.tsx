import { useState } from "react";
import { Form, data, useRouteLoaderData } from "react-router";
import {
	addToCart,
	applyDiscount,
	buildHeaders,
	getPaymentIntentSecret,
	getSession,
	removeCartItem,
	updateCartItem,
} from "~/.server";
import {
	Button,
	CartItem,
	CartSummary,
	CheckoutFormWizard,
	Input,
} from "~/components";
import { type Cart, ToastType } from "~/types";
import { putToast } from "~/utils";
import type { Route } from "./+types/detail";

export const meta = () => [
	{ title: "My Cart | Climate Dry" },
	{
		name: "description",
		content: "Review your shopping cart at Climate Dry",
	},
	{
		name: "keywords",
		content: "cart, shopping cart, climate dry, checkout",
	},
	{
		name: "robots",
		content: "noindex",
	},
];

type Actions = "add" | "delete" | "discount" | "checkout" | "update";

const callables = {
	add: addToCart,
	delete: removeCartItem,
	discount: applyDiscount,
	checkout: getPaymentIntentSecret,
	update: updateCartItem,
};

export async function action({ request }: Route.ActionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const formData = await request.formData();
	const rawAction = formData.get("_action");
	const action =
		typeof rawAction === "string" && rawAction in callables
			? (rawAction as Actions)
			: "update";

	const callable = callables[action];

	const { response, error } = await callable(session, formData);

	if (error) {
		putToast(session, {
			message: error,
			type: ToastType.Error,
		});
	}

	return data(
		{ response, error },
		{
			headers: await buildHeaders(session),
		},
	);
}

export default function ({ actionData }: Route.ComponentProps) {
	const { cart } = useRouteLoaderData<{ cart: Cart }>("root") || {};
	const clientSecret = (actionData as { response: { client_secret: string } })
		?.response?.client_secret;

	const error = actionData?.error;

	const items = cart?.items || [];

	const [showCheckout, setShowCheckout] = useState(false);

	return (
		<div className="mx-auto max-w-7xl px-4 py-12">
			{/* Cart Header */}
			<div className="mb-8 flex items-center justify-between border-gray-lightest border-b pb-6">
				<h1 className="font-bold text-2xl text-navy-darkest md:text-3xl">
					Shopping Cart
				</h1>
				<span className="rounded-full bg-gray-lightest px-3 py-1 font-semibold text-sm text-teal">
					{items.length} items
				</span>
			</div>

			{/* Main Content */}
			<div className="flex flex-col gap-8 lg:flex-row">
				{/* Cart Items List */}
				<div className="w-full lg:w-2/3">
					<div className="rounded-xl bg-white p-4 shadow-gray-lighter shadow-sm ring-1 ring-gray-lighter md:p-6">
						<h2 className="mb-6 font-bold text-navy-darkest text-xl">
							Cart Items
						</h2>
						{items.length === 0 ? (
							<div className="py-12 text-center">
								<p className="text-gray-dark text-sm">Your cart is empty</p>
							</div>
						) : (
							<>
								{/* Cart Items */}
								{items.map((item) => (
									<CartItem key={item.id} cartItem={item} />
								))}
							</>
						)}
					</div>
				</div>

				{/* Cart Summary */}
				{items.length > 0 && (
					<div className="w-full lg:w-1/3">
						<div className="sticky top-32">
							<CartSummary cart={cart} />
							<div className="mt-4 space-y-4">
								{/* Discount Code Form and Checkout Button remain here */}
								<Form method="post" className="flex items-start gap-2">
									<Input
										name="code"
										placeholder="Enter discount code"
										className="peer flex-1"
										defaultValue={cart?.discount?.code}
										error={error}
										disabled={Boolean(cart?.totals.discount_amount)}
										required
									/>
									<Button
										name="_action"
										value="discount"
										type="submit"
										className="peer-invalid:hidden"
										variant={
											cart?.totals.discount_amount ? "destructive" : "default"
										}
									>
										{cart?.totals.discount_amount ? "Remove" : "Apply"}
									</Button>
								</Form>
								<Button
									type="button"
									onClick={() => setShowCheckout(true)}
									className="w-full justify-center"
								>
									Proceed to Checkout
								</Button>
								<CheckoutFormWizard
									open={showCheckout}
									onClose={() => setShowCheckout(false)}
									secret={clientSecret}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
