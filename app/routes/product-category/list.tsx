import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import {
	type LoaderFunctionArgs,
	NavLink,
	data,
	useSearchParams,
} from "react-router";
import {
	Breadcrumb,
	Button,
	Pagination,
	ProductCard,
	ProductCategoryCard,
	Select,
	Service,
} from "~/components";
import {
	addToCart,
	commitSession,
	getCategoryProducts,
	getProductCategory,
	getSession,
	putToast,
} from "~/services";
import { type Product, ToastType } from "~/types";
import { cn, generateBreadcrumb } from "~/utils";
import type { Route } from "./+types/list";

export const handle = {
	breadcrumb: (data: {
		ancestry: { name: string; slug: string }[];
		category: { name: string; slug: string };
	}) => {
		const { ancestry, category } = data;
		const allItems = [...ancestry, category];
		return generateBreadcrumb(allItems, "/product-category");
	},
};

export const meta = ({ data }: Route.MetaArgs) => {
	if (!data?.category) return [];

	const { category } = data;

	return [
		{ title: category.meta_title || category.name },
		{
			name: "description",
			content: category.meta_description,
		},
		{
			name: "keywords",
			content: category.meta_keywords.join(","),
		},
	];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
	const { slug } = params;

	const categoryResponse = await getProductCategory(request, slug);
	const productsResponse = await getCategoryProducts(request, slug);

	const category = categoryResponse.data;
	const products = productsResponse.data;

	const pagination =
		products.length > 0 && productsResponse.meta?.links
			? productsResponse.meta.links
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
	};
}

export async function action({ request }: Route.ActionArgs) {
	const session = await getSession(request.headers.get("Cookie"));

	try {
		const result = await addToCart(request);

		putToast(session, {
			message: `${result.variant.product.name} added to cart.`,
			type: ToastType.Success,
			action: {
				label: "View Cart",
				path: "/cart",
			},
		});

		return data(
			{
				result,
			},
			{
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			},
		);
	} catch (error) {
		putToast(session, {
			message: error instanceof Error ? error.message : String(error),
			type: ToastType.Error,
		});

		return data(
			{
				error: error instanceof Error ? error.message : String(error),
			},
			{
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			},
		);
	}
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
	const { category, products, pagination } = loaderData;
	const [searchParams, setSearchParams] = useSearchParams();
	const cardView = searchParams.get("view") === "card";

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

			{products?.length > 0 && (
				<div className="relative isolate bg-gray-lightest">
					<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-8 lg:grid-cols-4">
						<aside className="lg:col-span-1">
							<div className="space-y-6">
								<h3 className="font-medium text-lg text-navy-darkest">
									Filters
								</h3>
								{/* TODO: Add filters component */}
								<p className="text-gray-light text-sm">
									Filters coming soon...
								</p>
							</div>
						</aside>
						<main className="lg:col-span-3">
							<div className="mb-4 flex items-center justify-end gap-4">
								<div className="flex items-center gap-1">
									<label
										htmlFor="sort"
										className="block whitespace-nowrap text-gray text-xs"
									>
										Sory By:
									</label>
									<Select
										id="sort"
										name="sort"
										value={searchParams.get("sort") || "price-low"}
										options={SortBy}
										onChange={(val: string) => {
											const newParams = new URLSearchParams(searchParams);
											newParams.set("sort", val);
											setSearchParams(newParams);
										}}
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

							<div
								className={cn(
									"grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
									cardView && "lg:grid-cols-1",
								)}
							>
								{(products ?? []).map((product: Product) => (
									<ProductCard {...product} key={product.id} />
								))}
							</div>
						</main>
					</div>
				</div>
			)}
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
