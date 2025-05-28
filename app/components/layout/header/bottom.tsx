import {} from "react";
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
							<img className="size-6" src={tool.icon} alt={tool.label} />
							<div className="flex flex-col items-center justify-center">
								<h2 className="text-base">{tool.label}</h2>
								<p className="text-xs">{tool.description}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};
