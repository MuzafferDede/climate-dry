import { cn } from "~/utils";

export const StockStatus = ({ inStock }: { inStock: boolean }) => (
	<span className="flex items-center justify-end gap-2 text-xs">
		<span
			className={cn("size-3 rounded-full", inStock ? "bg-green" : "bg-red")}
		/>
		{inStock ? "In Stock" : "Out of Stock"}
	</span>
);
