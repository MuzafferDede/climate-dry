import { Middle } from "./middle";
import { Navigation } from "./navigation";
import { Top } from "./top";

export const Header = () => {
	return (
		<>
			<Top />
			<header className="sticky top-0 isolate z-10 w-full bg-white shadow">
				<Middle />
				<Navigation />
			</header>
		</>
	);
};
