import {
	AdjustmentsHorizontalIcon,
	XMarkIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";
import { data, useLocation, useSearchParams } from "react-router";
import {
	addToCart,
	buildHeaders,
	getProductCategory,
	getProducts,
	getSession,
} from "~/.server";
import {
	Alert,
	Breadcrumb,
	Button,
	FilterComponents,
	ProductCategoryCard,
	ProductList,
	Service,
} from "~/components";
import { ToastType } from "~/types";
import { generateBreadcrumb, isNonEmptyArray, putToast } from "~/utils";
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
	shouldAddLinks: true,
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

	url.searchParams.set("category", slug);

	const { response: category, error } = await getProductCategory(session, slug);
	const { response: products } = await getProducts(session, url);

	if (error) throw new Response(error, { status: 404 });

	const filters = products?.filters;

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
			headers: await buildHeaders(session),
		},
	);
}

const TechnicalService = {
	title: "Technical Support",
	description:
		"Our team are on hand to advise you on the best solution for your requirements and environment. Get in touch with us today to discuss your project",
	phone: "0808 196 6381",
	link: "/pages/contact-us",
};

export default function ProductCategoryPage({
	loaderData,
}: Route.ComponentProps) {
	const { category, products, filters } = loaderData;
	const [searchParams, setSearchParams] = useSearchParams();
	const [isFilterOpen, setIsFilterOpen] = useState(false);

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

					{category.description && (
						<Button variant="plain" size="none" as="a" href="#description">
							Read More
						</Button>
					)}
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
				{/* Mobile Filter Toggle */}
				<div className="mx-auto max-w-7xl px-4 lg:hidden">
					<Button
						type="button"
						variant="outline"
						className="flex items-center gap-2"
						onClick={() => setIsFilterOpen(true)}
					>
						<AdjustmentsHorizontalIcon className="size-4" />
						Filters
					</Button>
				</div>

				{/* Mobile Filter Overlay */}
				{isFilterOpen && (
					<div className="fixed inset-0 z-50 lg:hidden">
						{/* Backdrop */}
						<button
							type="button"
							className="absolute inset-0 animate-fade-in bg-black/50"
							onClick={() => setIsFilterOpen(false)}
						/>

						{/* Bottom Slide Panel */}
						<div className="absolute right-0 bottom-0 left-0 max-h-[80vh] animate-slide-in-bottom rounded-t-xl bg-white">
							<div className="flex h-full max-h-[65vh] flex-col">
								{/* Handle Bar */}
								<div className="flex justify-center py-3">
									<div className="h-1 w-12 rounded-full bg-gray-light" />
								</div>

								{/* Header */}
								<div className="flex items-center justify-between border-gray-light border-b px-4 pb-4">
									<span className="font-medium text-lg text-navy-darkest">
										Filters
									</span>
									<div className="flex items-center gap-2">
										<Button
											type="button"
											size="none"
											variant="plain"
											className="text-teal hover:text-navy-darkest"
											onClick={reset}
										>
											Reset
										</Button>
										<Button
											type="button"
											size="none"
											variant="plain"
											onClick={() => setIsFilterOpen(false)}
										>
											<XMarkIcon className="size-5" />
										</Button>
									</div>
								</div>

								{/* Filter Content */}
								<div className="flex-1 overflow-auto p-4">
									<div className="space-y-6">
										<div className="grid gap-3">
											<label className="flex items-center gap-2">
												<input
													type="checkbox"
													className="size-4 accent-teal"
													onChange={(e) =>
														handleFilter("filter[in_stock]", e.target.checked)
													}
												/>
												<span>In Stock</span>
											</label>
											<label className="flex items-center gap-2">
												<input
													type="checkbox"
													className="size-4 accent-teal"
													onChange={(e) =>
														handleFilter("filter[on_sale]", e.target.checked)
													}
												/>
												<span>On Sale</span>
											</label>
										</div>

										{/*Dynamic Filters*/}
										{filters && (
											<FilterComponents
												filters={filters}
												searchParams={searchParams}
												setSearchParams={setSearchParams}
											/>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-8 lg:grid-cols-4">
					{/* Desktop Sidebar */}
					<aside className="hidden lg:col-span-1 lg:block">
						<div className="tce-y-6 lg:blockase sticky text-b">
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
							<div className="grid max-h-screen gap-4 overflow-auto scroll-smooth text-base md:text-sm">
								<div className="grid gap-3">
									<label className="flex items-center gap-2">
										<input
											type="checkbox"
											className="size-4 accent-teal"
											onChange={(e) =>
												handleFilter("filter[in_stock]", e.target.checked)
											}
										/>
										<span>In Stock</span>
									</label>
									<label className="flex items-center gap-2">
										<input
											type="checkbox"
											className="size-4 accent-teal"
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
						{isNonEmptyArray(products?.data) ? (
							<ProductList products={products} />
						) : (
							<Alert>
								We couldn’t find any products matching your search. Try
								adjusting your filters.
							</Alert>
						)}
					</main>
				</div>
			</div>

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
