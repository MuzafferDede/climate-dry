import { Service, type ServiceProps } from "~/components";

const SERVICES: ServiceProps[] = [
	{
		logo: "/images/layout/info/linkedin-logo.webp",
		title: "Connect with us",
		description:
			"Step into our world of humidity control and connect with our experts",
		image: "/images/layout/info/LinkedIn.webp",
		link: "/pages/contact-us",
	},
	{
		title: "Warranty",
		description:
			"We pride ourselves on offering only high quality, robust and reliable products, built to last. Warranty ranges between 1 - 3 years with an option to extend to up to 6 years on certain products",
		image: "/images/layout/info/Warranty.webp",
		link: "/pages/warranty",
	},
];

export const Info = () => {
	return (
		<div className="mx-auto grid max-w-6xl gap-6 px-5 py-4 lg:grid-cols-2">
			{SERVICES.map((service) => (
				<Service {...service} key={service.title} />
			))}
		</div>
	);
};
