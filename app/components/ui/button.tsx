import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";
import { cn } from "~/utils";
import { Loading } from "./loading";

// --- cva config ---
const buttonVariants = cva(
	"relative inline-flex transform cursor-pointer items-center justify-between whitespace-nowrap rounded-full font-medium text-sm transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				none: "",
				default: "hover:white bg-teal text-white hover:bg-navy-darkest",
				outline:
					"border border-current text-navy-darkest hover:text-gray-lighter",
				secondary:
					"bg-navy-darkest text-white hover:bg-gray-lightest hover:text-navy-darkest",
				ghost:
					"bg-transparent text-navy-darkest hover:bg-gray-lightest hover:text-teal",
				destructive: "bg-red text-white hover:bg-navy-darkest hover:text-white",
				link: "hover:text-teal hover:underline",
				plain: "text-navy-darkest hover:text-teal",
			},
			size: {
				none: "",
				default: "gap-2 px-4 py-2 has-[*:nth-child(2)]:pr-2",
				icon: "p-2",
				sm: "gap-1.5 py-3 text-sm",
				lg: "gap-2 py-4 text-base",
			},
			iconPosition: {
				left: "flex-row-reverse",
				right: "flex-row",
			},
			animation: {
				none: "",
				zoom: "hover:scale-110",
				rotate: "hover:rotate-180",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			iconPosition: "right",
			animation: "none",
		},
	},
);

// --- polymorphic type helper ---
type PolymorphicComponentProps<
	T extends React.ElementType,
	Props = unknown,
> = Props &
	Omit<React.ComponentPropsWithoutRef<T>, keyof Props> & {
		as?: T;
	};

// --- Button props ---
type ButtonOwnProps = VariantProps<typeof buttonVariants> & {
	loading?: boolean;
	icon?: React.ReactNode;
	className?: string;
};

type ButtonProps<T extends React.ElementType = "button"> =
	PolymorphicComponentProps<T, ButtonOwnProps>;

// --- component ---
function Button<T extends React.ElementType = "button">({
	as,
	className,
	variant,
	size,
	iconPosition,
	animation,
	loading = false,
	icon,
	children,
	...props
}: ButtonProps<T>) {
	const Component = as || "button";

	const computedIcon = loading ? <Loading className="size-6 p-1" /> : icon;

	return (
		<Component
			className={cn(
				buttonVariants({ variant, size, iconPosition, animation }),
				className,
			)}
			{...props}
		>
			{children}
			{computedIcon && <span>{computedIcon}</span>}
		</Component>
	);
}

export { Button, buttonVariants };
