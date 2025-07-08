import { NavLink, href } from "react-router";
import type { MetaFunction } from "react-router";
import { getBlogPosts } from "~/services";
import type { BlogPost } from "~/types";

import { ArrowRightIcon } from "@heroicons/react/16/solid";
import {
	AnimateOnScroll,
	Breadcrumb,
	Button,
	PageNavigation,
} from "~/components";
import type { Route } from "./+types/list";

export const handle = {
	breadcrumb: ({ params }: { params: { category?: string } }) => {
		const crumbs = [{ label: "Advice Hub", path: "/info-hub" }];
		if (params.category) {
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
	const response = await getBlogPosts(request, {
		category: params.category,
	});
	return { posts: response.data, params };
}

export default function BlogPostListPage({
	loaderData,
	params,
}: {
	loaderData: { posts: BlogPost[]; params: { category?: string } };
	params: { category?: string };
}) {
	const { posts } = loaderData;
	const titles = params?.category
		? {
				h2: "Tried and Tested Solutions",
				h3: "Case studies",
			}
		: { h2: "Expert Articles", h3: "Advice & Article" };

	if (!Array.isArray(posts)) {
		return <div className="text-red">Error: Posts failed to load.</div>;
	}

	return (
		<div className="space-y-8 px-5 py-8">
			<div className="mx-auto max-w-7xl space-y-8">
				<div className="mb-4 md:col-span-2">
					<Breadcrumb />
				</div>
				<div className="space-y-2">
					<h1 className="font-bold text-4xl text-gray-darkest">Advice Hub</h1>
				</div>
				<div className="prose prose-img:mx-auto prose-figcaption:hidden max-w-none prose-img:max-w-full">
					<p>
						All our collective industry experts have got together to provide you
						with all you need to know about drying out and keeping dry those
						things precious to you. Read our articles or delve into our
						solutions centre to soak up the knowledge.
					</p>
				</div>
				<PageNavigation />
				<AnimateOnScroll className="flex flex-col items-center justify-center gap-1 text-center">
					<h2 className="font-bold text-teal uppercase">{titles?.h2}</h2>
					<h3 className="text-5xl">{titles?.h3}</h3>
				</AnimateOnScroll>
				<div className="grid gap-6 py-4 lg:grid-cols-2">
					{posts.map((post) => (
						<AnimateOnScroll
							key={post.id}
							type="fadeInLeft"
							className="group overflow-hidden rounded bg-white shadow-lg"
						>
							<NavLink
								to={href("/info-hub/article/:slug", { slug: post.slug })}
								className="relative flex h-64 items-center justify-center overflow-hidden"
							>
								<img
									src={post.image_url}
									alt={post.title}
									className="h-auto w-full object-cover object-center transition-all duration-300 ease-in-out group-hover:rotate-2 group-hover:scale-115"
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
						</AnimateOnScroll>
					))}
				</div>
			</div>
		</div>
	);
}
