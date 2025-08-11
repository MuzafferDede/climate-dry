import { Link } from "react-router";
import { useCarousel } from "~/hooks";
import { headerTools } from "~/static";

export const Bottom = () => {
	const { containerRef } = useCarousel({
		length: headerTools.length,
	});

	return (
		<div className="bg-gray-lightest">
			<div className="mx-auto max-w-7xl bg-white">
				<div
					ref={containerRef}
					className="scrollbar-hidden flex snap-x snap-mandatory items-center gap-0.5 overflow-x-auto scroll-smooth"
				>
					{headerTools.map((tool) => (
						<Link
							key={tool.label}
							to={tool.path}
							className="flex w-full shrink-0 snap-center flex-col items-center justify-center gap-2 bg-gray-lightest p-6 transition-all hover:scale-98 hover:bg-blue-lighter hover:shadow-2xl md:shrink"
						>
							<img
								className="size-6"
								src={tool.icon}
								alt={tool.label || "image"}
								loading="lazy"
							/>
							<div className="flex flex-col items-center justify-center">
								<span className="font-semibold text-lg">{tool.label}</span>
								<p className="text-sm">{tool.description}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};
