import { Disclosure, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/16/solid";
import type React from "react";
import { Form, Link, href } from "react-router";
import { Image } from "~/components";
import type { CartItem as CartItemType } from "~/types";
import { currency } from "~/utils";

function getShippingCost(item: CartItemType) {
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
}

interface CartItemProps {
	cartItem: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ cartItem: item }) => {
	return (
		<div className="flex flex-col gap-4 rounded-lg border border-gray-lightest bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
			{/* Product Info Row */}
			<div className="flex flex-col gap-4 md:flex-row">
				<div className="w-full flex-shrink-0 md:w-auto">
					<Link to={href("/p/:slug", { slug: item.variant.product.slug })}>
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
							to={href("/p/:slug", { slug: item.variant.product.slug })}
							className="capitalize hover:text-teal"
						>
							<span>{item.variant.product.name}</span>
						</Link>
					</h3>
					<p className="flex gap-2 text-gray-dark text-sm">
						<span className="font-semibold text-teal">{item.variant.name}</span>
					</p>
					<p className="flex gap-2 text-gray-dark text-sm">
						<span className="text-gray">SKU: {item.variant.sku}</span>
					</p>
					{item.variant.attributes && item.variant.attributes.length > 0 && (
						<div className="mt-2 font-medium text-gray-dark text-xs">
							{item.variant.attributes.map((attr, idx) => (
								<span key={attr.id}>
									{attr.name}:{" "}
									<span className="font-semibold text-teal">{attr.value}</span>
									{idx < item.variant.attributes.length - 1 ? ", " : ""}
								</span>
							))}
						</div>
					)}
					{/* Price Breakdown Accordion */}
					<Disclosure>
						{({ open }) => (
							<div className="mt-3">
								<Disclosure.Button
									className={
										"flex w-full cursor-pointer items-center justify-between rounded-lg bg-gray-lightest px-4 py-2 font-bold text-lg text-navy-darkest hover:bg-gray-lightest focus:outline-none focus-visible:ring focus-visible:ring-teal/50"
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
																	{currency(item.variant.retail_price)}
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
															- {currency(item.totals.discount_amount ?? 0)}
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
													<td className="px-4 py-2 text-navy-darkest">Tax</td>
													<td className="px-4 py-2 text-right text-navy-darkest">
														{currency(item.totals?.tax_amount ?? 0)}
													</td>
												</tr>
												<tr className="border-gray-lighter border-b transition-colors odd:bg-white even:bg-gray-lightest hover:bg-teal/10">
													<td className="px-4 py-2 text-navy-darkest">
														Shipping
													</td>
													<td className="px-4 py-2 text-right text-navy-darkest">
														{currency(getShippingCost(item) * item.quantity)}
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
							<option value="free" className="font-semibold text-green">
								Free Shipping
							</option>
						)}
						{item.shipping_methods.standard_shipping_cost > 0 && (
							<option value="standard">
								Standard (
								{currency(item.shipping_methods.standard_shipping_cost)})
							</option>
						)}
						{item.shipping_methods.premium_shipping_cost > 0 && (
							<option value="premium">
								Premium ({currency(item.shipping_methods.premium_shipping_cost)}
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
					aria-label="Delete cart item"
				>
					<TrashIcon className="size-5 text-navy-darkest hover:text-navy-darkest/50" />
				</button>
			</Form>
		</div>
	);
};
