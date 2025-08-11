import { Bottom } from "./bottom";
import { Middle } from "./middle";
import { MainNavigation } from "./navigation";
import { Top } from "./top";

export const Header = () => {
	return (
		<>
			<Top />
			<header className="sticky top-0 isolate z-40 w-full bg-white shadow">
				<Middle />
				<MainNavigation />
			</header>
			<Bottom />
		</>
	);
};
