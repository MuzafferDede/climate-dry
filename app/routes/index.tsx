import { data } from "react-router";
import {
	addToCart,
	buildHeaders,
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
	WhyChooseUs,
} from "~/components";
import { ToastType } from "~/types";
import { isNonEmptyArray, putToast } from "~/utils";
import type { Route } from "./+types/index";

export function meta() {
	return [
		{ title: "Drying Equipment Specialists | Climate Dry" },
		{
			name: "description",
			content:
				"Climate Dry offers drying equipment & air treatment products online. We have a range of specialist equipment, like dehumidifiers, heaters, water pumps & fans.",
		},
		{
			name: "keywords",
			content: "drying equipment,drying specialists",
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
			headers: await buildHeaders(session),
		},
	);
}

const corporationSchema = {
	"@context": "https://schema.org",
	"@type": "Corporation",
	name: "Climate Dry",
	url: "https://www.climatedry.co.uk",
	logo: "https://www.climatedry.co.uk/images/logo.svg",
	contactPoint: [
		{
			"@type": "ContactPoint",
			telephone: "0808 196 9381",
			contactType: "sales",
			areaServed: "GB",
			availableLanguage: "en",
		},
		{
			"@type": "ContactPoint",
			telephone: "0808 196 9381",
			contactType: "technical support",
			areaServed: "GB",
			availableLanguage: "en",
		},
	],
};

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
		<>
			<div className="relative w-full overflow-hidden">
				{/* Thin blue banner text */}
				<Marquee />

				{/* Large sliding banner */}
				{isNonEmptyArray(banners?.data) && <Banners banners={banners.data} />}

				{/* featuredCategories */}
				{isNonEmptyArray(featuredCategories?.data) && (
					<FeaturedCategories categories={featuredCategories.data} />
				)}

				<WhyChooseUs />

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
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(corporationSchema),
				}}
			/>
		</>
	);
}
