import { Link } from "react-router";
import { AnimateOnScroll, SectionHeader } from "~/components";
import { useCarousel } from "~/hooks";
import type { Brand } from "~/types";

export const Brands = ({ brands }: { brands: Brand[] }) => {
	const { containerRef } = useCarousel({
		length: brands.length,
		interval: 3000,
	});

	return (
		<div className="space-y-8 px-5 py-16">
			<SectionHeader category="Our Brands" title="Trusted partners" />
			<AnimateOnScroll>
				<div
					ref={containerRef}
					className="scrollbar-hidden justify-center-safe flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth p-8"
				>
					{brands.map((brand) => (
						<Link
							to={`/brand/${brand.slug}`}
							key={brand.slug}
							className="w-44 shrink-0 snap-center overflow-hidden rounded-lg bg-white transition-all hover:scale-105 hover:shadow-lg"
						>
							<img
								className="h-auto w-full"
								src={brand.logo_url}
								alt={brand.name}
								loading="lazy"
							/>
						</Link>
					))}
				</div>
			</AnimateOnScroll>
		</div>
	);
};
