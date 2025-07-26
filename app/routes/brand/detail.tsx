import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { NavLink, data, useSearchParams } from "react-router";
import {
	addToCart,
	commitSession,
	getBrand,
	getBrandProducts,
	getSession,
} from "~/.server";
import {
	Breadcrumb,
	Button,
	Pagination,
	ProductCard,
	Select,
} from "~/components";
import { type Brand, type Product, ToastType } from "~/types";
import { cn, isNonEmptyArray, putToast } from "~/utils";
import type { Route } from "./+types/detail";

export const handle = {
	breadcrumb: (data: { brand: Brand }) => [
		{ label: "Our Brands", path: "/brands" },
		{ label: data.brand.name, path: `/brand/${data.brand.slug}` },
	],
};

export const meta = ({ data }: { data: { brand: Brand } }) => {
	const { brand } = data;
	if (!brand) return [];

	return [
		{ title: brand.meta_title },
		{
			name: "description",
			content: brand.meta_description,
		},
		{
			name: "keywords",
			content: [brand.meta_keywords || []].filter(Boolean).join(", "),
		},
	];
};

export async function loader({ request, params }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const url = new URL(request.url);

	const { slug } = params;

	const { response: brand } = await getBrand(session, slug);
	const { response: products } = await getBrandProducts(session, url, slug);

	const pagination =
		products.data.length > 0 && products.meta?.links
			? products.meta.links
			: null;

	return {
		brand,
		products,
		pagination,
	};
}

export async function action({ request }: Route.ActionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const formData = await request.formData();

	const { response, error } = await addToCart(session, formData);

	putToast(session, {
		message: error || `${response.variant.product.name} added to cart.`,
		type: error ? ToastType.Error : ToastType.Success,
		action: {
			label: "View Cart",
			path: "/cart",
		},
	});

	return data(
		{ response },
		{
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		},
	);
}

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

export default function BrandPage({ loaderData }: Route.ComponentProps) {
	const { brand, products, pagination } = loaderData;
	const [searchParams, setSearchParams] = useSearchParams();
	const cardView = searchParams.get("view") === "card";

	return (
		<div className="space-y-8 px-5 py-8">
			<div className="mx-auto max-w-7xl space-y-8">
				<Breadcrumb />
				<div className="space-y-2">
					<h1 className="font-bold text-4xl text-navy-darkest">{brand.name}</h1>
					{brand.introduction && (
						<div
							className="prose prose-img:mx-auto prose-figcaption:hidden max-w-none prose-img:max-w-full"
							// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
							dangerouslySetInnerHTML={{ __html: brand.introduction }}
						/>
					)}
					<Button variant="plain" size="none" as="a" href="#description">
						Read More
					</Button>
				</div>
			</div>

			{isNonEmptyArray(products.data) && (
				<div className="relative isolate bg-gray-lightest">
					<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-8 lg:grid-cols-4">
						<main className="lg:col-span-4">
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
										onChange={(val: string) => {
											const newParams = new URLSearchParams(searchParams);
											newParams.set("sort", val);
											setSearchParams(newParams, { preventScrollReset: true });
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
								{(products.data ?? []).map((product: Product) => (
									<ProductCard {...product} key={product.id} />
								))}
							</div>
						</main>
					</div>
				</div>
			)}
			{pagination && <Pagination links={pagination} />}
			{brand.description && (
				<div className="mx-auto max-w-7xl scroll-mt-40" id="description">
					<div
						className="prose prose-img:mx-auto prose-figcaption:hidden max-w-none prose-img:max-w-full"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{ __html: brand.description }}
					/>
				</div>
			)}
		</div>
	);
}
