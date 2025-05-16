import type { FC } from "react";

interface FooterProps {
	className?: string;
}

export const Footer: FC<FooterProps> = ({ className }) => {
	return (
		<footer className={`w-full bg-gray-900 py-12 ${className || ""}`}>
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
					{/* Logo and mission */}
					<div className="col-span-1">
						<div className="mb-4 h-12 w-24 rounded bg-teal-700" />
						<div className="h-20 w-full rounded bg-gray-700" />
					</div>

					{/* Footer links columns */}
					<div className="col-span-1">
						<div className="mb-3 h-8 w-24 rounded bg-gray-700" />
						<div className="space-y-2">
							<div className="h-6 w-32 rounded bg-gray-800" />
							<div className="h-6 w-28 rounded bg-gray-800" />
							<div className="h-6 w-36 rounded bg-gray-800" />
						</div>
					</div>

					<div className="col-span-1">
						<div className="mb-3 h-8 w-24 rounded bg-gray-700" />
						<div className="space-y-2">
							<div className="h-6 w-32 rounded bg-gray-800" />
							<div className="h-6 w-40 rounded bg-gray-800" />
							<div className="h-6 w-28 rounded bg-gray-800" />
						</div>
					</div>

					<div className="col-span-1">
						<div className="mb-3 h-8 w-32 rounded bg-gray-700" />
						<div className="h-32 w-full rounded bg-gray-800" />
					</div>
				</div>

				{/* Bottom row with copyright and social media */}
				<div className="mt-12 flex flex-col items-center justify-between border-gray-800 border-t pt-6 md:flex-row">
					<div className="h-6 w-48 rounded bg-gray-800" />
					<div className="mt-4 flex space-x-4 md:mt-0">
						<div className="h-10 w-10 rounded-full bg-gray-700" />
						<div className="h-10 w-10 rounded-full bg-gray-700" />
						<div className="h-10 w-10 rounded-full bg-gray-700" />
					</div>
				</div>
			</div>
		</footer>
	);
};
