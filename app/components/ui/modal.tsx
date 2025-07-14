import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import type { ReactNode } from "react";

type ModalProps = {
	open: boolean;
	onClose?: () => void;
	children: ReactNode;
	title: string;
};

export const Modal: React.FC<ModalProps> = ({
	open,
	onClose = () => null,
	title,
	children,
}) => {
	return (
		<Dialog open={open} onClose={onClose} className="relative z-50">
			{/* Backdrop */}
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />

			{/* Modal wrapper */}
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<DialogPanel className="slide-in-from-top-10 w-full max-w-2xl animate-in rounded-lg bg-white shadow-xl">
					<div className="flex max-h-[80vh] flex-col">
						{/* Header */}
						{title && (
							<div className="flex items-center justify-between border-gray-lighter border-b px-6 py-4">
								<h3 className="font-semibold text-lg text-navy-darkest">
									{title}
								</h3>
								{onClose && (
									<button
										type="button"
										onClick={onClose}
										className="text-gray hover:text-gray-dark"
									>
										<XMarkIcon className="h-6 w-6" />
									</button>
								)}
							</div>
						)}

						{/* Scrollable content */}
						<div className="my-4 overflow-y-auto scroll-smooth px-6">
							{children}
						</div>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
};
