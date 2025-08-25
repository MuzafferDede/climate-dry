import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";
import { AnimateOnScroll, Button, Image } from "~/components";
import { useCarousel } from "~/hooks";
import type { HeroBanner } from "~/types";

export const Banners = ({ banners }: { banners: HeroBanner[] }) => {
	const { containerRef } = useCarousel({
		length: banners.length,
	});

	return (
		<div
			ref={containerRef}
			className="scrollbar-hidden flex snap-x snap-mandatory overflow-x-auto scroll-smooth bg-gray-lightest lg:max-h-[32rem]"
		>
			{banners.map((banner, index) => (
				<div
					key={banner.title}
					className="group grid h-lg w-full flex-shrink-0 snap-center snap-always grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1" // fixed height on mobile
				>
					<div className="flex h-full flex-col p-5 md:items-end lg:p-20">
						<div className="flex h-full max-w-md flex-col items-start justify-center gap-8">
							<AnimateOnScroll
								type="fadeInRight"
								className="flex flex-col gap-2"
							>
								{index === 0 ? (
									<h1 className="font-bold text-3xl lg:text-5xl">
										{banner.title}
									</h1>
								) : (
									<p className="font-bold text-3xl lg:text-5xl">
										{banner.title}
									</p>
								)}
								<p className="text-base lg:text-lg">{banner.description}</p>
							</AnimateOnScroll>
							<Button
								to={banner.url}
								as={Link}
								variant="secondary"
								className="flex items-center gap-4 outline"
								icon={
									<ArrowRightIcon className="size-6 rounded-full border border-current p-1" />
								}
							>
								<span>{banner.button_text}</span>
							</Button>
						</div>
					</div>
					<div className="flex h-full items-center overflow-hidden">
						<Image
							src={banner.banner_url}
							alt={banner.title}
							className="h-full w-full object-cover"
						/>
					</div>
				</div>
			))}
		</div>
	);
};
