import { AnimateOnScroll, PageNavigation } from "~/components";
import { getBlogPostBySlug } from "~/services";
import type { Route } from "./+types/detail";

export const meta = ({ data }: Route.MetaArgs) => [
	{ title: data.post.title },
	{ name: "description", content: data?.post.meta_description ?? "" },
];

export async function loader({ request, params }: Route.LoaderArgs) {
	const response = await getBlogPostBySlug(request, params.slug);
	return {
		post: response.data,
	};
}

export default function BlogDetailPage({
	loaderData,
	params,
}: Route.ComponentProps) {
	const { post } = loaderData;
	const titles = params?.category
		? {
				h2: "Tried and Tested Solutions",
				h3: "Case studies",
			}
		: { h2: "Expert Articles", h3: "Advice & Article" };

	return (
		<article className="mx-auto max-w-7xl space-y-4 p-6">
			<PageNavigation />
			<AnimateOnScroll className="flex flex-col items-center justify-center gap-1 text-center">
				<h2 className="font-bold text-teal uppercase">{titles?.h2}</h2>
				<h3 className="text-5xl">{titles?.h3}</h3>
			</AnimateOnScroll>
			<h1 className="font-bold text-4xl text-gray-darkest">{post.title}</h1>
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
	);
}
