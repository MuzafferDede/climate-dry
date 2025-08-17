import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/16/solid";
import { useCallback } from "react";
import { NavLink, useSearchParams } from "react-router";
import { Button, Pagination, ProductCard, Select } from "~/components";
import type { ApiListResponse, Product } from "~/types";
import { cn } from "~/utils";

const sortByOptions = [
	{ label: "Best Selling", value: "sales_count" },
	{ label: "Best Rating", value: "averageRating" },
	{ label: "Most Popular", value: "most_popular" },
	{ label: "Price Low", value: "price-low" },
	{ label: "Price High", value: "price-high" },
];

export const ProductList = ({
	products,
}: { products: ApiListResponse<Product> }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const cardView = searchParams.get("view") === "card";
	const currentSort = searchParams.get("sort") || "price-low";

	const pagination =
		products.data.length > 0 && products.meta?.links
			? products.meta.links
			: null;

	// Helper to update search params without resetting scroll
	const updateSearchParam = useCallback(
		(key: string, value: string) => {
			const newParams = new URLSearchParams(searchParams);
			newParams.set(key, value);
			setSearchParams(newParams, { preventScrollReset: true });
		},
		[searchParams, setSearchParams],
	);

	// Handler for sort change
	const onSortChange = useCallback(
		(val: string) => {
			updateSearchParam("sort", val);
		},
		[updateSearchParam],
	);

	// Generate the "to" prop for the toggle view NavLink button
	const toggleViewTo = useCallback(() => {
		const newParams = new URLSearchParams(searchParams);
		newParams.set("view", cardView ? "grid" : "card");
		return `?${newParams.toString()}`;
	}, [cardView, searchParams]);

	// Toggle aria-label
	const toggleAriaLabel = cardView
		? "Switch to grid view"
		: "Switch to card view";

	// Toggle icon
	const toggleIcon = cardView ? (
		<Squares2X2Icon className="h-5 w-5" />
	) : (
		<ListBulletIcon className="h-5 w-5" />
	);

	return (
		<div className="@container scroll-mt-32 px-4" id="product-list">
			<div className="mb-4 flex items-center justify-end gap-4">
				<div className="flex w-full max-w-64 items-center gap-1">
					<label
						htmlFor="sort"
						className="block whitespace-nowrap text-gray text-xs"
					>
						Sort By:
					</label>
					<Select
						id="sort"
						name="sort"
						value={currentSort}
						options={sortByOptions}
						onChange={onSortChange}
					/>
				</div>
				<Button
					as={NavLink}
					to={toggleViewTo()}
					variant="secondary"
					size="icon"
					aria-label={toggleAriaLabel}
					icon={toggleIcon}
				/>
			</div>

			<div
				className={cn(
					"grid @min-2xl:grid-cols-2 @min-4xl:grid-cols-3 @min-6xl:grid-cols-4 @min-xl:grid-cols-1 grid-cols-1 gap-6",
					cardView && "grid-cols-1!",
				)}
			>
				{products.data.map((product) => (
					<ProductCard {...product} key={product.id} />
				))}
			</div>

			{pagination && <Pagination links={pagination} />}
		</div>
	);
};
