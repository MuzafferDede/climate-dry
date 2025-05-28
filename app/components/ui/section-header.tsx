import { AnimateOnScroll } from "./animate-on-scroll";

type SectionHeaderProps = {
	category: string;
	title: string;
	description?: string;
};

export const SectionHeader = ({
	category,
	title,
	description,
}: SectionHeaderProps) => {
	return (
		<div className="mx-auto flex flex-col gap-8 text-center">
			<AnimateOnScroll className="flex flex-col gap-1">
				<h2 className="font-bold text-teal uppercase">{category}</h2>
				<h3 className="text-5xl">{title}</h3>
			</AnimateOnScroll>
			{description && (
				<AnimateOnScroll>
					<p className="mx-auto text-lg">{description}</p>
				</AnimateOnScroll>
			)}
		</div>
	);
};
