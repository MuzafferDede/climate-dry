import { useLocation } from "react-router";
import { AnimateOnScroll, SectionHeader } from "../ui";

const CARDS = [
	{
		icon: "images/layout/why-choose-us/quality.png",
		title: "Superb Quality",
		description:
			"We've only partnered with the best brands, handpicking the best products needed for your humidity control project",
	},
	{
		icon: "images/layout/why-choose-us/expert.png",
		title: "Expert Technical Advice",
		description:
			"Our technical team are only a phone call away to help with any questions you may have",
	},
	{
		icon: "images/layout/why-choose-us/price-match.png",
		title: "Price Match Guarantee",
		description:
			"We're confident we offer the best value for money you will find and along with our warranty offers you won't need to go anywhere else.",
	},
];

const HIDDEN_AT = ["/login", "/register"];

export const WhyChooseUs = () => {
	const location = useLocation();

	if (HIDDEN_AT.includes(location.pathname)) {
		return null;
	}
	return (
		<div className="mx-auto max-w-5xl space-y-8 px-5 py-16">
			<SectionHeader
				category="Why Choose Us"
				title="Specialists in humidity control"
				description="At Climate Dry, we are your one-stop shop for cutting-edge drying
						equipment designed to tackle moisture-related challenges
						effectively. We provide premium dehumidifiers, water pumps, air
						movers, heaters, and other products that help maintain optimal
						humidity levels, combat dampness, and protect your spaces from water
						damage."
			/>
			<div className="grid grid-cols-1 gap-20 md:grid-cols-3">
				{CARDS.map((card) => (
					<AnimateOnScroll
						key={card.title}
						className="mx-auto flex max-w-xs flex-col items-center justify-start gap-8 text-center"
					>
						<img className="w-30" src={card.icon} alt={card.title} />
						<div className="flex flex-col gap-2">
							<h3 className="font-bold text-lg">{card.title}</h3>
							<p className="text-xs">{card.description}</p>
						</div>
					</AnimateOnScroll>
				))}
			</div>
		</div>
	);
};
