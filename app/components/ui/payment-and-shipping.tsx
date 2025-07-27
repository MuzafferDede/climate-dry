import {
	BanknotesIcon,
	GiftTopIcon,
	TruckIcon,
} from "@heroicons/react/16/solid";
import type React from "react";
import { cn } from "~/utils";

interface PaymentAndShippingProps {
	premiumShipping?: boolean;
	freeShipping?: boolean;
	className?: string;
	size?: "xs" | "xxs";
}

export const PaymentAndShipping: React.FC<PaymentAndShippingProps> = ({
	premiumShipping = false,
	freeShipping = false,
	className = "",
}) => {
	return (
		<div
			className={cn(
				"flex w-full flex-col gap-2 rounded-lg bg-gray-lightest px-4 py-3",
				className,
			)}
		>
			<div className="flex items-center gap-3 text-navy-darkest text-xxs">
				<BanknotesIcon className="size-4" />
				<span>Pay in 3 interest-free payments</span>
			</div>
			{freeShipping && (
				<div className="flex items-center gap-3 text-navy-darkest text-xxs">
					<GiftTopIcon className="size-4" />
					<span>Free Shipping</span>
				</div>
			)}
			{premiumShipping && (
				<div className="flex items-center gap-3 text-navy-darkest text-xxs">
					<TruckIcon className="size-4" />
					<span>Rapid Delivery</span>
				</div>
			)}
		</div>
	);
};

export default PaymentAndShipping;
