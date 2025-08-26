import { ChevronRightIcon, HomeIcon } from "@heroicons/react/16/solid";
import { useMemo } from "react";
import { Link, useRouteLoaderData } from "react-router";
import { useBreadcrumbs } from "~/hooks";
import type { loader } from "~/root";
import { cn } from "~/utils";

export const Breadcrumb = ({ className }: { className?: string }) => {
	const items = useBreadcrumbs();
	const root = useRouteLoaderData<typeof loader>("root");

	const url = root?.url;

	if (items.length === 0) {
		return null;
	}

	const jsonLd = useMemo(() => {
		return {
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: items.map((item, index) => ({
				"@type": "ListItem",
				position: index + 1,
				name: item.label,
				item: `${url?.origin}${item.path}`.replace(/\/$/, ""),
			})),
		};
	}, [items, url]);

	return (
		<>
			<nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
				<ol className="flex items-center space-x-2 text-navy-darkest/70 text-sm">
					{items.map((item, index) => {
						const isLast = index === items.length - 1;

						return (
							<li key={item.path} className="flex items-center">
								{index === 0 && item.path === "/" ? (
									<Link
										to={item.path}
										className="flex items-center text-navy-darkest/50 hover:text-teal"
										aria-label="Go to home page"
									>
										<HomeIcon className="h-6 w-6" />
									</Link>
								) : isLast ? (
									<span
										className="font-medium text-navy-darkest"
										aria-current="page"
									>
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
									<ChevronRightIcon className="mx-2 h-4 w-4 text-navy-darkest/50" />
								)}
							</li>
						);
					})}
				</ol>
			</nav>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
		</>
	);
};
