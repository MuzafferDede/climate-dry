import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Link } from "react-router";
import { Button, ProductCard, SectionHeader } from "~/components";
import type { ProductCategory } from "~/types";

export const FeaturedCategories = ({
	categories,
}: { categories: ProductCategory[] }) => {
	return (
		<div className="space-y-8 px-5 py-16">
			<SectionHeader
				category="Selected especially for you"
				title="Our Latest Offers"
			/>
			<TabGroup className="isolate mx-auto max-w-7xl">
				<TabList className="scrollbar-hidden mx-auto flex max-w-min snap-x snap-mandatory justify-items-center overflow-auto pb-px">
					{categories.map((category) => (
						<Tab
							className=" z-10 translate-y-px cursor-pointer snap-center whitespace-nowrap border-gray-lighter border-b px-3 py-2.5 text-base outline-none transition-all duration-300 data-selected:border-black data-selected:text-teal lg:text-lg"
							key={category.name}
						>
							{category.name}
						</Tab>
					))}
				</TabList>
				<TabPanels className="py-8">
					{categories.map((category) => (
						<TabPanel
							key={category.name}
							static
							className="hidden data-selected:block"
						>
							<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
								{category?.products?.map((product) => (
									<ProductCard {...product} key={product.name} />
								))}
							</div>
							<div className="pt-8 text-center">
								<Button as={Link} to={`/c/${category.slug}`} variant="outline">
									Shop All
								</Button>
							</div>
						</TabPanel>
					))}
				</TabPanels>
			</TabGroup>
		</div>
	);
};
