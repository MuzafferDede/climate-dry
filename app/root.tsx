import {
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	data,
	isRouteErrorResponse,
	useNavigate,
	useNavigation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import {
	ChevronUpIcon,
	ExclamationTriangleIcon,
	HomeIcon,
} from "@heroicons/react/16/solid";
import {
	Button,
	Footer,
	Header,
	Loading,
	ToastContainer,
	WhyChooseUs,
} from "~/components";
import { AppProvider } from "~/contexts";
import { useInViewport } from "~/hooks";
import {
	commitSession,
	getCart,
	getCustomer,
	getNavigation,
	getPages,
	getProducts,
	getSession,
	popToast,
	putToast,
	subsucribe,
} from "./services";
import { ToastType } from "./types";

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap",
	},
];

export const handle = {
	breadcrumb: () => ({ label: "Home", path: "/" }),
};

export const loader = async ({ request }: Route.LoaderArgs) => {
	try {
		const session = await getSession(request.headers.get("Cookie"));
		const customer = await getCustomer(request);
		const menu = await getNavigation(request);
		const pages = await getPages(request);
		const cart = await getCart(request);
		const toast = await popToast(session);
		const products = await getProducts(request);
		session.set("guestId", cart.guest_id);

		return data(
			{ customer, menu, pages: pages.data, toast, cart, products },
			{
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			},
		);
	} catch (error) {
		throw {
			message: error instanceof Error ? error.message : "There was an issue.",
		};
	}
};

export const action = async ({ request }: Route.ActionArgs) => {
	const session = await getSession(request.headers.get("Cookie"));
	const result = await subsucribe(request);

	putToast(
		session,
		result.error
			? { message: result.error, type: ToastType.Error }
			: { message: result.message, type: ToastType.Success },
	);

	return data(
		{ message: result.message, email: result.email },
		{
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		},
	);
};

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="scroll-smooth">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="scroll-smooth text-navy-darkest text-sm antialiased has-[div[data-navigation-open=true]]:overflow-hidden">
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App({ loaderData }: Route.ComponentProps) {
	const { toast } = loaderData;
	const { ref, inView } = useInViewport({ rootMargin: "100px" });

	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";

	return (
		<AppProvider>
			<main className="relative isolate" id="main">
				<div
					ref={ref}
					className="pointer-events-none absolute inset-x-0 top-0 px-0"
				/>
				<Header />
				<div className="isolote relative z-20">
					<Outlet />
				</div>
				<WhyChooseUs />
				<Footer />
				<ToastContainer toast={toast} />
				<Link
					data-state={inView ? "hide" : "show"}
					to="/#main"
					className="fade-in zoom-in zoom-out fixed right-4 bottom-4 z-30 flex items-center justify-center border border-white bg-green fill-mode-forwards text-white hover:bg-gray data-[state=hide]:animate-out data-[state=show]:animate-in"
				>
					<ChevronUpIcon className="size-10" />
					<span className="sr-only">go to top</span>
				</Link>
				{isLoading && (
					<div className="fixed right-0 bottom-0 z-50 m-4 flex animate-bounce items-center justify-center rounded-full bg-teal p-4 shadow-md">
						<Loading className="text-white" />
					</div>
				)}
			</main>
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
		<main className="isolate flex min-h-screen animate-fade-in items-center justify-center bg-gray-lightest p-6">
			<div className="fade-in zoom-in w-full max-w-md animate-in rounded-lg border border-gray-lighter bg-white p-6 shadow-sm">
				<div className="mb-6 flex animate-pulse justify-center">
					<div className="flex h-14 w-14 items-center justify-center rounded-full bg-red">
						<ExclamationTriangleIcon className="h-7 w-7 text-white" />
					</div>
				</div>

				<h1 className="mb-2 text-center font-bold text-2xl">{message}</h1>
				<p className="mb-6 text-center text-gray">{details}</p>

				<div className="flex flex-col-reverse justify-center gap-3 sm:flex-row">
					<Button
						onClick={() => navigate(-1)}
						variant="secondary"
						className="justify-center"
					>
						Go Back
					</Button>

					<Button
						as={Link}
						to="/"
						icon={<HomeIcon className="h-5 w-5" />}
						className="justify-center"
						iconPosition="left"
					>
						Home
					</Button>
				</div>

				{stack && (
					<div className="mt-6">
						<details className="rounded-md bg-gray-lightest p-4 text-xs">
							<summary className="cursor-pointer font-bold">
								Show error stack
							</summary>
							<pre className="mt-2 overflow-auto whitespace-pre-wrap text-red">
								{stack}
							</pre>
						</details>
					</div>
				)}
			</div>
		</main>
	);
}
