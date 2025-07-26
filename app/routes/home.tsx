import { data } from "react-router";
import {
	addToCart,
	commitSession,
	getBanners,
	getBrands,
	getFeaturedBlogPosts,
	getFeaturedCategories,
	getSession,
	getShopByCategories,
	getSolutions,
} from "~/.server";
import {
	Banners,
	Brands,
	FeaturedCategories,
	FeaturedPosts,
	Info,
	Marquee,
	ShopByCategory,
	Solutions,
	Support,
} from "~/components";
import { ToastType } from "~/types";
import { isNonEmptyArray, putToast } from "~/utils";
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
	const session = await getSession(request.headers.get("Cookie"));

	const { response: banners } = await getBanners(session);
	const { response: brands } = await getBrands(session);
	const { response: featuredBlogPosts } = await getFeaturedBlogPosts(session);
	const { response: featuredCategories } = await getFeaturedCategories(session);
	const { response: shopByCategories } = await getShopByCategories(session);
	const { response: solutions } = await getSolutions(session);

	return {
		banners,
		brands,
		featuredBlogPosts,
		featuredCategories,
		shopByCategories,
		solutions,
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

export default function Home({ loaderData }: Route.ComponentProps) {
	const {
		banners,
		brands,
		featuredBlogPosts,
		featuredCategories,
		shopByCategories,
		solutions,
	} = loaderData;

	return (
		<div className="relative w-full overflow-hidden">
			{/* Thin blue banner text */}
			<Marquee />

			{/* Large sliding banner */}
			{isNonEmptyArray(banners?.data) && <Banners banners={banners.data} />}

			{/* featuredCategories */}
			{isNonEmptyArray(featuredCategories?.data) && (
				<FeaturedCategories categories={featuredCategories.data} />
			)}

			{/* Two support images */}
			<Support />

			{/* Solutions feature */}
			{isNonEmptyArray(solutions?.data) && (
				<Solutions solutions={solutions.data} />
			)}

			{/* 4 shopByCategories icons */}
			{isNonEmptyArray(shopByCategories?.data) && (
				<ShopByCategory categories={shopByCategories.data} />
			)}

			{/* Trusted partners icons */}
			{isNonEmptyArray(brands?.data) && <Brands brands={brands.data} />}

			{/* Two info images */}
			<Info />

			{/* Featured posts */}
			{isNonEmptyArray(featuredBlogPosts?.data) && (
				<FeaturedPosts posts={featuredBlogPosts.data} from="home" />
			)}
		</div>
	);
}
