import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
	"relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full font-medium text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"bg-teal text-white outline-white hover:bg-navy-darkest hover:outline-navy-darkest focus-visible:ring-blue-500",
				destructive:
					"bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-500",
				outline:
					"border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-400 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800",
				secondary:
					"bg-navy-darkest text-white hover:bg-white hover:text-navy-darkest",
				ghost:
					"bg-transparent text-navy-darkest hover:bg-gray-100 hover:text-teal focus-visible:ring-gray-400 dark:text-white dark:hover:bg-gray-800",
				link: "text-blue-600 underline-offset-4 hover:underline",
				plain: "bg-transparent text-navy-darkest hover:text-teal",
			},
			size: {
				default: "px-4 py-2",
				sm: "px-3 text-sm",
				lg: "px-6 text-base",
				icon: "p-2",
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
	loading = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
		loading?: boolean;
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
