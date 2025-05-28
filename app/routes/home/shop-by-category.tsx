import { Link } from "react-router";
import { AnimateOnScroll, SectionHeader } from "~/components";

const CATEGORIES = [
	{
		name: "Dehumidifiers",
		description:
			"Wide range of dehumidifiers available to buy online, from some of the best brands in the industry",
		slug: "/",
		image: "images/layout/shop-by-category/dehumidifier.png",
	},
	{
		name: "Fans",
		description: "Speed up drying times and create healthier environments",
		slug: "/",
		image: "images/layout/shop-by-category/fans.png",
	},
	{
		name: "Floor Dryers",
		description: "Specially designed air movers for drying floors and carpets",
		slug: "/",
		image: "images/layout/shop-by-category/floor-dryer.png",
	},
	{
		name: "Bundles",
		description:
			"Drying packages including quality equipment offered together at a low combined rate",
		slug: "/",
		image: "images/layout/shop-by-category/drying-bundles.png",
	},
];

export const ShopByCategory = () => {
	return (
		<div className="mx-auto max-w-6xl px-5 py-16">
			<div className="flex flex-col gap-16">
				<SectionHeader
					category="Complete Humidity Control"
					title="Shop by category"
				/>
				<div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{CATEGORIES.map((category) => (
						<AnimateOnScroll
							key={category.name}
							className="group relative flex h-full flex-row justify-between bg-gray-lightest text-xs shadow-navy-darkest transition-all hover:scale-105 hover:shadow-2xl lg:flex-col"
						>
							<div className="flex h-full flex-col space-y-2 px-4 py-5">
								<h3 className="font-bold text-3xl">{category.name}</h3>
								<div className="flex min-h-20 flex-1 flex-col justify-between">
									<p className="mb-4">{category.description}</p>
									<Link className="font-bold" to={category.slug}>
										See all {category.name}
									</Link>
								</div>
							</div>
							<div className="mt-auto ml-auto">
								<img
									className="h-auto w-full max-w-52 origin-bottom-right object-contain transition-all delay-100 duration-300 ease-in-out group-hover:scale-115"
									src={category.image}
									alt={category.name}
								/>
							</div>
						</AnimateOnScroll>
					))}
				</div>
			</div>
		</div>
	);
};
