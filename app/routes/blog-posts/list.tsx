import { NavLink, href } from "react-router";
import type { MetaFunction } from "react-router";

import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { getBlogPosts, getSession } from "~/.server";
import {
	BlogIntroText,
	Breadcrumb,
	Button,
	PageNavigation,
} from "~/components";
import type { Route } from "./+types/list";

export const handle = {
	breadcrumb: ({ category }: { category: string }) => {
		const crumbs = [{ label: "Advice Hub", path: "/info-hub" }];
		if (category) {
			crumbs.push({ label: "Case Studies", path: "/info-hub/case-studies" });
		}
		return crumbs;
	},
};

export const meta: MetaFunction = () => [
	{ title: "Blog Posts" },
	{ name: "description", content: "Latest blog posts from Climate Dry" },
];

export async function loader({ request, params }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const { category } = params;

	const { response: posts, error } = await getBlogPosts(session, category);

	if (error) throw new Response(error, { status: 404 });

	return { posts, category };
}

export default function BlogPostListPage({
	loaderData,
	params,
}: Route.ComponentProps) {
	const { posts } = loaderData;
	const { category } = params;
	const titles = category
		? {
				h2: "Tried and Tested Solutions",
				h3: "Case studies",
			}
		: { h1: "Expert Articles", h3: "Advice & Article" };

	if (!Array.isArray(posts.data)) {
		return <div className="text-red">Error: Posts failed to load.</div>;
	}

	return (
		<div className="space-y-8 px-5 py-8">
			<div className="mx-auto max-w-7xl space-y-8">
				<div className="mb-4 md:col-span-2">
					<Breadcrumb />
				</div>
				<BlogIntroText />
				<PageNavigation />
				<div className="flex flex-col items-center justify-center gap-1 text-center">
					<h1 className="font-bold text-teal uppercase">{titles?.h1}</h1>
					<p className="text-5xl">{titles?.h3}</p>
				</div>
				<div className="grid gap-6 py-4 lg:grid-cols-2">
					{posts.data.map((post) => (
						<div
							key={post.id}
							className="group overflow-hidden rounded bg-white shadow-lg"
						>
							<NavLink
								to={href("/info-hub/article/:slug", { slug: post.slug })}
								className="relative flex h-64 items-center justify-center overflow-hidden"
							>
								<img
									src={post.image_url}
									alt={post.title || "image"}
									className="h-full w-full object-cover object-center transition-all duration-300 ease-in-out group-hover:rotate-2 group-hover:scale-115"
									loading="lazy"
								/>
							</NavLink>
							<div className="space-y-4 bg-gray-lightest p-6 transition-colors group-hover:bg-blue-lighter">
								<h2 className="font-bold text-3xl">
									<NavLink
										to={href("/info-hub/article/:slug", { slug: post.slug })}
										className="block transition hover:opacity-90"
									>
										{post.title}
									</NavLink>
								</h2>
								<p className="text-xs">{post.introduction}</p>
								<Button
									as={NavLink}
									to={href("/info-hub/article/:slug", { slug: post.slug })}
									title={post.title}
									variant="secondary"
									icon={
										<ArrowRightIcon className="size-6 rounded-full border border-current p-1" />
									}
								>
									<span>Read more</span>
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
