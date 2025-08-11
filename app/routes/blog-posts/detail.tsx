import { getBlogPost, getFeaturedBlogPosts, getSession } from "~/.server";
import {
	BlogIntroText,
	Breadcrumb,
	FeaturedPosts,
	PageNavigation,
} from "~/components";
import type { BlogPost } from "~/types";
import { isNonEmptyArray } from "~/utils";
import type { Route } from "./+types/detail";

export const handle = {
	breadcrumb: (data: { post: BlogPost }) => [
		{ label: "Advice Hub", path: "/info-hub" },
		{ label: data.post.title, path: `/info-hub/article/${data.post.slug}` },
	],
};

export const meta = ({ data }: Route.MetaArgs) => {
	if (data.post) {
		return [
			[
				{ title: data.post.title },
				{ name: "description", content: data.post.meta_description ?? "" },
			],
		];
	}
};

export async function loader({ request, params }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const { slug } = params;

	const { response: post, error } = await getBlogPost(session, slug);
	const { response: featuredBlogPosts } = await getFeaturedBlogPosts(session);

	if (error) throw new Response(error, { status: 404 });

	return { post, featuredBlogPosts };
}

export default function BlogDetailPage({
	loaderData,
	params,
}: Route.ComponentProps) {
	const { post, featuredBlogPosts } = loaderData;
	const titles = params?.category
		? {
				h2: "Tried and Tested Solutions",
				h3: "Case studies",
			}
		: { h2: "Expert Articles", h3: "Advice & Article" };

	if (!post) {
		return null;
	}
	return (
		<div>
			<article className="mx-auto max-w-7xl space-y-4 p-6">
				<div className="mb-4 md:col-span-2">
					<Breadcrumb />
				</div>
				<BlogIntroText />
				<PageNavigation />
				<div className="flex flex-col items-center justify-center gap-1 text-center">
					<h2 className="font-bold text-teal uppercase">{titles?.h2}</h2>
					<p className="text-5xl">{titles?.h3}</p>
				</div>
				<h1 className="py-6 font-bold text-4xl text-gray-darkest">
					{post.title}
				</h1>
				<img
					src={post.image_url}
					alt={post.title || "image"}
					className="h-80 w-full object-cover"
					loading="lazy"
				/>
				<div
					className="prose max-w-none"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: safe backend HTML
					dangerouslySetInnerHTML={{ __html: post.description }}
				/>
			</article>

			{/* Featured posts */}
			{isNonEmptyArray(featuredBlogPosts.data) && (
				<FeaturedPosts posts={featuredBlogPosts.data} from="article" />
			)}
		</div>
	);
}
