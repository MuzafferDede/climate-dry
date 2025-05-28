import { footerLogos, sisterLogos } from "~/static";

export const Bottom = () => {
	return (
		<div className="flex flex-wrap items-end gap-4 divide-y divide-white border-white border-t px-5 py-6 lg:flex-nowrap lg:justify-center lg:divide-x lg:divide-y-0 lg:px-0">
			<div className="mt-5 flex w-full flex-wrap items-end justify-between lg:flex-nowrap">
				{footerLogos.map((logo) => (
					<a
						href={logo.path}
						className="flex w-26 max-w-full flex-col"
						key={logo.label}
					>
						<img className="w-full" src={logo.logo} alt={logo.label} />
					</a>
				))}
			</div>
			{sisterLogos.map((logo) => (
				<div key={logo.label} className="min-w-max">
					<h3 className="text-sm text-white">Our sister company</h3>
					<a
						href={logo.path}
						className="flex w-26 max-w-full flex-col"
						key={logo.label}
					>
						<img className="w-full" src={logo.logo} alt={logo.label} />
					</a>
				</div>
			))}
		</div>
	);
};
