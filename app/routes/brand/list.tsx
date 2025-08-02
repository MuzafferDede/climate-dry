import { Link } from "react-router";
import type { MetaFunction } from "react-router";
import { getBrands, getSession, getSolutions } from "~/.server";

import { Breadcrumb, Solutions } from "~/components";
import { isNonEmptyArray } from "~/utils";
import type { Route } from "./+types/list";

export const handle = {
	breadcrumb: () => {
		const crumbs = [{ label: "Our Brands", path: "/brands" }];
		return crumbs;
	},
};

export const meta: MetaFunction = () => [
	{ title: "Our Brands" },
	{
		name: "description",
		content:
			"Climate Dry is an authorised seller of the best dehumidifier brands in the industry, for the home, commercial & retail sectors. View our range online.",
	},
];

export async function loader({ request, params }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const { response: brands } = await getBrands(session);
	const { response: solutions } = await getSolutions(session);
	return { brands, params, solutions };
}

export default function BrandListPage({ loaderData }: Route.ComponentProps) {
	const { brands, solutions } = loaderData;
	if (!isNonEmptyArray(brands.data)) {
		return <div className="text-red">Error: brands failed to load.</div>;
	}

	return (
		<div>
			<div className="space-y-8 px-5 py-8">
				<div className="mx-auto max-w-7xl space-y-8">
					<div className="mb-4 md:col-span-2">
						<Breadcrumb />
					</div>
					<div className="space-y-2">
						<h1 className="font-bold text-4xl text-gray-darkest">Our Brands</h1>
					</div>
					<div className="w-full">
						<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 p-8 lg:grid-cols-6">
							{brands.data.map((brand) => (
								<Link
									to={`/brand/${brand.slug}`}
									key={brand.slug}
									className="w-44 shrink-0 snap-center overflow-hidden transition-all hover:scale-105 hover:shadow-lg"
								>
									<img
										className="h-auto w-full"
										src={brand.logo_url}
										alt={brand.name || "image"}
										loading="lazy"
									/>
								</Link>
							))}
						</div>
					</div>

					<div className="prose prose-img:mx-auto prose-figcaption:hidden max-w-none prose-img:max-w-full">
						<p>
							Climate Dry is an authorised seller of dehumidifiers and other
							drying solutions from the best brands in the industry. Our range
							includes high quality dehumidifiers, ventilation fans, space
							heaters & water pumps for the domestic, commercial & industrial
							sectors. Take a look at the fantastic brands and products we have
							available - enquire with our sales team to find out more
							information.
						</p>
					</div>
				</div>
			</div>
			{/* Solutions feature */}
			{solutions && <Solutions solutions={solutions.data} />}
		</div>
	);
}
