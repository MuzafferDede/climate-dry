import {
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useNavigate,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { ExclamationTriangleIcon, HomeIcon } from "@heroicons/react/16/solid";
import { Button, Footer, Header } from "~/components";
import { AppProvider, ToastProvider } from "~/contexts";
import { ToastContainer } from "./components/ui/toast";
import { getCustomer, navigationBuilder, subsucribe } from "./services";

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap",
	},
];

export const loader = async ({ request }: Route.LoaderArgs) => {
	try {
		const customer = await getCustomer(request);
		const menu = navigationBuilder(request);

		return { customer, menu };
	} catch (error) {
		throw {
			message:
				error instanceof Error
					? error.message
					: "There was an issue. Please try again.",
		};
	}
};

export const action = async ({ request }: Route.ActionArgs) => {
	const data = await subsucribe(request);

	return { message: data.message, error: data.error };
};

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="text-navy-darkest text-sm antialiased has-[div[data-navigation-open=true]]:overflow-hidden">
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<AppProvider>
			<ToastProvider>
				<main className="relative isolate">
					<Header />
					<Outlet />
					<Footer />
					<ToastContainer />
				</main>
			</ToastProvider>
		</AppProvider>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	const navigate = useNavigate();

	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message =
			error.status === 404 ? "404 - Page Not Found" : `Error ${error.status}`;
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="flex min-h-screen animate-fade-in items-center justify-center bg-gray-50 p-6">
			<div className="fade-in zoom-in w-full max-w-md animate-in rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<div className="mb-6 flex animate-pulse justify-center">
					<div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
						<ExclamationTriangleIcon className="h-7 w-7 text-red-600" />
					</div>
				</div>

				<h1 className="mb-2 text-center font-bold text-2xl">{message}</h1>
				<p className="mb-6 text-center text-gray-600">{details}</p>

				<div className="flex flex-col justify-center gap-3 sm:flex-row">
					<Button
						onClick={() => navigate(-1)}
						variant="outline"
						className="flex items-center justify-center gap-2 transition hover:opacity-80"
					>
						Go Back
					</Button>

					<Button
						asChild
						className="flex items-center justify-center gap-2 bg-sky-600 transition hover:bg-sky-700"
					>
						<Link to="/">
							<HomeIcon className="h-4 w-4" />
							Home
						</Link>
					</Button>
				</div>

				{stack && (
					<div className="mt-6">
						<details className="rounded-md bg-gray-100 p-4 text-xs">
							<summary className="cursor-pointer font-semibold">
								Show error stack
							</summary>
							<pre className="mt-2 overflow-auto whitespace-pre-wrap text-red-600">
								{stack}
							</pre>
						</details>
					</div>
				)}
			</div>
		</main>
	);
}
