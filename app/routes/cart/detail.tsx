import { Disclosure, DisclosurePanel } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/16/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
	Form,
	Link,
	data,
	href,
	useActionData,
	useRouteLoaderData,
} from "react-router";
import { Button, Input } from "~/components";
import { Image } from "~/components";
import {
	applyDiscount,
	commitSession,
	getSession,
	putToast,
	removeCartItem,
	updateCartItem,
} from "~/services";
import { type Cart, type CartItem, ToastType } from "~/types";
import { currency } from "~/utils";
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

// Helper function for shipping cost
const getShippingCost = (item: CartItem) => {
	switch (item.shipping_method) {
		case "free":
			return 0;
		case "standard":
			return item.shipping_methods.standard_shipping_cost ?? 0;
		case "premium":
			return item.shipping_methods.premium_shipping_cost ?? 0;
		default:
			return 0;
	}
};

export default function () {
	const { cart } = useRouteLoaderData<{ cart: Cart }>("root") || {};
	const actionData = useActionData<{ errors?: { discount?: string } }>();

	const items = cart?.items || [];

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
									<div
										key={item.id}
										className="flex flex-col gap-4 rounded-lg border border-gray-lightest bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
									>
										{/* Product Info Row */}
										<div className="flex flex-col gap-4 md:flex-row">
											<div className="w-full flex-shrink-0 md:w-auto">
												<Link
													to={href("/product/:slug", {
														slug: item.variant.product.slug,
													})}
												>
													{item.variant.product.images?.[0]?.url ? (
														<Image
															src={item.variant.product.images[0].url}
															alt={item.variant.name}
															className="h-32 w-full rounded-lg object-cover shadow-sm md:h-32 md:w-32"
														/>
													) : (
														<div className="flex h-32 w-full items-center justify-center rounded-lg bg-gray-lightest md:h-32 md:w-32">
															<span className="text-gray-light">No image</span>
														</div>
													)}
												</Link>
											</div>
											<div className="w-full min-w-0 flex-1">
												<h3 className="truncate font-bold text-base text-navy-darkest md:text-lg">
													<Link
														to={href("/product/:slug", {
															slug: item.variant.product.slug,
														})}
														className="capitalize hover:text-teal"
													>
														<span>{item.variant.name}</span>
													</Link>
												</h3>
												<p className="flex gap-2 text-gray-dark text-sm">
													<span className="font-semibold text-teal">
														{item.variant.name}
													</span>
													<span className="text-gray">{item.variant.sku}</span>
												</p>
												{item.variant.attributes &&
													item.variant.attributes.length > 0 && (
														<div className="mt-2 font-medium text-gray-dark text-xs">
															{item.variant.attributes.map((attr, idx) => (
																<span key={attr.id}>
																	{attr.name}:{" "}
																	<span className="font-semibold text-teal">
																		{attr.value}
																	</span>
																	{idx < item.variant.attributes.length - 1
																		? ", "
																		: ""}
																</span>
															))}
														</div>
													)}
												{/* Price Breakdown Accordion (stacked, full width) */}
												<Disclosure>
													{({ open }) => (
														<div className="mt-3">
															<Disclosure.Button
																className={
																	"flex w-full cursor-pointer items-center justify-between rounded-lg bg-gray-lightest px-4 py-2 font-bold text-lg text-navy-darkest hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-teal/50"
																}
															>
																<span>{currency(item.totals.total)}</span>
																<ChevronDownIcon
																	className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
																/>
															</Disclosure.Button>
															<DisclosurePanel className="block w-full pt-2">
																<div className="block w-full overflow-hidden rounded-lg border border-gray-lightest bg-gray-50 p-0 shadow-sm">
																	<table className="w-full min-w-full border-teal border-l-4 text-sm">
																		<tbody>
																			<tr className="border-gray-lighter border-b transition-colors odd:bg-white even:bg-gray-lightest hover:bg-teal/10">
																				<td className="px-4 py-2 text-navy-darkest">
																					Unit Price
																				</td>
																				<td className="px-4 py-2 text-right font-semibold text-navy-darkest">
																					{currency(item.variant.price ?? 0)}
																					{item.variant.retail_price &&
																						item.variant.retail_price >
																							(item.variant.price ?? 0) && (
																							<span className="ml-2 text-gray-light line-through">
																								{currency(
																									item.variant.retail_price,
																								)}
																							</span>
																						)}
																				</td>
																			</tr>
																			<tr className="border-gray-lighter border-b transition-colors odd:bg-white even:bg-gray-lightest hover:bg-teal/10">
																				<td className="px-4 py-2 text-navy-darkest">
																					Quantity
																				</td>
																				<td className="px-4 py-2 text-right text-navy-darkest">
																					{item.quantity}
																				</td>
																			</tr>
																			{item.totals?.discount_amount > 0 && (
																				<tr className="border-gray-lighter border-b transition-colors odd:bg-white even:bg-gray-lightest hover:bg-teal/10">
																					<td className="px-4 py-2 text-navy-darkest">
																						Item Discount
																					</td>
																					<td className="px-4 py-2 text-right font-semibold text-red">
																						-{" "}
																						{currency(
																							item.totals.discount_amount ?? 0,
																						)}
																					</td>
																				</tr>
																			)}
																			<tr className="border-gray-lighter border-b transition-colors odd:bg-white even:bg-gray-lightest hover:bg-teal/10">
																				<td className="px-4 py-2 text-navy-darkest">
																					Item Subtotal
																				</td>
																				<td className="px-4 py-2 text-right text-navy-darkest">
																					{currency(item.totals?.subtotal ?? 0)}
																				</td>
																			</tr>
																			<tr className="border-gray-lighter border-b transition-colors odd:bg-white even:bg-gray-lightest hover:bg-teal/10">
																				<td className="px-4 py-2 text-navy-darkest">
																					Tax
																				</td>
																				<td className="px-4 py-2 text-right text-navy-darkest">
																					{currency(
																						item.totals?.tax_amount ?? 0,
																					)}
																				</td>
																			</tr>
																			<tr className="border-gray-lighter border-b transition-colors odd:bg-white even:bg-gray-lightest hover:bg-teal/10">
																				<td className="px-4 py-2 text-navy-darkest">
																					Shipping
																				</td>
																				<td className="px-4 py-2 text-right text-navy-darkest">
																					{currency(
																						getShippingCost(item) *
																							item.quantity,
																					)}
																				</td>
																			</tr>
																			<tr className="border-gray-lighter border-b transition-colors odd:bg-white even:bg-gray-lightest hover:bg-teal/10">
																				<td className="border-gray-lightest border-t border-b bg-blue-lighter px-4 py-2 font-bold text-base text-navy-darkest">
																					Total
																				</td>
																				<td className="border-gray-lightest border-t border-b bg-blue-lighter px-4 py-2 text-right font-bold text-base text-navy-darkest">
																					{currency(item.totals?.total ?? 0)}
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</div>
															</DisclosurePanel>
														</div>
													)}
												</Disclosure>
												{/* End Price Breakdown Accordion */}
											</div>
										</div>
										{/* Controls Row */}
										<Form
											method="post"
											className="flex w-full flex-col gap-3 border-gray-lightest border-t pt-4 md:flex-row md:items-center md:justify-between"
										>
											<input type="hidden" name="id" value={item.id} />
											<div className="flex items-center gap-3">
												<label
													htmlFor="quantity"
													className="font-medium text-gray-dark text-sm"
												>
													Quantity
												</label>
												<select
													id="quantity"
													name="quantity"
													value={item.quantity}
													onChange={(e) => e.target.form?.requestSubmit()}
													className="rounded-lg border border-gray-lighter px-3 py-1.5 text-sm focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
												>
													{Array.from({ length: 100 }, (_, i) => {
														const value = i + 1;
														return (
															<option key={`quantity-${value}`} value={value}>
																{value}
															</option>
														);
													})}
												</select>
											</div>
											<div className="flex items-center gap-3">
												<label
													htmlFor="shipping_method"
													className="font-medium text-gray-dark text-sm"
												>
													Shipping
												</label>
												<select
													id="shipping_method"
													name="shipping_method"
													value={item.shipping_method}
													onChange={(e) => e.target.form?.requestSubmit()}
													className="flex-1 rounded-lg border border-gray-lighter px-3 py-1.5 text-sm focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
												>
													{item.shipping_methods.free_shipping && (
														<option
															value="free"
															className="font-semibold text-green-600"
														>
															Free Shipping
														</option>
													)}
													{item.shipping_methods.standard_shipping_cost > 0 && (
														<option value="standard">
															Standard (
															{currency(
																item.shipping_methods.standard_shipping_cost,
															)}
															)
														</option>
													)}
													{item.shipping_methods.premium_shipping_cost > 0 && (
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
											{/* Delete Button at the end of the row */}
											<button
												type="submit"
												name="_action"
												value="delete"
												onClick={(e) => {
													if (
														!confirm(
															"Are you sure you want to remove this item from your cart?",
														)
													) {
														e.preventDefault();
													}
												}}
												className="ml-auto flex items-center border-gray-lightest border-l pl-4"
												title="Remove item"
											>
												<TrashIcon className="size-5 text-navy-darkest hover:text-navy-darkest/50" />
											</button>
										</Form>
									</div>
								))}
							</>
						)}
					</div>
				</div>

				{/* Cart Summary */}
				{items.length > 0 && (
					<div className="w-full lg:w-1/3">
						<div className="sticky top-32 rounded-xl bg-gray-lightest p-6 shadow-sm">
							<h2 className="mb-6 font-bold text-navy-darkest text-xl">
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
										disabled={Boolean(cart?.totals.discount_amount)}
									/>
									<Button
										name="_action"
										value="discount"
										type="submit"
										variant={
											cart?.totals.discount_amount ? "destructive" : "default"
										}
										className={
											cart?.totals.discount_amount
												? "bg-red-500 text-white hover:bg-red-600"
												: "bg-teal text-white hover:bg-teal-dark"
										}
									>
										{cart?.totals.discount_amount ? "Remove" : "Apply"}
									</Button>
								</Form>
								<div className="rounded-lg border border-gray-lightest bg-white p-4">
									<div className="space-y-2">
										<div className="flex items-center justify-between text-sm">
											<span className="text-gray-dark">Subtotal</span>
											<span className="font-medium text-navy-darkest">
												{currency(cart?.totals.pre_tax_subtotal ?? 0)}
											</span>
										</div>
										{(cart?.totals.discount_amount ?? 0) > 0 && (
											<div className="flex items-center justify-between text-sm">
												<span className="font-semibold text-red-500">
													Discount
												</span>
												<span className="font-medium text-red-500">
													-{currency(cart?.totals.discount_amount ?? 0)}
												</span>
											</div>
										)}
										<div className="flex items-center justify-between text-sm">
											<span className="text-gray-dark">Tax</span>
											<span className="font-medium text-navy-darkest">
												{currency(cart?.totals.tax_amount ?? 0)}
											</span>
										</div>
										<div className="flex items-center justify-between text-sm">
											<span className="text-gray-dark">Shipping</span>
											<span className="font-medium text-navy-darkest">
												{currency(cart?.totals.shipping_total ?? 0)}
											</span>
										</div>
										<div className="border-teal border-t pt-2">
											<div className="flex items-center justify-between">
												<span className="font-bold text-navy-darkest">
													Total
												</span>
												<span className="font-bold text-lg text-teal">
													{currency(cart?.totals.total ?? 0)}
												</span>
											</div>
										</div>
									</div>
								</div>
								<Link to={href("/checkout")}>
									<Button className="mt-6 w-full justify-center bg-teal py-3 font-bold text-base text-white hover:bg-teal-dark">
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
