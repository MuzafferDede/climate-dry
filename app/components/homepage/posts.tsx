import { ArrowRightIcon } from "@heroicons/react/16/solid";
import type React from "react";
import { Link } from "react-router";
import { AnimateOnScroll, Button, SectionHeader } from "~/components";

type Post = {
	title: string;
	introduction: string;
	banner: string;
	path: string;
};

const POSTS: Post[] = [
	{
		title:
			"Case Study: Water Damage Restoration with Minimal Disturbance at Care Home",
		introduction:
			"Discover how extensive water damage was dealt with in the least disruptive, efficient and effective way...",
		banner: "/images/temp/6810bf128ccda8.50485683.webp",
		path: "/",
	},
	{
		title: "Which type of dehumidifier in 2024",
		introduction:
			"Check out our recommendations for the latest in Dehumidifier technology and the difference between desiccant, refrigerant and condenser dehumidifiers.",
		banner: "/images/temp/6810bf128ccda8.50485683.webp",
		path: "/dehumidifier-types",
	},
	{
		title: "Improve Your Health and Home with a Dehumidifier",
		introduction:
			"Maintaining optimal humidity using dehumidifiers and hygrometers keeps environments healthy.",
		banner: "/images/temp/6810bf128ccda8.50485683.webp",
		path: "/health-home-dehumidifier",
	},
	{
		title: "An Essential Guide: Dealing With Leaks & Floods",
		introduction:
			"The cheapest and best solution for dealing with leaks and floods at home or in the workspace, featuring Dantherm's",
		banner: "/images/temp/6810bf128ccda8.50485683.webp",
		path: "/leaks-floods-guide",
	},
];

export const Posts: React.FC = () => {
	const mainPost = POSTS[0];
	const sidePosts = POSTS.slice(1);

	return (
		<div className="bg-gray-lightest">
			<div className="mx-auto my-10 max-w-6xl space-y-16 px-5 py-10">
				{/* Header */}
				<SectionHeader category="Expert Advice" title="Advice hub" />

				{/* Content */}
				<div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row">
					{/* Main Post */}
					<div className="overflow-hidden rounded bg-white shadow lg:w-2/3">
						<AnimateOnScroll type="fadeInLeft">
							<img
								src={mainPost.banner}
								alt={mainPost.title}
								className="h-80 w-full object-cover"
								loading="lazy"
							/>
							<div className="space-y-4 p-6">
								<h4 className="font-bold text-3xl">{mainPost.title}</h4>
								<p className="text-xs">{mainPost.introduction}</p>
								<Button
									to={mainPost.path}
									as={Link}
									variant="secondary"
									icon={
										<ArrowRightIcon className="size-6 rounded-full border border-current p-1" />
									}
								>
									<span>Read more</span>
								</Button>
							</div>
						</AnimateOnScroll>
					</div>

					{/* Side Posts */}
					<div className="space-y-6 lg:w-1/3">
						{sidePosts.map((post) => (
							<AnimateOnScroll
								type="fadeInRight"
								key={post.title}
								className="flex items-start gap-4"
							>
								<div className="flex-1 space-y-6">
									<div className="space-y-1">
										<Link
											to={post.path}
											className="font-semibold text-lg transition-colors hover:text-teal"
										>
											{post.title}
										</Link>
										<p className="text-gray text-xs">{post.introduction}</p>
									</div>
									<Button
										to={post.path}
										as={Link}
										variant="ghost"
										size="none"
										className="text-xs"
									>
										Read more
									</Button>
								</div>
								<div className="shrink-0">
									<img
										src={post.banner}
										alt={post.title}
										className="size-30 rounded-full object-cover"
										loading="lazy"
									/>
								</div>
							</AnimateOnScroll>
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
