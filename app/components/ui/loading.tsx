import { ArrowPathIcon } from "@heroicons/react/16/solid";
import type { SVGProps } from "react";
import { cn } from "~/utils";

export const Loading = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
	return (
		<ArrowPathIcon
			className={cn("h-4 w-4 animate-spin text-current", className)}
			{...props}
		/>
	);
};
