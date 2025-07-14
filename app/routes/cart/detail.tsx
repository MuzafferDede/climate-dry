import { useState } from "react";
import { Form, data, useRouteLoaderData } from "react-router";
import {
	Button,
	CartItem,
	CartSummary,
	CheckoutFormWizard,
	Input,
} from "~/components";
import {
	applyDiscount,
	commitSession,
	getPaymentIntentSecret,
	getSession,
	putToast,
	removeCartItem,
	updateCartItem,
} from "~/services";
import { type Cart, ToastType } from "~/types";
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
];

export async function action({ request }: Route.ActionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const formData = await request.formData();
	const action = formData.get("_action");

	const respond = async (
		payload: Record<string, unknown> = { errors: null },
		options?: { message?: string; type?: ToastType },
	) => {
		if (options?.message) {
			putToast(session, {
				message: options.message,
				type: options.type ?? ToastType.Success,
			});
		}
		return data(payload, {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	};

	try {
		if (action === "delete") {
			await removeCartItem(request, formData);
			return respond(undefined, { message: "Item removed from cart" });
		}

		if (action === "checkout") {
			const result = await getPaymentIntentSecret(request, formData);
			return respond({ clientSecret: result.client_secret });
		}

		if (action === "discount") {
			try {
				await applyDiscount(request, formData);
				return respond(undefined, { message: "Discount code applied" });
			} catch (error) {
				const message =
					error instanceof Error ? error.message : "Invalid discount code";
				return respond(
					{ errors: { discount: message } },
					{ message, type: ToastType.Error },
				);
			}
		}

		// default: update cart item
		await updateCartItem(request, formData);
		return respond(undefined, { message: "Cart updated" });
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "An error occurred";
		return respond(undefined, { message, type: ToastType.Error });
	}
}

export default function ({ actionData }: Route.ComponentProps) {
	const { cart } = useRouteLoaderData<{ cart: Cart }>("root") || {};

	const clientSecret = actionData?.clientSecret ?? "";
	const errors = actionData?.errors ?? { discount: "" };

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
										error={errors?.discount}
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
