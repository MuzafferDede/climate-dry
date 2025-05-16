import { Link, href } from "react-router";

export const Top = () => {
	return (
		<div className="bg-gray-100 shadow">
			<div className="container mx-auto flex items-center justify-center p-2 sm:justify-between">
				<div className="flex gap-2 font-semibold text-sm uppercase">
					<h2>
						Call <span className="hidden sm:inline">our team</span> for expert
						advice:
					</h2>
					<a
						className="text-cyan-600 hover:text-cyan-700"
						href="te:0808 196 9381"
					>
						0808 196 9381
					</a>
				</div>
				<div className="flex items-center gap-4">
					<div className="hidden gap-2 font-semibold text-xs md:flex">
						<Link className="hover:text-cyan-700" to={href("/")}>
							About Us
						</Link>
						<Link className="hover:text-cyan-700" to={href("/")}>
							Brands
						</Link>
						<Link className="hover:text-cyan-700" to={href("/")}>
							Delivery
						</Link>
					</div>
					<div className="hidden gap-2 text-cyan-600 sm:flex">
						<a
							href="/"
							className="flex items-center hover:text-cyan-900"
							title="X"
						>
							<svg
								className="h-4 w-4"
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
							className="flex items-center hover:text-cyan-900"
							title="facebook"
						>
							<svg
								className="h-4 w-4"
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
							className="flex items-center hover:text-cyan-900"
							title="Linkedin"
						>
							<svg
								className="h-4 w-4"
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
							className="flex items-center hover:text-cyan-900"
							title="Instagram"
						>
							<svg
								className="h-4 w-4"
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
