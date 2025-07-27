import { Form } from "react-router";
import type { Variant } from "~/types";
import { cn, currency } from "~/utils";
import { Modal } from "../ui";
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
            <Form method="post" onSubmit={() => setOpen(false)}>
                <input type="hidden" name="quantity" value={quantity} />
                <input type="hidden" name="_action" value="addToCart" />
                {extras.map((extra) => (
                    <input key={extra} type="hidden" name="extras[]" value={extra} />
                ))}

                <div className="space-y-4">
                    {variants.map((variant) => (
                        <VariantButton key={variant.id} variant={variant} />
                    ))}
                </div>
            </Form>
        </Modal>
    );
};

type VariantButtonProps = {
    variant: Variant;
};

const VariantButton = ({ variant }: VariantButtonProps) => {
    const isInStock = variant.in_stock;

    return (
        <button
            type="submit"
            name="id"
            value={variant.id}
            disabled={!isInStock}
            className={cn(
                "group relative w-full overflow-hidden rounded-lg border bg-stone-100 p-4 text-left shadow-sm transition-all",
                isInStock
                    ? "cursor-pointer border-gray-lighter hover:border-teal hover:bg-teal/10"
                    : "cursor-not-allowed border-gray-lighter opacity-50"
            )}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                    <p className="font-semibold text-navy-darkest text-sm capitalize">
                        <span>{variant.name}</span>
                        <span className="text-gray"> - </span>
                        <span className="text-teal">{variant.sku}</span>
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray text-sm">
                        {variant.attributes.map((attr) => (
                            <AttributeTag key={attr.id} name={attr.name} value={attr.value} />
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="font-bold text-base text-teal">
                            {currency(variant.price)}
                        </p>
                        {variant.retail_price > variant.price && (
                            <p className="text-gray text-sm line-through">
                                {currency(variant.retail_price)}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-1 shrink-0">
                    <StockStatus inStock={isInStock} />
                </div>
            </div>
        </button>
    );
};

const AttributeTag = ({ name, value }: { name: string; value: string }) => (
    <p className="flex gap-1 rounded-md bg-white px-2 py-1 shadow shadow-gray">
        <span className="font-medium text-green capitalize">{name}:</span>
        <span className="font-semibold text-navy-darkest">{value}</span>
    </p>
);
