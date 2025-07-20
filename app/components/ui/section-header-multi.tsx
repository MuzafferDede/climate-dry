import { AnimateOnScroll } from "./animate-on-scroll";

type HeadingTag = "h1" | "h2" | "h3"  | "p";
type TitleTag = "h1" | "h2" | "h3"  | "p";

type SectionHeaderMultiProps = {
	category?: string;
	category_tag: HeadingTag;
	title: string;
	title_tag: TitleTag;
	description?: string;
};

export const SectionHeaderMulti = ({
	category,
	category_tag: CategoryTag,
	title,
	title_tag: TitleTag,
	description,
}: SectionHeaderMultiProps) => {
	return (
		<div className="mx-auto flex flex-col gap-8 text-center">
			<AnimateOnScroll className="flex flex-col gap-1">
				{category && (
					<CategoryTag className="font-bold text-teal uppercase">
					{category}
				</CategoryTag>
				)}
				<TitleTag className="text-5xl">{title}</TitleTag>
			</AnimateOnScroll>
			{description && (
				<AnimateOnScroll>
					<p className="mx-auto text-lg max-w-4xl">{description}</p>
				</AnimateOnScroll>
			)}
		</div>
	);
};
