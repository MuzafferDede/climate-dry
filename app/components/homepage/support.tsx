import { Service, type ServiceProps } from "~/components";

const SERVICES: ServiceProps[] = [
	{
		title: "Technical Support",
		description:
			"Our team are on hand to advise you on the best solution for your requirements and environment. Get in touch with us today to discuss your project",
		phone: "0808 196 6381",
		image: "/images/layout/support/tech-help.webp",
		link: "/pages/contact-us/",
	},
	{
		title: "Water Damage Restoration",
		description:
			"Our Water Damage Restoration packages are designed to cater to various needs at every stage, ensuring that your property is restored to its pre-damage condition.",
		image: "/images/layout/support/water-damage-restoration.webp",
		link: "/water-damage-restoration/",
	},
];

export const Support = () => {
	return (
		<div className="mx-auto grid max-w-6xl gap-6 px-5 py-4 lg:grid-cols-2">
			{SERVICES.map((service) => (
				<Service {...service} key={service.title} />
			))}
		</div>
	);
};
