import { ChevronRightIcon, HomeIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";
import { useBreadcrumbs } from "~/hooks";
import { cn } from "~/utils";

export const Breadcrumb = ({ className }: { className?: string }) => {
	const items = useBreadcrumbs();

	if (items.length === 0) {
		return null;
	}

	return (
		<nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
			<ol className="flex items-center space-x-2 text-gray-500 text-sm">
				{items.map((item, index) => {
					const isLast = index === items.length - 1;

					return (
						<li key={item.path} className="flex items-center">
							{index === 0 && item.path === "/" ? (
								<Link
									to={item.path}
									className="flex items-center text-gray-400 hover:text-teal"
									aria-label="Go to home page"
								>
									<HomeIcon className="h-4 w-4" />
								</Link>
							) : isLast ? (
								<span className="font-medium text-gray-900" aria-current="page">
									{item.label}
								</span>
							) : (
								<Link
									to={item.path}
									className="transition-colors hover:text-teal"
								>
									{item.label}
								</Link>
							)}

							{!isLast && (
								<ChevronRightIcon className="mx-2 h-4 w-4 text-gray-400" />
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
};
