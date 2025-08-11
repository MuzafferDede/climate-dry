import { XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { cn } from "~/utils";
import { ContactUsForm } from "./form";

export const ContactUsWidget = () => {
	const [open, setOpen] = useState(false);
	return (
		<div
			className={cn(
				"fixed inset-0 right-0 z-30 flex md:left-auto",
				"transition-transform duration-300 ease-in-out",
				open ? "z-40 translate-x-0" : "right-8 translate-x-full",
			)}
		>
			<div
				className={cn(
					"mt-auto flex w-full items-start md:my-auto md:h-auto md:w-96 md:max-w-md",
					open && "h-full",
				)}
			>
				<button
					onClick={() => setOpen(!open)}
					type="button"
					className={cn(
						"cursor-pointer rounded-l-lg bg-teal/70 px-10 py-2 text-white [writing-mode:vertical-lr] hover:bg-teal md:mt-auto",
						open && "m-0 bg-teal md:my-0",
					)}
				>
					Contact Us
				</button>
				<div
					className={cn(
						"h-full max-h-screen w-full overflow-y-auto rounded-bl-lg bg-white p-4 shadow-lg md:h-auto md:w-96 md:pb-6",
						open && "pb-32",
					)}
				>
					<div className="flex items-start justify-between gap-4">
						<h2 className="mb-4 font-semibold text-xl">Contact Us</h2>
						<button
							type="button"
							onClick={() => setOpen(false)}
							className="text-gray hover:text-gray-dark"
							aria-label="Open contact us form"
						>
							<XMarkIcon className="h-6 w-6" />
						</button>
					</div>
					<ContactUsForm />
				</div>
			</div>
		</div>
	);
};
