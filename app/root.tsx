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
import { LiveChatWidget } from "@livechat/widget-react";
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
import { AppProvider, CartProvider } from "~/contexts";
import { useInViewport } from "~/hooks";
import { buildHeaders, getCustomer, getSession } from "./.server";

import { getNavigation, getPages, subsucribe } from "./.server/services";
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
	// Preconnect to external services
	{ rel: "preconnect", href: "https://www.googletagmanager.com" },
	{ rel: "preconnect", href: "https://cdn.livechatinc.com" },
];

export const handle = {
	breadcrumb: () => ({ label: "Home", path: "/" }),
};

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await getSession(request.headers.get("Cookie"));
	const url = new URL(request.url);

	const customer = getCustomer(session);
	const toast = popToast(session);

	// Parallelize menu and pages loading
	const [
		{ response: menu, error: menuError },
		{ response: pages, error: pagesError }
	] = await Promise.all([
		getNavigation(session),
		getPages(session)
	]);

	const error = menuError || pagesError;

	if (error) {
		putToast(session, {
			message: error,
			type: ToastType.Error,
		});
	}
	return data(
		{ customer, menu, pages, toast, url },
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

type ProductsMeta = {
	current_page: number;
	last_page: number;
};

type ProductsData = {
	products?: {
		meta?: ProductsMeta;
	};
};

const buildPageLink = (url: URL, pageNumber: number) => {
	const baseUrl = `${url.origin}${url.pathname}`;
	return pageNumber === 1 ? baseUrl : `${baseUrl}?page=${pageNumber}`;
};

export function Layout({ children }: { children: ReactNode }) {
	const data = useLoaderData<typeof loader>();
	const url = data?.url ?? "";

	const links: LinkDescriptor[] = useMatches().flatMap((match) => {
		const shouldAddLinks = (match.handle as { shouldAddLinks?: boolean })
			?.shouldAddLinks;

		if (!shouldAddLinks) return [];

		const meta = (match.data as ProductsData)?.products?.meta;
		if (!meta?.current_page || !meta?.last_page) return [];

		const { current_page, last_page } = meta;

		const prevPageLink: LinkDescriptor | false =
			current_page > 1
				? { rel: "prev", href: buildPageLink(url, current_page - 1) }
				: false;

		const nextPageLink: LinkDescriptor | false =
			current_page < last_page
				? { rel: "next", href: buildPageLink(url, current_page + 1) }
				: false;

		return [prevPageLink, nextPageLink].filter(Boolean) as LinkDescriptor[];
	});

	const canonicalUrl = url.toString().replace(/\/$/, "");

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
				{/* GA4 script loader */}
				<script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-GW1SNVJDFW"
				/>

				{/* GA4 config */}
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{
						__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-GW1SNVJDFW');
						`,
					}}
				/>

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
	const home = useMatch("/");

	return (
		<AppProvider>
			<CartProvider>
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
						<div className="fixed top-0 right-0 z-50 m-4 flex animate-bounce items-center justify-center gap-4 rounded-full bg-teal p-4 font-bold text-white shadow-md">
							<Loading className="text-white" /> <span>Loading...</span>
						</div>
					)}
					<ContactUsWidget />
					<LiveChatWidget license="1215771" />
				</main>
			</CartProvider>
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
