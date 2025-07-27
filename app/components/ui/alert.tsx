import {
	InformationCircleIcon,
	LightBulbIcon,
	XCircleIcon,
} from "@heroicons/react/16/solid";
import { cn } from "~/utils";

type AlertProps = {
	variant?: "info" | "danger" | "note";
	title?: string;
	children: React.ReactNode;
};

const VARIANTS = {
	info: {
		bg: "bg-gray-lightest",
		text: "text-teal",
		border: "border-teal",
		Icon: InformationCircleIcon,
	},
	danger: {
		bg: "bg-white",
		text: "text-red",
		border: "border-red",
		Icon: XCircleIcon,
	},
	note: {
		bg: "bg-gray-lightest",
		text: "text-gray-darkest",
		border: "border-gray-darkest",
		Icon: LightBulbIcon,
	},
} as const;

export function Alert({ variant = "info", title, children }: AlertProps) {
	const { bg, text, border, Icon } = VARIANTS[variant];

	return (
		<div
			role="alert"
			className={cn(
				"flex items-start gap-2 rounded border-l-4 p-2 text-left font-semibold text-sm shadow",
				bg,
				text,
				border,
			)}
		>
			<Icon className="size-8 flex-shrink-0" aria-hidden="true" />
			<div className="py-1.5">
				{title && <strong className="mb-1 block font-semibold">{title}</strong>}
				<div>{children}</div>
			</div>
		</div>
	);
}
