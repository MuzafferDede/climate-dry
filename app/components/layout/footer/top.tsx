import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { Link, href } from "react-router";
import { Button } from "~/components/ui";

const source = {
	desktop: "/images/layout/get-in-touch/contact-us@2x.png",
	mobile: "/images/layout/get-in-touch/contact-us.png",
};

export const Top = () => {
	return (
		<div className="mx-5 grid bg-teal text-white md:grid-cols-2 lg:mx-16">
			<picture className="h-full">
				<source media="(min-width: 601px)" srcSet={source.desktop} />
				<source media="(max-width: 600px)" srcSet={source.mobile} />
				<img
					className="h-full w-full object-cover"
					src={source.desktop}
					alt="Contact Us"
					loading="lazy"
				/>
			</picture>
			<div className="flex w-full flex-col items-start justify-start gap-4 p-5 lg:max-w-lg lg:p-7">
				<p className="font-bold uppercase">Get In Touch</p>
				<p className="font-bold text-2xl lg:text-4xl">Talk to our team</p>
				<p>
					Our team are on hand to advise you on the best solution for your
					requirements and environment. Get in touch with us today to discuss
					your project.
				</p>
				<Button
					to={href("/pages/:slug?", { slug: "contact-us" })}
					as={Link}
					variant="outline"
					className="text-white"
					icon={
						<ArrowRightIcon className="size-6 rounded-full border border-current p-1" />
					}
				>
					<span>Contact us</span>
				</Button>
			</div>
		</div>
	);
};
