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
				open ? "translate-x-0 " : "right-8 translate-x-full",
			)}
		>
			<div className="my-auto flex h-full w-full items-start md:h-auto md:w-96 md:max-w-md">
				<button
					onClick={() => setOpen(!open)}
					type="button"
					className={cn(
						"cursor-pointer rounded-l-lg bg-teal/70 px-10 py-2 text-white [writing-mode:vertical-lr] hover:bg-teal",
						open && "bg-teal",
					)}
				>
					Contact Us
				</button>
				<div className="h-full max-h-screen w-full overflow-y-auto rounded-bl-lg bg-white p-4 pb-32 shadow-lg md:h-auto md:w-96 md:pb-6">
					<div className="flex items-start justify-between gap-4">
						<h2 className="mb-4 font-semibold text-xl">Contact Us</h2>
						<button
							type="button"
							onClick={() => setOpen(false)}
							className="text-gray hover:text-gray-dark"
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
