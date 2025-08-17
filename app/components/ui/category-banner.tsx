import { Link, href } from "react-router";
import { useCarousel } from "~/hooks";
import type { ProductCategory } from "~/types";
import { isNonEmptyArray } from "~/utils";
import { Image } from "./image";

export const CategoryBanner = ({ category }: { category: ProductCategory }) => {
	const { products, children } = category;

	const topChildren = (children?.slice(0, 4) || [])
		.concat(Array(4).fill(null))
		.slice(0, 4);

	const { containerRef } = useCarousel({
		length: topChildren.length,
	});

	if (!isNonEmptyArray(children)) {
		return null;
	}

	return (
		<div className="grid grid-cols-1 gap-3 md:grid-cols-3">
			<div
				ref={containerRef}
				className="scrollbar-hidden flex snap-x snap-mandatory flex-nowrap overflow-x-auto scroll-smooth rounded-lg md:col-span-2"
			>
				{products?.map((product) => (
					<Link
						to={href("/p/:slug", { slug: product.slug })}
						className="relative flex w-full shrink-0 snap-start items-center justify-center bg-teal/20 text-teal"
						key={product.id}
					>
						{product.banner_url ? (
							<Image
								className="inset-0 h-full w-full object-cover md:absolute"
								src={product.banner_url}
								alt={product.name}
							/>
						) : (
							product.name
						)}
					</Link>
				))}
			</div>
			<div className="grid grid-cols-2 gap-3">
				{topChildren?.map((child, index) => (
					<div
						className="group relative aspect-square overflow-hidden rounded-lg bg-teal/20 transition-all hover:bg-green/40"
						key={child ? child.name : index}
					>
						{child && (
							<Link to={href("/c/:slug", { slug: child.slug })}>
								<span className="absolute inset-x-0 top-2/3 bottom-0 z-10 flex items-center bg-navy-darkest/40 p-2 font-bold text-shadow-2xs text-shadow-black text-white uppercase transition-all group-hover:bg-teal/80">
									<span>{child.name}</span>
								</span>
								<Image
									src={child.thumbnail_url}
									className="inset-0 h-full w-full object-cover md:absolute"
									alt={child.name}
								/>
							</Link>
						)}
					</div>
				))}
			</div>
		</div>
	);
};
