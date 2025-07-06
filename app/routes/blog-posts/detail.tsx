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

export default function BlogDetailPage({ loaderData }: Route.ComponentProps) {
	const { post } = loaderData;

	return (
		<article className="mx-auto max-w-4xl space-y-4 p-6">
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
