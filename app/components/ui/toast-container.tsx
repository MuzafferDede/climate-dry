import {
	CheckIcon,
	ExclamationTriangleIcon,
	InformationCircleIcon,
	XMarkIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Toast, ToastType } from "~/types";
import { cn } from "~/utils";
import { Button } from "./button";

interface Props {
	toast?: Toast;
}

export const TOAST_STYLES: Record<
	ToastType,
	{
		title: string;
		colorClass: string;
		icon: React.JSX.Element;
	}
> = {
	success: {
		title: "Success",
		colorClass: "bg-teal",
		icon: <CheckIcon className="h-6 w-6 text-white" />,
	},
	error: {
		title: "Error",
		colorClass: "bg-red",
		icon: <ExclamationTriangleIcon className="h-6 w-6 text-white" />,
	},
	info: {
		title: "Info",
		colorClass: "bg-gray",
		icon: <InformationCircleIcon className="h-6 w-6 text-white" />,
	},
};

export function ToastContainer({ toast }: Props) {
	const [visible, setVisible] = useState(Boolean(toast));

	useEffect(() => {
		setVisible(Boolean(toast));
		if (!toast) return;

		const timer = setTimeout(() => setVisible(false), 5000);
		return () => clearTimeout(timer);
	}, [toast]);

	if (!toast || !visible) return null;

	const { title, colorClass, icon } = TOAST_STYLES[toast.type];

	return (
		<div className="pointer-events-none fixed top-4 right-4 left-4 z-50 flex justify-center">
			<div
				role="alert"
				aria-live="polite"
				className={cn(
					"w-full max-w-md rounded-lg shadow-lg transition-opacity",
					"slide-in-from-top-20 fade-in animate-in text-white",
					colorClass,
				)}
			>
				<div className="pointer-events-auto relative flex items-start gap-3 p-4">
					<div className="shrink-0">{icon}</div>
					<div className="flex-1 space-y-1">
						<h2 className="font-bold text-base">{title}</h2>
						{toast.message && (
							<p className="font-bold text-sm">{toast.message}</p>
						)}
						{toast.action && (
							<Link
								to={toast.action.path}
								className="mt-2 inline-block rounded bg-black/20 px-3 py-1 font-medium text-sm text-white hover:bg-black/30"
								onClick={() => setVisible(false)}
							>
								{toast.action.label}
							</Link>
						)}
					</div>
					<Button
						type="button"
						variant="ghost"
						size="none"
						className="absolute top-2 right-2 rounded p-1 hover:bg-white/20"
						onClick={() => setVisible(false)}
						aria-label="Dismiss"
						icon={<XMarkIcon className="h-5 w-5 text-white" />}
					/>
				</div>
			</div>
		</div>
	);
}
