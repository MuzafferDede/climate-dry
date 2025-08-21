import type { Variant } from "~/types";
import { calculateSave, currency } from "~/utils";

export const Price = ({ variant }: { variant: Variant }) => {
	return (
		<div className="relative isolate z-20 flex items-start justify-between gap-2">
			<div className="group relative flex cursor-pointer items-center justify-end gap-2 font-bold">
				<span className="flex flex-col items-start text-xl">
					<span>{currency(variant.price)}</span>
					<span className="font-normal text-gray text-xs">(ex VAT)</span>
				</span>

				<div className="absolute top-full right-0 hidden flex-col items-start rounded-lg bg-navy-darkest px-2 py-1 text-white shadow group-hover:flex">
					<span className="font-bold text-xs">Price for:</span>
					<span className="min-w-max font-semibold text-teal">
						{variant.sku}
					</span>
				</div>
			</div>
			{Boolean(variant.retail_price > variant.price) && (
				<div className="relative flex flex-col items-end border-gray-lightest border-l pl-2">
					<span className="font-semibold text-gray text-sm line-through">
						{currency(variant.retail_price)}
					</span>
					<span className="flex gap-2 font-bold text-red text-sm">
						<span>save</span>
						<span>{calculateSave(variant.price, variant.retail_price)}%</span>
					</span>
				</div>
			)}
		</div>
	);
};
