import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/16/solid";
import {
	type LinkDescriptor,
	NavLink,
	data,
	href,
	useNavigation,
	useSearchParams,
} from "react-router";
import { addToCart, commitSession, getProducts, getSession } from "~/.server";
import { Alert, Button, Loading, Pagination, ProductCard } from "~/components";
import { type Product, ToastType } from "~/types";
import { cn, isNonEmptyArray, putToast } from "~/utils";
import type { Route } from "./+types/detail";

export const handle = {
	dynamicLinks: ({ data }: Route.MetaArgs) => {
		if (!data?.products?.meta) return [];

		const meta = data.products.meta;
		const links: LinkDescriptor[] = [];

		if (meta.current_page > 1) {
			links.push({
				rel: "prev",
				href: `${meta.path}?page=${meta.current_page - 1}`,
			});
		}

		if (meta.current_page < meta.last_page) {
			links.push({
				rel: "next",
				href: `${meta.path}?page=${meta.current_page + 1}`,
			});
		}

		return links;
	},
};

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

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await getSession(request.headers.get("Cookie"));
	const url = new URL(request.url);
	const q = url.searchParams.get("q")?.trim();

	if (!q) {
		return { products: null, pagination: null };
	}

	const { response: products } = await getProducts(session, url);

	const pagination =
		isNonEmptyArray(products.data) && products.meta?.links
			? products.meta.links
			: null;

	return {
		products,
		pagination,
	};
};

export const SearchResult = ({ loaderData }: Route.ComponentProps) => {
	const { products, pagination } = loaderData || {};
	const [searchParams] = useSearchParams();
	const navigation = useNavigation();

	const cardView = searchParams.get("view") === "card";

	const rawQuery = searchParams.get("q")?.trim() ?? "";
	const isSearching = rawQuery.length > 0;
	const isLoading = navigation.formAction === href("/search");
	const hasResults = isNonEmptyArray(products?.data);

	if (!isSearching) {
		return (
			<div className="mx-auto max-w-7xl py-10">
				<Alert>
					Type something into the search bar to find content across the site.
				</Alert>
			</div>
		);
	}

	return (
		<div className="relative mx-auto max-w-7xl space-y-8 py-10">
			{isLoading ? (
				<div className="inset-0 z-20 flex items-center justify-center bg-teal/10 p-10">
					<Loading className="size-6" />
				</div>
			) : (
				<>
					<h1 className="flex gap-2 text-lg">
						<span>Search results for:</span>
						<span className="font-semibold text-teal">{rawQuery}</span>
					</h1>

					{hasResults ? (
						<>
							<div className="flex justify-end">
								<Button
									as={NavLink}
									to={(() => {
										const newParams = new URLSearchParams(searchParams);
										newParams.set("view", cardView ? "grid" : "card");
										return `?${newParams.toString()}`;
									})()}
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
								{products.data.map((product: Product) => (
									<ProductCard {...product} key={product.id} />
								))}
							</div>
							{pagination && <Pagination links={pagination} />}
						</>
					) : (
						<Alert>
							We couldn't find anything matching{" "}
							<span className="font-semibold text-navy-darkest">
								"{rawQuery}"
							</span>
							. Try a different search term.
						</Alert>
					)}
				</>
			)}
		</div>
	);
};

export default SearchResult;
