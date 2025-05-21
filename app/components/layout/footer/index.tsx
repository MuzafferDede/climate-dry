import { Bottom } from "./bottom";
import { Middle } from "./middle";
import { Top } from "./top";

export const Footer = () => {
	return (
		<footer className="relative isolate bg-navy-darkest py-10">
			<div className="absolute inset-x-0 top-0 z-1 h-64 bg-white lg:h-40" />
			<div className="relative z-10 mx-auto max-w-7xl">
				<Top />
				<Middle />
				<Bottom />
			</div>
		</footer>
	);
};
