import { NavLink, href } from "react-router";
import { Image } from "~/components";
import type { ProductCategory } from "~/types";

export const ProductCategoryCard = ({
	category,
}: { category: ProductCategory }) => {
	return (
		<NavLink
			to={href("/c/:slug", { slug: category.slug })}
			key={category.slug}
			className="block [&>div]:h-full"
		>
			<div className="group relative flex h-full flex-row justify-between bg-gray-lightest text-xs shadow-navy-darkest transition-all hover:scale-105 hover:shadow-2xl lg:flex-col">
				<div className="flex h-full flex-col space-y-2 px-4 py-5">
					<p className="font-bold text-2xl">{category.name}</p>
					<div className="flex min-h-20 flex-1 flex-col justify-between">
						<div
							className="mb-4 line-clamp-4"
							// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
							dangerouslySetInnerHTML={{ __html: category.introduction }}
						/>
						<p className="font-bold">See all {category.name}</p>
					</div>
				</div>
				<div className="mt-auto ml-auto">
					<Image
						className="aspect-square h-auto w-full max-w-52 origin-bottom-right object-contain transition-all delay-100 duration-300 ease-in-out group-hover:scale-115"
						src={category.thumbnail_url}
						alt={category.name}
						loading="lazy"
					/>
				</div>
			</div>
		</NavLink>
	);
};
