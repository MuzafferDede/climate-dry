import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
	"relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"bg-cyan-700 text-white hover:bg-cyan-600 focus-visible:ring-blue-500",
				destructive:
					"bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-500",
				outline:
					"border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-400 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800",
				secondary:
					"bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
				ghost:
					"bg-transparent text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-400 dark:text-white dark:hover:bg-gray-800",
				link: "text-blue-600 underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 px-3 text-sm",
				lg: "h-10 px-6 text-base",
				icon: "h-9 w-9 p-0",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	type = "button",
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			className={cn(buttonVariants({ variant, size }), className)}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
