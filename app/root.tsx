import {
	Link,
	type LinkDescriptor,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	data,
	isRouteErrorResponse,
	useLoaderData,
	useMatch,
	useMatches,
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
import type { ReactNode } from "react";
import {
	Button,
	ContactUsWidget,
	Footer,
	Header,
	Loading,
	ToastContainer,
	WhyChooseUs,
} from "~/components";
import { AppProvider } from "~/contexts";
import { useInViewport } from "~/hooks";
import { buildHeaders, getCustomer, getSession } from "./.server";
import {
	getCart,
	getNavigation,
	getPages,
	subsucribe,
} from "./.server/services";
import { ToastType } from "./types";
import { popToast, putToast } from "./utils";

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
	const session = await getSession(request.headers.get("Cookie"));
	const url = new URL(request.url);

	const customer = getCustomer(session);
	const toast = popToast(session);

	const { response: menu, error: menuError } = await getNavigation(session);
	const { response: pages, error: pagesError } = await getPages(session);
	const { response: cart, error: cartError } = await getCart(session);

	if (cart?.guest_id) {
		session.set("guestId", cart.guest_id);
	}

	const error = menuError || pagesError || cartError;

	if (error) {
		putToast(session, {
			message: error,
			type: ToastType.Error,
		});
	}
	return data(
		{ customer, menu, pages, toast, cart, url },
		{
			headers: await buildHeaders(session),
		},
	);
};

export const action = async ({ request }: Route.ActionArgs) => {
	const session = await getSession(request.headers.get("Cookie"));
	const formData = await request.formData();
	const { response: result, error } = await subsucribe(session, formData);

	putToast(session, {
		message: error ?? "You have successfully subscribed to our newsletter.",
		type: error ? ToastType.Error : ToastType.Success,
	});

	return data(
		{ message: result?.email },
		{
			headers: await buildHeaders(session),
		},
	);
};

export function Layout({ children }: { children: ReactNode }) {
	const data = useLoaderData<typeof loader>();
	const url = data?.url ?? "";

	const links: LinkDescriptor[] = useMatches().flatMap((match) => {
		//@ts-ignore
		const fn = match.handle?.dynamicLinks;
		if (typeof fn !== "function") return [];
		return fn({ data: match.data, url });
	});

	let canonicalUrl = url.toString();
	canonicalUrl = canonicalUrl.replace(/\/$/, "");

	return (
		<html lang="en" className="scroll-smooth">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<link rel="canonical" href={canonicalUrl} />
				{links.map((link) => (
					<link {...link} key={link.integrity || JSON.stringify(link)} />
				))}
			</head>
			<body className="scroll-smooth text-navy-darkest text-sm antialiased has-[div[data-navigation-open=true]]:overflow-hidden">
				{children}
				<ScrollRestoration />
				<Scripts />

				<script src="/live-chat.js" />
			</body>
		</html>
	);
}

export default function App({ loaderData }: Route.ComponentProps) {
	const { toast } = loaderData;
	const { ref, inView } = useInViewport({ rootMargin: "100px" });

	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";
	const home = useMatch("/");

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
				{!home && <WhyChooseUs />}
				<Footer />
				<ToastContainer toast={toast} />
				<Link
					aria-label="go to top"
					data-state={inView ? "hide" : "show"}
					to="#main"
					className="fade-in zoom-in zoom-out fixed right-4 bottom-12 z-40 flex items-center justify-center border border-white bg-green fill-mode-forwards text-white hover:bg-gray data-[state=hide]:animate-out data-[state=show]:animate-in"
				>
					<ChevronUpIcon className="size-10" />
				</Link>
				{isLoading && (
					<div className="fixed right-0 bottom-0 z-50 m-4 flex animate-bounce items-center justify-center gap-4 rounded-full bg-teal p-4 font-bold text-white shadow-md">
						<Loading className="text-white" /> <span>Loading...</span>
					</div>
				)}
				<ContactUsWidget />
			</main>
		</AppProvider>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	const navigate = useNavigate();
	const isDev = import.meta.env.DEV;

	let title = "Unexpected Error";
	let description = "Something went wrong. Please try again later.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			title = "404 - Page Not Found";
			description = "The page you’re looking for doesn’t exist.";
		} else {
			title = `Error ${error.status}`;
			description = error.statusText || description;
		}
	} else if (isDev && error instanceof Error) {
		title = "Application Error";
		description = error.message;
		stack = error.stack;
	}

	return (
		<div className="flex min-h-screen flex-col bg-gray-lightest">
			{/* Top section */}
			<header className="flex flex-col items-center justify-center bg-red p-8 text-white">
				<ExclamationTriangleIcon
					className="mb-4 h-12 w-12"
					aria-hidden="true"
				/>
				<h1 className="text-center font-bold text-4xl">{title}</h1>
			</header>

			{/* Main content */}
			<main className="flex flex-1 flex-col items-center justify-center p-6">
				<p className="mb-8 max-w-xl text-center text-gray-700 text-lg">
					{description}
				</p>

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
			</main>

			{/* Stack trace for dev mode */}
			{isDev && stack && (
				<footer className="border-gray-300 border-t bg-gray-100 p-6 text-sm">
					<details>
						<summary className="cursor-pointer font-semibold text-gray-800">
							View stack trace
						</summary>
						<pre className="mt-2 overflow-auto whitespace-pre-wrap rounded-md bg-gray-lightest p-4 text-red-600">
							{stack}
						</pre>
					</details>
				</footer>
			)}
		</div>
	);
}
