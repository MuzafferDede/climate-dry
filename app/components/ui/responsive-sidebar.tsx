import { useState } from "react";
import { NavLink } from "react-router";
import { cn } from "~/utils";

export function ResponsiveSidebar({
	pages,
	segment,
}: { pages: { slug: string; name: string }[]; segment: string }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<aside className="col-span-full lg:col-span-1">
			<div className="space-y-6">
				{/* Toggle button for small screens */}
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className="w-full rounded-md border border-black bg-teal px-4 py-2 text-left font-semibold text-white shadow hover:bg-white hover:text-teal lg:hidden"
				>
					{isOpen ? "Hide Menu" : "Show Menu"}
				</button>

				{/* Collapsible menu on small, always visible on large */}
				<div
					className={cn(
						"flex-col self-start lg:grid lg:grid-cols-1",
						isOpen ? "flex" : "hidden lg:grid",
					)}
					role="tablist"
					aria-orientation="vertical"
				>
					{pages.map((link) => (
						<NavLink
							key={link.slug}
							to={`/${segment}/${link.slug}`}
							className={({ isActive }) =>
								cn(
									"w-full cursor-pointer border-black border-t px-3 py-2.5 text-left font-semibold outline-0 hover:text-teal data-selected:text-teal",
									isActive && "bg-gray-lightest font-bold text-teal",
								)
							}
						>
							{link.name}
						</NavLink>
					))}
					{segment === "pages" && (
						<NavLink
							key="accessories"
							to="/c/accessories"
							className={({ isActive }) =>
								cn(
									"w-full cursor-pointer border-black border-t px-3 py-2.5 text-left font-semibold outline-0 hover:text-teal data-selected:text-teal",
									isActive && "bg-gray-lightest font-bold text-teal",
								)
							}
						>
							Accessories and Parts
						</NavLink>
					)}
					{segment === "pages" && (
						<NavLink
							key="brands"
							to="/brands"
							className={({ isActive }) =>
								cn(
									"w-full cursor-pointer border-black border-t px-3 py-2.5 text-left font-semibold outline-0 hover:text-teal data-selected:text-teal",
									isActive && "bg-gray-lightest font-bold text-teal",
								)
							}
						>
							Brands
						</NavLink>
					)}
				</div>
			</div>
		</aside>
	);
}
