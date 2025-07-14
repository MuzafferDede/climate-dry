import { data } from "react-router";
import {
	Banners,
	Brands,
	FeaturedCategories,
	Info,
	Marquee,
	Posts,
	ShopByCategory,
	Solutions,
	Support,
} from "~/components";
import {
	addToCart,
	commitSession,
	getBanners,
	getBrands,
	getFeaturedCategories,
	getSession,
	getShopByCategories,
	putToast,
} from "~/services";
import { ToastType } from "~/types";
import type { Route } from "./+types/home";

export function meta() {
	return [
		{ title: "Climate Dry" },
		{
			name: "description",
			content: "Climate Dry - Track and reduce your carbon footprint",
		},
	];
}

export async function loader({ request }: Route.LoaderArgs) {
	const banners = await getBanners(request);
	const brands = await getBrands(request);
	const featuredCategories = await getFeaturedCategories(request);
	const shopByCategories = await getShopByCategories(request);

	return { banners, brands, featuredCategories, shopByCategories };
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

export default function Home({ loaderData }: Route.ComponentProps) {
	const { banners, brands, featuredCategories, shopByCategories } = loaderData;

	return (
		<div className="relative w-full overflow-hidden">
			<Marquee />
			{banners && <Banners banners={banners} />}
			{featuredCategories.data.length > 0 && (
				<FeaturedCategories categories={featuredCategories.data} />
			)}
			<Support />
			<Solutions />
			{shopByCategories.data.length > 0 && (
				<ShopByCategory categories={shopByCategories.data} />
			)}
			{brands.length < 0 && <Brands brands={brands} />}
			<Info />
			<Posts />
		</div>
	);
}
