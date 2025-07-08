import { NavLink } from "react-router";
import { adviceHubNav } from "~/static";
import { cn } from "~/utils";

export const PageNavigation = () => {
	return (
		<div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 py-8 lg:grid-cols-6">
			{adviceHubNav.map(({ label, path }) => (
				<NavLink
					end
					key={path}
					to={path}
					className={({ isActive }) =>
						cn(
							"h-22 content-center rounded-lg bg-gray-lightest p-2 text-center font-bold text-sm uppercase hover:text-tea hover:text-teal",
							isActive && "bg-teal font-bold text-white",
						)
					}
				>
					{label}
				</NavLink>
			))}
		</div>
	);
};
