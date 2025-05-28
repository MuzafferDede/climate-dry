import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";
import { Button } from "~/components";

export interface ServiceProps {
	logo?: string;
	title: string;
	description: string;
	phone?: string;
	image: string;
	link: string;
}

export const Service: React.FC<ServiceProps> = ({
	logo,
	title,
	description,
	phone,
	image,
	link,
}) => {
	return (
		<div className="group flex bg-navy-darkest text-white">
			<div className="relative flex w-full flex-col gap-2 p-6 pb-10">
				<h2 className="flex flex-col gap-1 font-bold text-xl md:text-3xl">
					{logo && (
						<div>
							<img className="h-auto w-auto" src={logo} alt={title} />
						</div>
					)}
					<span>{title}</span>
				</h2>
				<p className="text-xs md:text-sm">{description}</p>
				{phone && (
					<a
						className="font-bold text-teal text-xl md:text-3xl"
						href={`tel:${phone}`}
					>
						{phone}
					</a>
				)}
				<Link to={link}>
					<Button
						variant="outline"
						size="icon"
						animation="zoom"
						className="absolute right-2 bottom-2 text-white hover:bg-white hover:text-navy-darkest"
						icon={<ArrowRightIcon className="size-4" />}
					/>
				</Link>
			</div>
			<div className="w-2/5 shrink-0 overflow-hidden">
				<img
					className="aspect-square h-full w-full object-cover transition-transform duration-300 group-hover:rotate-2 group-hover:scale-105"
					src={image}
					alt={title}
				/>
			</div>
		</div>
	);
};
