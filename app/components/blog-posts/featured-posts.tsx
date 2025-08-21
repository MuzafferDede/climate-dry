import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";
import { Button, SectionHeaderMulti } from "~/components";
import type { BlogPost } from "~/types";

export const FeaturedPosts = ({
	posts,
	from,
}: { posts: BlogPost[]; from: string }) => {
	const mainPost = posts[0];
	const sidePosts = posts.slice(1);

	return (
		<div className="bg-gray-lightest">
			<div className="mx-auto my-10 max-w-6xl space-y-16 px-5 py-10">
				{/* Header */}
				{from === "home" ? (
					<SectionHeaderMulti
						category="Expert Advice"
						category_tag="p"
						title="Advice hub"
						title_tag="h2"
					/>
				) : (
					<SectionHeaderMulti
						category="Expert Articles"
						category_tag="h2"
						title="More Articles"
						title_tag="p"
					/>
				)}

				{/* Content */}
				<div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row">
					{/* Main Post */}
					<div className="overflow-hidden rounded bg-white shadow lg:w-2/3">
						<div className="w-full">
							<img
								src={mainPost?.image_url ?? ""}
								alt={mainPost.title || "image"}
								className="h-80 w-full object-cover"
								loading="lazy"
							/>
							<div className="space-y-4 p-6">
								<h3 className="font-bold text-3xl">{mainPost.title}</h3>
								<p className="text-sm">{mainPost.introduction}</p>
								<Button
									to={`/info-hub/article/${mainPost.slug}`}
									as={Link}
									variant="secondary"
									icon={
										<ArrowRightIcon className="size-6 rounded-full border border-current p-1" />
									}
								>
									<span>Read more</span>
								</Button>
							</div>
						</div>
					</div>

					{/* Side Posts */}
					<div className="space-y-6 lg:w-1/3">
						{sidePosts.map((post) => (
							<div key={post.title} className="flex w-full items-start gap-4">
								<div className="flex-1 space-y-6">
									<div className="space-y-1">
										<Link
											to={`/info-hub/article/${post.slug}`}
											className="font-semibold text-lg transition-colors hover:text-teal"
										>
											{post.title}
										</Link>
										<p className="text-gray text-sm">{post.introduction}</p>
									</div>
									<Button
										to={`/info-hub/article/${post.slug}`}
										as={Link}
										variant="ghost"
										size="none"
										className="text-sm"
									>
										Read more
									</Button>
								</div>
								<div className="shrink-0">
									<img
										src={post?.image_url ?? ""}
										alt={post.title || "image"}
										className="size-30 rounded-full object-cover"
										loading="lazy"
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="text-center">
					<Button as={Link} variant="outline" to="/">
						Visit the advice hub
					</Button>
				</div>
			</div>
		</div>
	);
};
