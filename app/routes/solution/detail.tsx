import { getSession, getSolution, getSolutions } from "~/.server";
import { ResponsiveSidebar } from "~/components/ui/";
import { Breadcrumb } from "~/components/ui/breadcrumb";
import type { Solution } from "~/types";
import type { Route } from "./+types/detail";

export const meta = ({ data }: Route.MetaArgs) => [
	{ title: data.solution.meta_title ?? data.solution.name },
	{ name: "description", content: data.solution.meta_description ?? "" },
];

export const handle = {
	breadcrumb: (data: { solution: Solution }) => [
		{ label: "Solutions", path: "/solution/agriculture" },
		{ label: data.solution.name, path: `/solution/${data.solution.slug}` },
	],
};

export async function loader({ request, params }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const { slug } = params;

	const { response: solution, error } = await getSolution(session, slug);

	const { response: solutions } = await getSolutions(session);

	if (error) throw new Response(error, { status: 404 });

	return { solution, solutions };
}

export default function SolutionDetailPage({
	loaderData,
}: Route.ComponentProps) {
	const { solution, solutions } = loaderData;

	return (
		<div className="space-y-8 px-5 py-8">
			<div className="mx-auto max-w-7xl">
				<Breadcrumb />
				<p className="pb-6 font-light text-5xl">Solutions Centre</p>
				<p className="pb-4 font-light text-lg">
					If you are experiencing problems with humidity & damp in your home or
					business premises, we can provide a solution. High relative humidity
					in an indoor space can lead to issues with condensation, damp and
					mould, it can damage materials and equipment kept within a space and
					it can cause health problems for people with allergies and breathing
					problems. Whatever your humidity & damp problems, we can provide a
					solution!
				</p>
				<p className="pb-4 font-light text-lg">Select your need from below.</p>
				<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-8 lg:grid-cols-4">
					<ResponsiveSidebar pages={solutions.data} segment="solution" />

					<main className="lg:col-span-3">
						<div className="mb-4 gap-4">
							<div className="prose max-w-none">
								<h1>{solution.name}</h1>
								<img
									src={solution.banner_url}
									alt={solution.name || "image"}
									className="h-80 w-full object-cover"
									loading="lazy"
								/>
							</div>
						</div>
						<div className="mb-4 gap-4">
							<div
								className="prose img]:w-full img]:h-auto img]:m-0 img]:inline-block prose-figcaption:hidden max-w-none [&_.attachment [&_.attachment [&_.attachment [&_.attachment [&_.attachment-gallery]:flex [&_.attachment-gallery]:flex-wrap [&_.attachment-gallery]:gap-0 [&_.attachment]:m-0 [&_.attachment]:w-1/2"
								// biome-ignore lint/security/noDangerouslySetInnerHtml: safe backend HTML
								dangerouslySetInnerHTML={{ __html: solution.description }}
							/>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
