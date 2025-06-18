import { TrashIcon } from "@heroicons/react/16/solid";
import {
	Form,
	Link,
	data,
	href,
	useActionData,
	useRouteLoaderData,
} from "react-router";
import { Button, Image, Input } from "~/components";
import {
	applyDiscount,
	commitSession,
	getSession,
	putToast,
	removeCartItem,
	updateCartItem,
} from "~/services";
import { type Cart, ToastType } from "~/types";
import { currency } from "~/utils";
import type { Route } from "../cart/+types";

export function meta() {
	return [
		{ title: "My Cart | Climate Dry" },
		{
			name: "description",
			content: "Review your shopping cart at Climate Dry",
		},
	];
}

export async function action({ request }: Route.ActionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const formData = await request.formData();
	const action = formData.get("_action");

	try {
		switch (action) {
			case "delete":
				await removeCartItem(request, formData);
				putToast(session, {
					message: "Item removed from cart",
					type: ToastType.Success,
				});
				break;
			case "discount":
				try {
					await applyDiscount(request, formData);
					putToast(session, {
						message: "Discount code applied",
						type: ToastType.Success,
					});
					return data(
						{ errors: null },
						{
							headers: {
								"Set-Cookie": await commitSession(session),
							},
						},
					);
				} catch (error) {
					putToast(session, {
						message:
							error instanceof Error ? error.message : "Invalid discount code",
						type: ToastType.Error,
					});
					return data(
						{
							errors: {
								discount:
									error instanceof Error
										? error.message
										: "Invalid discount code",
							},
						},
						{
							headers: {
								"Set-Cookie": await commitSession(session),
							},
						},
					);
				}
			default:
				await updateCartItem(request, formData);
				putToast(session, {
					message: "Cart updated",
					type: ToastType.Success,
				});
		}

		return data(
			{ errors: null },
			{
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			},
		);
	} catch (error) {
		putToast(session, {
			message: error instanceof Error ? error.message : "An error occurred",
			type: ToastType.Error,
		});

		return data(
			{ errors: null },
			{
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			},
		);
	}
}

export default function () {
	const { cart } = useRouteLoaderData<{ cart: Cart }>("root") || {};
	const actionData = useActionData<{ errors?: { discount?: string } }>();

	const items = cart?.items || [];
	const {
		subtotal = 0,
		tax_amount = 0,
		discount_amount = 0,
		total = 0,
	} = cart?.totals || {};

	return (
		<div className="mx-auto max-w-7xl px-4 py-12">
			{/* Cart Header */}
			<div className="mb-8 flex items-center justify-between border-gray-100 border-b pb-6">
				<h1 className="font-bold text-2xl md:text-3xl">Shopping Cart</h1>
				<span className="rounded-full bg-gray-50 px-3 py-1 text-gray-600 text-sm">
					{items.length} items
				</span>
			</div>

			{/* Main Content */}
			<div className="flex flex-col gap-8 lg:flex-row">
				{/* Cart Items List */}
				<div className="w-full lg:w-2/3">
					<div className="rounded-xl bg-white p-4 shadow-sm md:p-6">
						<h2 className="mb-6 font-bold text-gray-900 text-xl">Cart Items</h2>
						{items.length === 0 ? (
							<div className="py-12 text-center">
								<p className="text-gray-500">Your cart is empty</p>
							</div>
						) : (
							<div className="space-y-4">
								{items.map((item) => (
									<div
										key={item.id}
										className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
									>
										{/* Product Info Row */}
										<div className="flex gap-4">
											<div className="flex-shrink-0">
												{item.variant.product.images?.[0]?.url ? (
													<Image
														src={item.variant.product.images[0].url}
														alt={item.variant.product.name}
														className="h-32 w-32 rounded-lg object-cover shadow-sm"
													/>
												) : (
													<div className="flex h-32 w-32 items-center justify-center rounded-lg bg-gray-50">
														<span className="text-gray-400">No image</span>
													</div>
												)}
											</div>
											<div className="min-w-0 flex-1">
												<h3 className="truncate font-semibold text-base text-gray-900 md:text-lg">
													{item.variant.product.name}
												</h3>
												<p className="text-gray-500 text-sm">
													{item.variant.sku}
												</p>
												{item.variant.attributes &&
													item.variant.attributes.length > 0 && (
														<div className="mt-1 flex flex-wrap gap-4">
															{item.variant.attributes.map((attr) => (
																<span
																	key={attr.id}
																	className="inline-flex items-center rounded-full bg-gray-50 py-1 font-medium text-gray-600 text-xs"
																>
																	{attr.name}: {attr.value}
																</span>
															))}
														</div>
													)}
												<div className="mt-2 flex items-center gap-2">
													<p className="font-bold text-base text-gray-900 md:text-lg">
														{currency(item.totals.total)}
													</p>
												</div>
											</div>
											<Form
												method="post"
												onSubmit={(e) => {
													if (
														!confirm(
															"Are you sure you want to remove this item from your cart?",
														)
													) {
														e.preventDefault();
													}
												}}
											>
												<input type="hidden" name="id" value={item.id} />
												<input type="hidden" name="_action" value="delete" />
												<Button
													type="submit"
													variant="ghost"
													size="icon"
													title="Remove item"
													icon={<TrashIcon className="size-5" />}
												/>
											</Form>
										</div>

										{/* Controls Row */}
										<div className="flex flex-col gap-3 border-gray-100 border-t pt-4 md:flex-row md:items-center md:justify-between">
											<Form
												method="post"
												className="flex flex-col gap-4 md:flex-row md:items-center"
											>
												<input type="hidden" name="id" value={item.id} />
												<div className="flex items-center gap-3">
													<label
														htmlFor="quantity"
														className="font-medium text-gray-700 text-sm"
													>
														Quantity
													</label>
													<select
														id="quantity"
														name="quantity"
														value={item.quantity}
														onChange={(e) => e.target.form?.requestSubmit()}
														className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
													>
														{[1, 2, 3, 4, 5].map((num) => (
															<option key={num} value={num}>
																{num}
															</option>
														))}
													</select>
												</div>
												<div className="flex items-center gap-3">
													<label
														htmlFor="shipping_method"
														className="font-medium text-gray-700 text-sm"
													>
														Shipping
													</label>
													<select
														id="shipping_method"
														defaultValue={item.shipping_method}
														onChange={(e) => e.target.form?.requestSubmit()}
														name="shipping_method"
														className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
													>
														{item.shipping_methods.free_shipping && (
															<option value="free">Free Shipping</option>
														)}
														{item.shipping_methods.standard_shipping_cost >
															0 && (
															<option value="standard">
																Standard (
																{currency(
																	item.shipping_methods.standard_shipping_cost,
																)}
																)
															</option>
														)}
														{item.shipping_methods.premium_shipping_cost >
															0 && (
															<option value="premium">
																Premium (
																{currency(
																	item.shipping_methods.premium_shipping_cost,
																)}
																)
															</option>
														)}
													</select>
												</div>
											</Form>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Cart Summary */}
				{items.length > 0 && (
					<div className="w-full lg:w-1/3">
						<div className="sticky top-8 rounded-xl bg-white p-6 shadow-sm">
							<h2 className="mb-6 font-bold text-gray-900 text-xl">
								Cart Summary
							</h2>
							<div className="space-y-4">
								{/* Discount Code Form */}
								<Form method="post" className="flex items-start gap-2">
									<Input
										name="code"
										placeholder="Enter discount code"
										className="flex-1"
										error={actionData?.errors?.discount}
										disabled={Boolean(discount_amount)}
									/>
									<Button
										name="_action"
										value="discount"
										type="submit"
										variant={discount_amount ? "destructive" : "default"}
									>
										{discount_amount ? "Remove" : "Apply"}
									</Button>
								</Form>

								<div className="rounded-lg border border-gray-100 p-4">
									<div className="space-y-2">
										<div className="flex items-center justify-between text-sm">
											<span className="text-gray-600">Subtotal</span>
											<span className="font-medium text-gray-900">
												{currency(subtotal)}
											</span>
										</div>
										<div className="flex items-center justify-between text-sm">
											<span className="text-gray-600">Tax</span>
											<span className="font-medium text-gray-900">
												{currency(tax_amount)}
											</span>
										</div>
										{discount_amount > 0 && (
											<div className="flex items-center justify-between text-sm">
												<span className="text-teal-600">Discount</span>
												<span className="font-medium text-teal-600">
													-{currency(discount_amount)}
												</span>
											</div>
										)}
										<div className="border-gray-100 border-t pt-2">
											<div className="flex items-center justify-between">
												<span className="font-medium text-gray-900">Total</span>
												<span className="font-bold text-gray-900">
													{currency(total)}
												</span>
											</div>
										</div>
									</div>
								</div>

								<Link to={href("/checkout")}>
									<Button className="mt-6 w-full justify-center py-3 text-base">
										Proceed to Checkout
									</Button>
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
