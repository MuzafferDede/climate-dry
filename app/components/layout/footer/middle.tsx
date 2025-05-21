import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router";
import tglLogo from "~/assets/TGL-logo.svg";
import logo from "~/assets/logo.svg";
import { Button, Input } from "~/components/ui";
import { useToast } from "~/contexts";
import { footerHelperLinks, footerProductLinks } from "~/static";

const SectionTitle = ({ label }: { label: string }) => {
	return <h3 className="font-semibold text-teal uppercase">{label}</h3>;
};

const paymentLogos = [
	"images/layout/payments/visa.png",
	"images/layout/payments/mc.png",
	"images/layout/payments/pp-payinthree.png",
	"images/layout/payments/paybybank.png",
	"images/layout/payments/bacs.png",
];

export const Middle = () => {
	const toast = useToast();
	const { message, error } = useActionData() || {};
	const [email, setEmail] = useState("");

	useEffect(() => {
		if (message) {
			toast.success(message);
		}
		if (error) {
			toast.error(error);
		}
	}, [message, error, toast.success, toast.error]);

	return (
		<div className="grid gap-8 gap-y-16 p-4 py-10 lg:mt-10 lg:grid-cols-2">
			<div className="grid gap-4 gap-y-16 lg:grid-cols-2">
				<div className="flex flex-col gap-4">
					<Link to="/">
						<img src={logo} alt="Climate Dry" className="h-8 w-auto md:h-14" />
					</Link>
					<div className="flex flex-col gap-2.5">
						<SectionTitle label="Humidity Control Specialists" />
						<div className="text-white">
							<p>Tel: 0808 196 9381</p>
							<p>Nationwide Delivery</p>
							<p>Request Call Back</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-2.5">
					<SectionTitle label="Newsletter" />
					<div className="flex flex-col gap-4 text-white">
						<p>
							Subscribe to our newsletter and be the first to hear about product
							updates and special offers:
						</p>
						<div className="relative">
							<Form method="post">
								<Input
									disabled={message}
									type="email"
									name="email"
									placeholder="Email address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
								<Button
									type="submit"
									variant="plain"
									size="icon"
									className="absolute inset-y-px right-0 py-0 text-gray hover:text-gray-dark"
									disabled={!email || message}
								>
									<ArrowRightIcon className="size-6" />
								</Button>
							</Form>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-2.5">
					<h3 className="font-semibold text-teal uppercase">
						BROUGHT YO YOU BY TRADE GEAR
					</h3>
					<div className="flex flex-col gap-6 md:flex-row">
						<a
							href="https://www.tradegearltd.co.uk"
							target="_blank"
							rel="noreferrer"
						>
							<img
								src={tglLogo}
								alt="Trade Gear Ltd"
								loading="lazy"
								className="h-auto w-auto"
							/>
						</a>
						<div className="text-white md:max-w-32">
							<p>
								Trade Gear Ltd Stanley Grane Knowsley Park Liverpool L34 4AR
							</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-2.5">
					<SectionTitle label="Secure Online Payments" />
					<div className="grid grid-cols-5">
						{paymentLogos.map((logo) => (
							<img className="h-auto w-full" src={logo} key={logo} alt={logo} />
						))}
					</div>
				</div>
			</div>
			<div className="flex flex-wrap justify-between gap-y-16">
				<div className="flex flex-col gap-2.5">
					<SectionTitle label="Products" />
					<ul className="flex flex-col gap-0.5 text-white">
						{footerProductLinks.map((product) => (
							<li key={product.label}>
								<Link
									to={product.path}
									className="font-semibold hover:text-teal"
								>
									{product.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="flex flex-col gap-2.5">
					<SectionTitle label="Help & Info" />
					<ul className="flex flex-col gap-0.5 text-white">
						{footerHelperLinks.map((helpLink) => (
							<li key={helpLink.label}>
								<Link
									to={helpLink.path}
									className="font-semibold hover:text-teal"
								>
									{helpLink.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="flex flex-col gap-2.5">
					<SectionTitle label="Follow Us" />
					<div className="flex items-start gap-2 text-white">
						<a href="/" className="flex items-center hover:text-teal" title="X">
							<svg
								className="h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								shapeRendering="geometricPrecision"
								textRendering="geometricPrecision"
								imageRendering="optimizeQuality"
								fillRule="evenodd"
								clipRule="evenodd"
								viewBox="0 0 512 462.799"
								fill="currentColor"
							>
								<title>X</title>
								<path
									fillRule="nonzero"
									d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
								/>
							</svg>
						</a>
						<a
							href="/"
							className="flex items-center hover:text-teal"
							title="facebook"
						>
							<svg
								className="h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>Facebook</title>
								<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
							</svg>
						</a>
						<a
							href="/"
							className="flex items-center hover:text-teal"
							title="Linkedin"
						>
							<svg
								className="h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>Linkedin</title>
								<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
								<rect width="4" height="12" x="2" y="9" />
								<circle cx="4" cy="4" r="2" />
							</svg>
						</a>
						<a
							href="/"
							className="flex items-center hover:text-teal"
							title="Instagram"
						>
							<svg
								className="h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>Instagram</title>
								<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
								<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
								<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
