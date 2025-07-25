import {
	AnimateOnScroll,
	BlogIntroText,
	Breadcrumb,
	FeaturedPosts,
	PageNavigation,
} from "~/components";
import { getBlogPostBySlug, getFeaturedBlogPosts } from "~/services";
import type { BlogPost } from "~/types";
import type { Route } from "./+types/detail";

export const handle = {
	breadcrumb: (data: { post: BlogPost }) => [
		{ label: "Advice Hub", path: "/info-hub" },
		{ label: data.post.title, path: `/info-hub/article/${data.post.slug}` },
	],
};

export const meta = ({ data }: Route.MetaArgs) => [
	{ title: data.post.title },
	{ name: "description", content: data?.post.meta_description ?? "" },
];

export async function loader({ request, params }: Route.LoaderArgs) {
	const response = await getBlogPostBySlug(request, params.slug);
	const post = response.data;
	const featuredBlogPosts = await getFeaturedBlogPosts(request);

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

	return (
		<div>
			<article className="mx-auto max-w-7xl space-y-4 p-6">
				<div className="mb-4 md:col-span-2">
					<Breadcrumb />
				</div>
				<BlogIntroText />
				<PageNavigation />
				<AnimateOnScroll className="flex flex-col items-center justify-center gap-1 text-center">
					<h2 className="font-bold text-teal uppercase">{titles?.h2}</h2>
					<p className="text-5xl">{titles?.h3}</p>
				</AnimateOnScroll>
				<h1 className="py-6 font-bold text-4xl text-gray-darkest">
					{post.title}
				</h1>
				<img
					src={post.image_url}
					alt={post.title}
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
			{featuredBlogPosts.data.length > 0 && (
				<FeaturedPosts posts={featuredBlogPosts.data} from="article" />
			)}
		</div>
	);
}
