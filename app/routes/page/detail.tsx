import { redirect } from "react-router";
import { getPages, getSession } from "~/.server";
import {
	Breadcrumb,
	ContactUsForm,
	PageNavigation,
	ResponsiveSidebar,
} from "~/components";
import type { Page } from "~/types";
import type { Route } from "./+types/detail";

export const meta = ({ data: { page } }: Route.MetaArgs) => [
	{ title: page?.meta_title ?? page?.name },
	{ name: "description", content: page?.meta_description },
];

export const handle = {
	breadcrumb: ({ page }: { page: Page }) => [
		{ label: "Help & Info", path: "/pages" },
		{ label: page?.name, path: `/pages/${page?.slug}` },
	],
};

export async function loader({ request, params }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const { slug } = params;

	const { response: pages, error } = await getPages(session);

	let page = pages.data.find((page) => page.slug === slug);

	if ((slug && !page && !error) || error)
		throw new Response(error, { status: 404 });

	if (!page) {
		page = pages.data[0];
		throw redirect(`/pages/${page.slug}`);
	}

	return {
		pages,
		page,
	};
}

export default function PageDetailPage({ loaderData }: Route.ComponentProps) {
	const { page, pages } = loaderData;

	if (!page) return null;

	return (
		<div className="space-y-8 px-5 py-8">
			<div className="mx-auto max-w-7xl">
				<Breadcrumb />
				<div className="space-y-2">
					<h2 className="font-bold text-4xl text-gray-darkest">Help & Info</h2>
				</div>
				<div className="prose prose-img:mx-auto prose-figcaption:hidden max-w-none prose-img:max-w-full">
					<p>
						The boring but necessary information you need to know about what we
						offer at Climate Dry
					</p>
				</div>
				<PageNavigation />

				<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-8 lg:grid-cols-4">
					<ResponsiveSidebar pages={pages.data} segment="pages" />

					<main className="lg:col-span-3">
						<div className="mb-4 grid gap-4">
							<div
								className="prose max-w-none"
								// biome-ignore lint/security/noDangerouslySetInnerHtml: safe backend HTML
								dangerouslySetInnerHTML={{ __html: page?.description ?? "" }}
							/>
							{page?.slug === "contact-us" && <ContactUsForm />}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
