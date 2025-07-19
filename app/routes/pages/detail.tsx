import { NavLink, useRouteLoaderData } from "react-router";
import { PageNavigation } from "~/components";
import { Breadcrumb } from "~/components/ui/breadcrumb";
import { getPage } from "~/services";
import type { Page } from "~/types";
import { cn } from "~/utils";
import type { Route } from "./+types/detail";

export const meta = ({ data }: Route.MetaArgs) => [
	{ title: data.page.meta_title ?? data.page.name },
	{ name: "description", content: data.page.meta_description ?? "" },
];

export const handle = {
	breadcrumb: (data: { page: Page }) => [
		{ label: "Help & Info", path: "/pages" },
		{ label: data.page.name, path: `/pages/${data.page.slug}` },
	],
};

export async function loader({ request, params }: Route.LoaderArgs) {
	const response = await getPage(request, params.slug);
	return {
		page: response.data,
	};
}

export default function PageDetailPage({ loaderData }: Route.ComponentProps) {
	const { page } = loaderData;

	const data = useRouteLoaderData("root");
	const pages: Page[] = data?.pages;

	return (
		<div className="space-y-8 px-5 py-8">
			<div className="mx-auto max-w-7xl">
				<Breadcrumb />
				<div className="space-y-2">
					<h2 className="font-bold text-4xl text-gray-darkest">Help & Info</h2>
				</div>
				<div className="prose prose-img:mx-auto prose-figcaption:hidden max-w-none prose-img:max-w-full">
					<p>
						The boring but necessary information you need to know about what we offer at Climate Dry
					</p>
				</div>
				<PageNavigation />

				<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-8 lg:grid-cols-4">
					<aside className="lg:col-span-1">
						<div className="space-y-6">
							<div
								className=" grid-cols-1 gap-x-4 self-start lg:grid"
								role="tablist"
								aria-orientation="horizontal"
							>
								{pages.map((link) => (
									<NavLink
										key={link.slug}
										className={({ isActive }) =>
											cn(
												"w-full cursor-pointer border-black border-t py-2.5 ps-2.5 text-left font-semibold outline-0 hover:text-teal data-selected:text-teal",
												isActive && "bg-gray-lightest font-bold text-teal",
											)
										}
										to={`/pages/${link.slug}`}
									>
										{link.name}
									</NavLink>
								))}
							</div>
						</div>
					</aside>
					<main className="lg:col-span-3">
						<div className="mb-4 gap-4">
							<div
								className="prose max-w-none"
								// biome-ignore lint/security/noDangerouslySetInnerHtml: safe backend HTML
								dangerouslySetInnerHTML={{ __html: page.description }}
							/>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
