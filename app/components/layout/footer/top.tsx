import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { Button } from "~/components/ui";

const source = {
	desktop: "images/layout/get-in-touch/contact-us@2x.png",
	mobile: "images/layout/get-in-touch/contact-us.png",
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
				/>
			</picture>
			<div className="flex w-full flex-col items-start justify-start gap-4 p-5 lg:max-w-lg lg:p-7">
				<h2 className="font-bold uppercase">Get In Touch</h2>
				<h3 className="font-bold text-2xl lg:text-4xl">Talk to our team</h3>
				<p>
					Our team are on hand to advise you on the best solution for your
					requirements and environment. Get in touch with us today to discuss
					your project.
				</p>
				<Button className="mt-auto gap-2 outline">
					<span>Contact us</span>
					<ArrowRightIcon className="-mr-2 size-6 rounded-full border border-white p-1" />
				</Button>
			</div>
		</div>
	);
};
