import { } from "@headlessui/react";
import { ArrowRightIcon, ShoppingCartIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Form, NavLink, href, useNavigation, useLocation } from "react-router";
import { Button, Image, Price, VariantSelector } from "~/components";
import type { Product } from "~/types";
import { structured } from "~/utils";
import { PaymentAndShipping } from "../ui/payment-and-shipping";
import { Rating } from "./rating";
import { StockStatus } from "./stock-status";

export const ProductCard = (product: Product) => {
	const {
		brand,
		images,
		name,
		reviews,
		slug,
		discount,
		most_popular,
		default_variant,
		variants,
		introduction,
	} = product;

	const [open, setOpen] = useState(false);

	const hasVariants = variants.length > 1;

	const inStock = variants.some((variant) => variant.in_stock);

	const navigation = useNavigation();

	const id = navigation?.formData?.get("id");

	const loading =
		id !== null && id !== undefined && Number(id) === default_variant.id;

	const location = useLocation();
	const isHome = location.pathname === "/";
	// change heading depending on if coming from home page
	const HeadingTag = isHome ? "h4" : "h2";

	return (
		<div className="[&>div]:h-full">
			<div className="@container boder relative isolate h-full rounded-lg bg-white p-4 shadow-gray-light shadow-md transition-all hover:scale-102 hover:shadow-gray hover:shadow-lg">
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
					<NavLink to={href("/p/:slug", { slug })}>
						<Image
							src={
								images?.[0]?.url ??
								"https://fls-9f649510-70dd-40c4-a4b9-572dc5dbe23e.laravel.cloud/productcategory/59/thumbnail/temp.jpg"
							}
							alt={name}
							className="aspect-square @max-xl:h-full h-full @max-xl:w-full w-72 rounded-lg shadow-md"
						/>
					</NavLink>
					<div className="flex w-full grow flex-row @max-xl:flex-col justify-between gap-4">
						<div className="flex flex-col gap-2">
							<Rating rating={reviews.rating} reviewCount={reviews.count} />
							<div>
								<p className="font-bold text-teal uppercase">
									{brand?.name ?? "No Brand"}
								</p>
								<HeadingTag className="min-h-10 capitalize">{name}</HeadingTag>
							</div>
							<div
								className="prose-sm @max-xl:hidden prose-li:list-disc prose-li:text-xs"
								// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
								dangerouslySetInnerHTML={{ __html: introduction }}
							/>
						</div>

						<div className="flex w-full @xl:max-w-56 grow flex-col @xl:justify-start justify-end gap-2">
							<div className="flex flex-col">
								<Price variant={default_variant} />
								<PaymentAndShipping
									freeShipping={Boolean(default_variant.free_shipping)}
									premiumShipping={Boolean(
										default_variant.premium_shipping_cost,
									)}
									className="mt-2 @max-xl:hidden"
								/>
							</div>
							<StockStatus inStock={inStock} />
							<div className="@xl:mt-auto flex flex-col gap-2">
								<Form
									method="post"
									onSubmit={(e) =>
										(hasVariants || !inStock) && e.preventDefault()
									}
								>
									<input
										type="hidden"
										name="quantity"
										id="quantity"
										value={1}
									/>
									<Button
										name="id"
										disabled={!inStock}
										type={hasVariants ? "button" : "submit"}
										value={default_variant.id}
										onClick={() => {
											setOpen(hasVariants);
										}}
										variant="destructive"
										className="w-full"
										icon={
											<ShoppingCartIcon className="size-6 rounded-full border border-current p-1" />
										}
										loading={loading}
									>
										<span>
											{hasVariants ? "Choose a variant" : "Add to Basket"}
										</span>
									</Button>
								</Form>
								<Button
									as={NavLink}
									to={href("/p/:slug", { slug })}
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

					<VariantSelector
						variants={variants}
						open={open}
						setOpen={setOpen}
						quantity={1}
					/>
				</div>
			</div>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structured(product)),
				}}
			/>
		</div>
	);
};
