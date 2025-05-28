import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";
import { calculateSave, currency } from "~/utils";
import { AnimateOnScroll, Button } from "../ui";
import { Rating } from "./rating";
import { StockStatus } from "./stock-status";

type ProductCardProps = {
	brand: string;
	image: string;
	in_stock: boolean;
	name: string;
	popular?: boolean;
	price: number;
	rating: number;
	retail_price: number;
	reviews: number;
	sale?: boolean;
	slug: string;
};

export const ProductCard = ({
	brand,
	image,
	in_stock,
	name,
	price,
	rating = 0,
	retail_price,
	reviews = 0,
	sale,
	slug,
}: ProductCardProps) => {
	return (
		<AnimateOnScroll
			threshold={0.1}
			className="boder relative rounded-lg bg-white p-6 shadow transition-all hover:scale-105 hover:shadow-2xl"
		>
			{sale && (
				<span className="absolute top-0 left-4 bg-red px-2 py-1 text-white">
					Sale
				</span>
			)}
			<div className="flex h-full flex-col">
				<div className="h-64 w-full">
					<img src={image} alt={name} className="h-full w-full object-cover" />
				</div>
				<div className="flex flex-1 flex-col justify-between gap-4">
					<div className="flex flex-col gap-2">
						<Rating rating={rating} reviewCount={reviews} />
						<div>
							<h3 className="font-bold text-teal uppercase">{brand}</h3>
							<h2 className="min-h-10">{name}</h2>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div>
							<div className="flex flex-col">
								<div className="flex items-end gap-1 font-bold">
									<span className="text-xl">{currency(price)}</span>
									<span className="text-gray-light text-lg line-through">
										{currency(retail_price)}
									</span>
								</div>
								<p className="font-bold text-red">
									save {calculateSave(price, retail_price)}%
								</p>
							</div>
						</div>
						<StockStatus inStock={in_stock} />
						<div className="flex flex-col gap-2">
							<Link to={slug}>
								<Button
									className="w-full"
									icon={
										<ArrowRightIcon className="size-6 rounded-full border border-current p-1" />
									}
								>
									<span>But Now</span>
								</Button>
							</Link>
							<Link to={slug}>
								<Button
									variant="secondary"
									className="w-full"
									icon={
										<ArrowRightIcon className="size-6 rounded-full border border-current p-1" />
									}
								>
									<span>View Product</span>
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</AnimateOnScroll>
	);
};
