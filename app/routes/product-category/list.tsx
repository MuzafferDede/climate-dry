import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/16/solid";
import { NavLink, data, useLocation, useSearchParams } from "react-router";
import {
	addToCart,
	commitSession,
	getCategoryProducts,
	getProductCategory,
	getSession,
} from "~/.server";
import {
	Alert,
	Breadcrumb,
	Button,
	FilterComponents,
	Pagination,
	ProductCard,
	ProductCategoryCard,
	Select,
	Service,
} from "~/components";
import { type Product, ToastType } from "~/types";
import { cn, generateBreadcrumb, isNonEmptyArray, putToast } from "~/utils";
import type { Route } from "./+types/list";

export const handle = {
	breadcrumb: (data: {
		ancestry: { name: string; slug: string }[];
		category: { name: string; slug: string };
	}) => {
		const { ancestry, category } = data;
		const allItems = [...ancestry, category];
		return generateBreadcrumb(allItems, "/c");
	},
};

export const meta = ({ data }: Route.MetaArgs) => {
	const { category } = data;

	if (!category) return [];

	return [
		{ title: category.meta_title || category.name },
		{
			name: "description",
			content: category.meta_description,
		},
		{
			name: "keywords",
			content: [category.meta_keywords || []].join(","),
		},
	];
};

export async function loader({ request, params }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const url = new URL(request.url);
	const { slug } = params;

	const { response: category } = await getProductCategory(session, slug);
	const { response: products } = await getCategoryProducts(session, url, slug);

	const filters = products.filters;

	const pagination =
		isNonEmptyArray(products.data) && products.meta?.links
			? products.meta?.links
			: null;

	// Build ancestry array from parent chain
	const ancestry: { name: string; slug: string }[] = [];

	let current = category.parent;
	while (current) {
		ancestry.unshift({ name: current.name, slug: current.slug });
		current = current.parent;
	}

	return {
		category,
		ancestry,
		products,
		pagination,
		filters,
	};
}

export async function action({ request }: Route.ActionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const formData = await request.formData();

	const { response: cartItem, error } = await addToCart(session, formData);
	putToast(session, {
		message: error ?? `${cartItem?.variant.product.name} added to cart.`,
		type: error ? ToastType.Error : ToastType.Success,
		action: {
			label: "View Cart",
			path: "/cart",
		},
	});

	return data(
		{
			cartItem,
		},
		{
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		},
	);
}

const TechnicalService = {
	title: "Technical Support",
	description:
		"Our team are on hand to advise you on the best solution for your requirements and environment. Get in touch with us today to discuss your project",
	phone: "0808 196 6381",
	link: "/contact-us",
};

const SortBy = [
	{
		label: "Best Selling",
		value: "sales_count",
	},
	{
		label: "Best Rating",
		value: "rating",
	},
	{
		label: "Price Low",
		value: "price-low",
	},
	{
		label: "Price High",
		value: "price-high",
	},
];

export default function ProductCategoryPage({
	loaderData,
}: Route.ComponentProps) {
	const { category, products, pagination, filters } = loaderData;
	const [searchParams, setSearchParams] = useSearchParams();
	const cardView = searchParams.get("view") === "card";

	const handleFilter = (field: string, value: string | number | boolean) => {
		const newParams = new URLSearchParams(searchParams);

		newParams.set(field, String(value));
		setSearchParams(newParams, { preventScrollReset: true });
	};

	const location = useLocation();

	const reset = () => {
		window.location.href = location.pathname;
	};

	if (!category) return null;

	return (
		<div className="space-y-8 px-5 py-8">
			<div className="mx-auto max-w-7xl space-y-8">
				<Breadcrumb />
				<div className="space-y-2">
					<h1 className="font-bold text-4xl text-navy-darkest">
						{category.name}
					</h1>
					{category.introduction && (
						<div
							className="prose prose-img:mx-auto prose-figcaption:hidden max-w-none prose-img:max-w-full"
							// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
							dangerouslySetInnerHTML={{ __html: category.introduction }}
						/>
					)}
					<Button variant="plain" size="none" as="a" href="#description">
						Read More
					</Button>
				</div>
				{category.children && category.children.length > 0 && (
					<div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{category.children.map((children) => (
							<ProductCategoryCard key={children.slug} category={children} />
						))}
						<Service {...TechnicalService} />
					</div>
				)}
			</div>

			<div className="relative isolate">
				<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-8 lg:grid-cols-4">
					<aside className="lg:col-span-1">
						<div className="sticky top-40 space-y-6">
							<div className="flex justify-between gap-2">
								<span className="font-medium text-lg text-navy-darkest">
									Filters
								</span>
								<Button
									type="button"
									size="none"
									variant="plain"
									className="text-teal hover:text-navy-darkest"
									onClick={reset}
								>
									Reset Filters
								</Button>
							</div>
							<div className="grid gap-4">
								<div className="grid gap-2">
									<label className="flex gap-2">
										<input
											type="checkbox"
											className="my-0.5 h-4 w-4 accent-teal"
											onChange={(e) =>
												handleFilter("filter[in_stock]", e.target.checked)
											}
										/>
										<span>In Stock</span>
									</label>
									<label className="flex gap-2">
										<input
											type="checkbox"
											className="my-0.5 h-4 w-4 accent-teal"
											onChange={(e) =>
												handleFilter("filter[on_sale]", e.target.checked)
											}
										/>
										<span>On Sale</span>
									</label>
								</div>

								{/*Dyanmic Filters*/}
								{filters && (
									<FilterComponents
										filters={filters}
										searchParams={searchParams}
										setSearchParams={setSearchParams}
									/>
								)}
							</div>
						</div>
					</aside>

					<main className="lg:col-span-3">
						<div className="mb-4 flex items-center justify-end gap-4">
							<div className="flex items-center gap-1">
								<label
									htmlFor="sort"
									className="block whitespace-nowrap text-gray text-xs"
								>
									Sort By:
								</label>
								<Select
									id="sort"
									name="sort"
									value={searchParams.get("sort") || "price-low"}
									options={SortBy}
									onChange={(value) => handleFilter("sort", value)}
									className="w-40"
								/>
							</div>
							<Button
								as={NavLink}
								to={(() => {
									const newParams = new URLSearchParams(searchParams);
									newParams.set("view", cardView ? "grid" : "card");
									return `?${newParams.toString()}`;
								})()}
								variant="secondary"
								size="icon"
								aria-label={
									cardView ? "Switch to grid view" : "Switch to card view"
								}
								icon={
									cardView ? (
										<Squares2X2Icon className="h-5 w-5" />
									) : (
										<ListBulletIcon className="h-5 w-5" />
									)
								}
							/>
						</div>

						{isNonEmptyArray(products.data) ? (
							<div
								className={cn(
									"grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
									cardView && "lg:grid-cols-1",
								)}
							>
								{(products.data ?? []).map((product: Product) => (
									<ProductCard {...product} key={product.id} />
								))}
							</div>
						) : (
							<Alert>
								We couldn’t find any products matching your search. Try
								adjusting your filters.
							</Alert>
						)}
					</main>
				</div>
			</div>
			{pagination && <Pagination links={pagination} />}
			{category.description && (
				<div className="mx-auto max-w-7xl scroll-mt-40" id="description">
					<div
						className="prose prose-img:mx-auto prose-figcaption:hidden max-w-none prose-img:max-w-full"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{ __html: category.description }}
					/>
				</div>
			)}
		</div>
	);
}
