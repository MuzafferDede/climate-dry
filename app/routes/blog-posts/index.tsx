import { href, NavLink } from "react-router";
import type { MetaFunction } from "react-router";
import { getBlogPosts } from "~/services";
import type { Route } from "./+types/";

import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { AnimateOnScroll, Button } from "~/components";

export const meta: MetaFunction = () => [
	{ title: "Blog Posts" },
	{ name: "description", content: "Latest blog posts from Climate Dry" },
];



export async function loader({ request }: Route.LoaderArgs) {
	const response = await getBlogPosts(request);
	return { posts: response.data };
}



export default function BlogPostListPage({loaderData}: Route.ComponentProps) {
	
	const {posts} = loaderData;
	if (!Array.isArray(posts)) {
		return <div className="text-red-600">Error: Posts failed to load.</div>;
	}

	return (
		<div className="space-y-8 px-5 py-8">
			<div className="mx-auto max-w-7xl space-y-8">
				<div className="space-y-2">
						<h1 className="font-bold text-4xl text-gray-900">Advice Hub</h1>
					</div>
				<div className="prose prose-img:mx-auto prose-figcaption:hidden max-w-none prose-img:max-w-full">
					<p>All our collective industry experts have got together to provide you with all you need to know about drying out and keeping dry those things precious to you. Read our articles or delve into our solutions centre to soak up the knowledge.</p>
				</div>
				<div className="grid gap-6 py-4 lg:grid-cols-2">
					{posts.map((post) => (
						<AnimateOnScroll
							key={post.id}
							threshold={0.1}
							type="fadeInLeft"
							className="overflow-hidden rounded bg-white shadow "
						>
							<NavLink to={href("/info-hub/article/:slug", { slug: post.slug })} className="block hover:opacity-90 transition">
								<img
									src={post.image_url}
									alt={post.title}
									className="h-80 w-full object-cover"
									loading="lazy"
								/>
							</NavLink>
							<div className="space-y-4 p-6">
								<h2 className="font-bold text-3xl"><NavLink to={href("/info-hub/article/:slug", { slug: post.slug })} className="block hover:opacity-90 transition">{post.title}</NavLink></h2>
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
