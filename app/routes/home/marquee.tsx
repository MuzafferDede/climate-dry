import { Link } from "react-router";

export const Marquee = () => {
	return (
		<div className="group/margue border-white border-y-2 bg-teal p-2 text-center text-white lg:text-base">
			<div className="group-hover/margue:paused inline-block animate-marquee whitespace-nowrap md:animate-none md:whitespace-normal">
				Shop with peace of mind - Lowest prices around, backed up with our{" "}
				<Link to="/" className="font-bold hover:underline">
					Price Match Guarantee
				</Link>{" "}
				- Best quality products, backed up with our{" "}
				<Link to="/" className="font-bold hover:underline">
					Warranty Offers
				</Link>
			</div>
		</div>
	);
};
