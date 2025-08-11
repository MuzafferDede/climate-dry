import { ArrowRightIcon, ShoppingCartIcon } from "@heroicons/react/16/solid";
import { Form, NavLink, href, useMatch, useNavigation } from "react-router";
import type { Variant } from "~/types";
import { Button, Modal } from "../ui";
import { Price } from "./price";
import { StockStatus } from "./stock-status";

type VariantSelectorProps = {
	extras?: number[];
	open: boolean;
	quantity?: number;
	setOpen: (value: boolean) => void;
	variants: Variant[];
};

export const VariantSelector = ({
	open,
	setOpen,
	quantity = 1,
	variants,
	extras = [],
}: VariantSelectorProps) => {
	return (
		<Modal open={open} onClose={() => setOpen(false)} title="Choose a Variant">
			<Form method="post" onSubmit={() => setOpen(false)} className="space-y-4">
				<input type="hidden" name="quantity" value={quantity} />
				<input type="hidden" name="_action" value="addToCart" />
				{extras.map((extra) => (
					<input key={extra} type="hidden" name="extras[]" value={extra} />
				))}

				<div className="space-y-6">
					{variants.map((variant) => (
						<VariantCard key={variant.id} variant={variant} />
					))}
				</div>
			</Form>
		</Modal>
	);
};

type VariantCardProps = {
	variant: Variant;
};

const VariantCard = ({ variant }: VariantCardProps) => {
	const isInStock = variant.in_stock;
	const match = useMatch("/p/:slug");
	const navigation = useNavigation();
	const id = navigation?.formData?.get("id");

	const loading = id !== null && id !== undefined && Number(id) === variant.id;

	return (
		<div className="space-y-3 rounded-lg border border-gray-lighter bg-white p-4 shadow-sm hover:hover:border-teal/70 hover:shadow-lg">
			<header className="flex flex-wrap items-center gap-2 font-semibold text-navy-darkest text-sm capitalize">
				<span>{variant.name}</span>
				<span className="text-gray">-</span>
				<span className="text-teal">{variant.sku}</span>
			</header>
			<div className="flex flex-col justify-between gap-2 md:flex-row">
				<div className="flex flex-wrap items-start gap-2">
					{variant.attributes.map((attr) => (
						<AttributeTag key={attr.id} name={attr.name} value={attr.value} />
					))}
				</div>

				<div className="flex flex-col gap-2">
					<div className="flex flex-col gap-1">
						<Price variant={variant} />
						<StockStatus inStock={isInStock} />
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-between gap-2 md:flex-row">
				{!match && (
					<Button
						as={NavLink}
						to={href("/p/:slug", { slug: variant.product.slug })}
						variant="secondary"
						icon={
							<ArrowRightIcon className="size-6 rounded-full border border-current p-1" />
						}
					>
						<span>Find out more</span>
					</Button>
				)}
				<Button
					title={`Add ${variant.sku} to basket`}
					name="id"
					value={variant.id}
					disabled={!isInStock}
					type="submit"
					variant="destructive"
					className="ml-auto w-full md:w-auto"
					icon={
						<ShoppingCartIcon className="size-6 rounded-full border border-current p-1" />
					}
					loading={loading}
				>
					<span>Add to Basket</span>
				</Button>
			</div>
		</div>
	);
};

const AttributeTag = ({ name, value }: { name: string; value: string }) => (
	<p className="flex items-center gap-1 rounded-md border border-gray-light bg-white px-2 py-1 text-sm">
		<span className="font-semibold text-green uppercase">{name}:</span>
		<span className="font-medium text-navy-darkest/70">{value}</span>
	</p>
);
