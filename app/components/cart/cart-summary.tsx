import type React from "react";
import type { Cart } from "~/types";
import { currency } from "~/utils";

interface CartSummaryProps {
	cart: Cart | undefined;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ cart }) => {
	const items = cart?.items || [];
	return (
		<div className="rounded-xl bg-gray-lightest p-2 shadow-sm lg:p-6">
			<h2 className="mb-3 font-bold text-navy-darkest text-xl">Cart Summary</h2>
			<div className="space-y-4">
				<div className="rounded-lg border border-gray-lightest bg-white p-4">
					<div className="space-y-2">
						<div className="flex items-center justify-between text-sm">
							<span className="text-gray-dark">Items</span>
							<span className="font-medium text-navy-darkest">
								{items.length}
							</span>
						</div>
						<div className="flex items-center justify-between text-sm">
							<span className="text-gray-dark">Subtotal</span>
							<span className="font-medium text-navy-darkest">
								{currency(cart?.totals.pre_tax_subtotal ?? 0)}
							</span>
						</div>
						{(cart?.totals.total_items_discount ?? 0) > 0 && (
							<div className="flex items-center justify-between text-sm">
								<span className="font-semibold text-red">Item Discounts</span>
								<span className="font-medium text-red">
									-{currency(cart?.totals.total_items_discount ?? 0)}
								</span>
							</div>
						)}
						{(cart?.totals.discount_amount ?? 0) > 0 && (
							<div className="flex items-center justify-between text-sm">
								<span className="font-semibold text-red">Coupon</span>
								<span className="font-medium text-red">
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
								<span className="font-bold text-navy-darkest">Total</span>
								<span className="font-bold text-lg text-teal">
									{currency(cart?.totals.total ?? 0)}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
