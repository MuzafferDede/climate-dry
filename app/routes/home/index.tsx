import { getBanners, getBrands } from "~/services";
import type { Route } from "./+types";
import { Banners } from "./banners";
import { Brands } from "./brands";
import { HumidityReducers } from "./humidity-reducers";
import { Info } from "./info";
import { Marquee } from "./marquee";
import { Posts } from "./posts";
import { ShopByCategory } from "./shop-by-category";
import { Solutions } from "./solutions";
import { Support } from "./support";

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

	return { banners, brands };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { banners, brands } = loaderData;

	return (
		<div className="relative w-full overflow-hidden">
			<Marquee />
			{banners && <Banners banners={banners} />}
			<HumidityReducers />
			<Support />
			<Solutions />
			<ShopByCategory />
			{brands && <Brands brands={brands} />}
			<Info />
			<Posts />
		</div>
	);
}
