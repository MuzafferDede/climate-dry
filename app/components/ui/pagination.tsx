import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { NavLink, useSearchParams } from "react-router";

interface PaginationLink {
	url: string | null;
	label: string;
	active: boolean;
}

interface PaginationProps {
	links: PaginationLink[];
	perPageOptions?: number[];
	defaultPerPage?: number;
}

const renderLinkContent = (label: string) => {
	if (label.includes("Previous")) {
		return <ChevronLeftIcon className="inline h-5 w-5" />;
	}
	if (label.includes("Next")) {
		return <ChevronRightIcon className="inline h-5 w-5" />;
	}
	return label.replace(/&[^;]+;/g, "");
};

const getPageFromUrl = (url: string) => {
	const urlObj = new URL(url);
	return urlObj.searchParams.get("page") || "1";
};

export const Pagination = ({
	links,
	perPageOptions = [10, 20, 30, 50, 100],
	defaultPerPage = 20,
}: PaginationProps) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newParams = new URLSearchParams(searchParams);
		newParams.set(e.target.id, e.target.value);
		setSearchParams(newParams, { preventScrollReset: true });
	};

	const renderPaginationLink = (link: PaginationLink) => {
		// Disabled link (no URL)
		if (!link.url) {
			return (
				<span key={link.label} className="px-3 py-1 text-gray-light">
					{renderLinkContent(link.label)}
				</span>
			);
		}

		// Active page (not clickable)
		if (link.active) {
			return (
				<span key={link.label} className="rounded bg-teal px-3 py-1 text-white">
					{renderLinkContent(link.label)}
				</span>
			);
		}

		// Clickable page link
		const page = getPageFromUrl(link.url);
		const pagParams = new URLSearchParams(searchParams);

		// Clean up ?page=1
		if (page === "1") {
			pagParams.delete("page");
		} else {
			pagParams.set("page", page);
		}

		const queryString = pagParams.toString();
		const to = queryString ? `?${queryString}` : "";

		return (
			<NavLink
				key={link.label}
				to={to}
				preventScrollReset
				className="rounded bg-white px-3 py-1 text-gray-dark hover:bg-gray-lighter"
			>
				{renderLinkContent(link.label)}
			</NavLink>
		);
	};

	return (
		<div className="mt-8 flex justify-center gap-2">
			{links.map(renderPaginationLink)}

			<div className="flex items-center justify-center gap-2">
				<select
					id="per_page"
					name="per_page"
					className="rounded-lg border border-gray-lighter px-3 py-0.5 text-sm focus:border-gray-light focus:outline-none focus:ring-1 focus:ring-gray-light"
					onChange={handlePerPageChange}
					value={searchParams.get("per_page") || defaultPerPage.toString()}
				>
					{perPageOptions.map((num) => (
						<option key={num} value={num}>
							{num}
						</option>
					))}
				</select>
				<span className="text-gray-dark text-xs">per page</span>
			</div>
		</div>
	);
};
