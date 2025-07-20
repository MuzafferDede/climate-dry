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
	getSolutions,
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
	const solutions = await getSolutions(request);

	return { banners, brands, featuredCategories, shopByCategories, solutions };
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
	const { banners, brands, featuredCategories, shopByCategories, solutions } =
		loaderData;

	return (
		<div className="relative w-full overflow-hidden">
			{/* Thin blue banner text */}
			<Marquee />

			{/* Large sliding banner */}
			{banners && <Banners banners={banners} />}

			{/* featuredCategories */}
			{featuredCategories.data.length > 0 && (
				<FeaturedCategories categories={featuredCategories.data} />
			)}

			{/* Two support images */}
			<Support />

			{/* Solutions feature */}
			{solutions.data.length > 0 && <Solutions solutions={solutions.data} />}

			{/* 4 shopByCategories icons */}
			{shopByCategories.data.length > 0 && (
				<ShopByCategory categories={shopByCategories.data} />
			)}

			{/* Trusted partners icons */}
			{brands.length > 0 && <Brands brands={brands} />}

			{/* Two info images */}
			<Info />

			{/* Blog posts section */}
			<Posts />
		</div>
	);
}
