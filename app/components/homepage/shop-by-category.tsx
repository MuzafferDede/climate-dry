import { ProductCategoryCard, SectionHeader } from "~/components";
import type { ProductCategory } from "~/types";

export const ShopByCategory = ({
	categories,
}: { categories: ProductCategory[] }) => {
	return (
		<div className="mx-auto max-w-6xl px-5 py-16">
			<div className="flex flex-col gap-16">
				<SectionHeader
					category="Complete Humidity Control"
					title="Shop by category"
				/>
				<div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{categories.map((category) => (
						<ProductCategoryCard category={category} key={category.slug} />
					))}
				</div>
			</div>
		</div>
	);
};
