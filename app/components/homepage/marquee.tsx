import { Link } from "react-router";

export const Marquee = () => {
	return (
		<div className="group/marquee border-white border-y-2 bg-teal p-2 text-center text-white lg:text-base">
			<div className="group-hover/marquee:paused inline-block animate-marquee whitespace-nowrap md:animate-none md:whitespace-normal">
				Shop with confidence, knowing you’re buying from experts who offer only
				top-quality brands, backed by our{" "}
				<Link to="/pages/price-match" className="font-bold hover:underline">
					price match guarantee
				</Link>{" "}
				and{" "}
				<Link to="/pages/warranty" className="font-bold hover:underline">
					exceptional warranties
				</Link>
			</div>
		</div>
	);
};
