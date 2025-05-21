import {
	CheckIcon,
	ExclamationTriangleIcon,
	InformationCircleIcon,
	XMarkIcon,
} from "@heroicons/react/16/solid";
import { type ToastType, useToast } from "~/contexts";
import { cn } from "~/lib/utils";
import { Button } from "./button";

const toastIconMap: Record<ToastType, React.JSX.Element> = {
	success: <CheckIcon className="h-5 w-5" aria-hidden="true" />,
	error: <ExclamationTriangleIcon className="h-5 w-5" aria-hidden="true" />,
	info: <InformationCircleIcon className="h-5 w-5" aria-hidden="true" />,
};

const toastColorMap: Record<ToastType, string> = {
	success: "bg-teal-600",
	error: "bg-red-600",
	info: "bg-gray-800",
};

export const ToastContainer = () => {
	const { toasts, removeToast } = useToast();

	return (
		<ul
			aria-live="polite"
			className="fixed top-4 right-4 z-50 flex max-w-sm flex-col space-y-2"
		>
			{toasts.map((toast) => (
				<li key={toast.id}>
					<div
						role="alert"
						className={cn(
							"flex max-w-md items-start gap-4 rounded-md px-6 py-3 text-white shadow-lg transition duration-300 ease-in-out",
							"hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
							"slide-in-from-right zoom-in-5 fade-in animate-in",
							toastColorMap[toast.type],
						)}
					>
						{/* Icon */}
						<div className="pt-0.5">{toastIconMap[toast.type]}</div>

						{/* Message */}
						<div className="flex-1 text-sm leading-5">{toast.message}</div>

						{/* Dismiss button */}
						<Button
							variant="plain"
							size="icon"
							className="p-0"
							onClick={() => removeToast(toast.id)}
						>
							<XMarkIcon className="size-5 text-white" aria-hidden="true" />
						</Button>
					</div>
				</li>
			))}
		</ul>
	);
};
