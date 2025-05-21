import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components";
import { heroBannerBuilder } from "~/services";
import type { Route } from "./+types";

export function meta() {
	return [
		{ title: "Climate Dry" },
		{
			name: "description",
			content: "Climate Dry - Track and reduce your carbon footprint",
		},
	];
}

export async function loader({ request }: Route.LoaderArgs) {
	const banners = await heroBannerBuilder(request);
	return { banners };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { banners } = loaderData;
	const carouselRef = useRef<HTMLDivElement>(null);
	const [index, setIndex] = useState(0);
	const bannerCount = banners.length;

	// Auto-scroll every 5 seconds
	useEffect(() => {
		if (bannerCount <= 1) return;

		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % bannerCount);
		}, 10000);

		return () => clearInterval(interval);
	}, [bannerCount]);

	// Scroll to next banner when index changes
	useEffect(() => {
		if (carouselRef.current) {
			const width = carouselRef.current.clientWidth;
			carouselRef.current.scrollTo({
				left: width * index,
				behavior: "smooth",
			});
		}
	}, [index]);

	return (
		<div className="relative w-full overflow-hidden">
			<div
				ref={carouselRef}
				className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth bg-gray-lightest"
			>
				{banners.map((banner) => (
					<div
						key={banner.title}
						className="grid h-lg w-full flex-shrink-0 snap-center snap-always grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1" // fixed height on mobile
					>
						<div className="flex h-full flex-col p-8 md:items-end">
							<div className="flex h-full max-w-md flex-col items-start justify-center gap-8">
								<div className="flex flex-col gap-2">
									<h2 className="font-bold text-3xl">{banner.title}</h2>
									<p className="text-base">{banner.description}</p>
								</div>
								<Link to={banner.url}>
									<Button
										variant="secondary"
										className="flex items-center gap-2 outline"
									>
										<span>{banner.button_text}</span>
										<ArrowRightIcon className="-mr-2 size-6 rounded-full border border-white p-1" />
									</Button>
								</Link>
							</div>
						</div>
						<div className="h-full">
							<img
								src={banner.banner_url}
								alt={banner.title}
								className="h-full w-full object-cover"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
