import {
	ArrowRightIcon,
	BanknotesIcon,
	TruckIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import {
	Form,
	NavLink,
	href,
	useActionData,
	useNavigation,
} from "react-router";
import { AnimateOnScroll, Button, Image, Loading, Modal } from "~/components";
import type { Product } from "~/types";
import { calculateSave, cn, currency } from "~/utils";
import { Rating } from "./rating";
import { StockStatus } from "./stock-status";

export const ProductCard = ({
	id,
	brand,
	images,
	name,
	rating = 0,
	reviews = 0,
	slug,
	discount,
	most_popular,
	default_variant,
	variants,
	introduction,
}: Product) => {
	const actionData = useActionData();
	const [open, setOpen] = useState(false);
	const [submittingVariantId, setSubmittingVariantId] = useState<number | null>(
		null,
	);
	const navigation = useNavigation();

	const loading = navigation.state === "submitting";

	const hasVariants = variants.length > 1;

	const inStock = variants.some((variant) => variant.in_stock);

	useEffect(() => {
		if (actionData) {
			setOpen(false);
			setSubmittingVariantId(null);
		}
	}, [actionData]);

	return (
		<AnimateOnScroll
			threshold={0.1}
			className="@container boder relative isolate rounded-lg bg-white p-4 shadow-gray-light shadow-md transition-all hover:scale-105 hover:shadow-gray hover:shadow-xl"
		>
			<div className="absolute top-0 left-4 z-10 flex items-center px-4">
				{most_popular && (
					<span className="bg-teal px-2 py-1 text-white text-xs">
						Most Popular
					</span>
				)}
				{discount && (
					<span className=" bg-red px-2 py-1 text-white text-xs">Sale</span>
				)}
			</div>
			<div className="flex h-full flex-row @max-xl:flex-col @xl:gap-4 gap-1">
				<NavLink to={href("/product/:slug", { slug })}>
					<Image
						src={images[0].url}
						alt={name}
						className="@max-xl:h-full h-full @max-xl:w-full w-72 rounded-lg shadow-md"
					/>
				</NavLink>
				<div className="flex w-full grow flex-row @max-xl:flex-col justify-between gap-4">
					<div className="flex flex-col gap-2">
						<Rating rating={rating} reviewCount={reviews} />
						<div>
							<h3 className="font-bold text-teal uppercase">{brand.name}</h3>
							<h2 className="min-h-10">{name}</h2>
						</div>
						<div
							className="prose-sm @max-xl:hidden prose-li:list-disc prose-li:text-xs"
							// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
							dangerouslySetInnerHTML={{ __html: introduction }}
						/>
					</div>

					<div className="flex w-full @xl:max-w-56 grow flex-col @xl:justify-start justify-end gap-2">
						<div className="flex flex-col">
							<div className="flex items-end gap-1 font-bold">
								<span className="text-xl">
									{currency(default_variant.price)}
								</span>
								<span className="text-gray-light text-lg line-through">
									{currency(default_variant.retail_price)}
								</span>
							</div>
							<p className="font-bold text-red">
								save{" "}
								{calculateSave(
									default_variant.price,
									default_variant.retail_price,
								)}
								%
							</p>
							<div className="mt-2 flex @max-xl:hidden flex-col gap-2 rounded-lg bg-gray-lightest px-4 py-3">
								<div className="flex items-center gap-3 text-navy-darkest text-xxs">
									<BanknotesIcon className="size-4" />
									<span>Pay in 3 interest-free payments</span>
								</div>
								{Boolean(default_variant.premium_shipping_cost) && (
									<div className="flex items-center gap-3 text-navy-darkest text-xxs">
										<TruckIcon className="size-4" />
										<span>Rapid Delivery</span>
									</div>
								)}
							</div>
						</div>
						<StockStatus inStock={inStock} />

						<div className="mt-auto flex flex-col gap-2">
							<Form
								method="post"
								onSubmit={(e) =>
									(hasVariants || !inStock) && e.preventDefault()
								}
							>
								<Button
									name="id"
									disabled={!inStock}
									type={hasVariants ? "button" : "submit"}
									value={variants[0].id}
									loading={loading && submittingVariantId === id}
									onClick={() => {
										setOpen(hasVariants);
										setSubmittingVariantId(id);
									}}
									className="w-full"
									icon={
										<ArrowRightIcon className="size-6 rounded-full border border-current p-1" />
									}
								>
									<span>
										{variants.length > 1 ? "Choose a variant" : "Buy Now"}
									</span>
								</Button>
							</Form>
							<Button
								as={NavLink}
								to={href("/product/:slug", { slug })}
								variant="secondary"
								className="w-full"
								icon={
									<ArrowRightIcon className="size-6 rounded-full border border-current p-1" />
								}
							>
								<span>View Product</span>
							</Button>
						</div>
					</div>
				</div>

				{/* Variant Modal */}
				<Modal
					open={open}
					onClose={() => setOpen(false)}
					title="Choose a Variant"
				>
					<Form method="post">
						<div className="space-y-4">
							{variants.map((variant) => (
								<button
									name="id"
									value={variant.id}
									key={variant.id}
									type="submit"
									disabled={!variant.in_stock}
									onClick={() => setSubmittingVariantId(variant.id)}
									className={cn(
										"group er relative w-full cursor-po cursor-pointer overflow-hidden rounded-lg border border-gray-200 p-4 text-left shadow-sm transition-all",
										variant.in_stock
											? "hover:border-teal-500 hover:bg-teal-50"
											: "cursor-not-allowed opacity-50",
									)}
								>
									{loading && submittingVariantId === variant.id && (
										<div className="absolute inset-0 flex items-center justify-center bg-white">
											<Loading />
										</div>
									)}
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1 space-y-2">
											<p className="font-semibold text-gray-900 text-sm">
												{variant.sku}
											</p>

											<div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-600 text-sm">
												{variant.attributes.map((attr) => (
													<p key={attr.id}>
														<span className="font-medium">{attr.name}:</span>{" "}
														<span>{attr.value}</span>
													</p>
												))}
											</div>

											<div className="flex items-center gap-2">
												<p className="font-bold text-base text-teal-600">
													{currency(variant.price)}
												</p>
												{variant.retail_price > variant.price && (
													<p className="text-gray-400 text-sm line-through">
														{currency(variant.retail_price)}
													</p>
												)}
											</div>
										</div>

										{/* Placeholder for StockStatus or icon */}
										<div className="mt-1 shrink-0">
											<StockStatus inStock={variant.in_stock} />
										</div>
									</div>
								</button>
							))}
						</div>
					</Form>
				</Modal>
			</div>
		</AnimateOnScroll>
	);
};
