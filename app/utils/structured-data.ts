import type { Product } from "~/types";

export const structured = (product: Product) => {
	return {
		"@context": "http://schema.org/",
		"@type": "Product",
		name: product.name,
		sku: product.default_variant.sku,
		description:
			product.description ?? product.introduction ?? product.meta_description,
		brand: {
			"@type": "Brand",
			name: product.brand?.name ?? "No Brand",
		},
		offers: {
			"@type": "Offer",
			itemCondition: "http://schema.org/NewCondition",
			availability: "http://schema.org/InStock",
			priceSpecification: {
				priceCurrency: "GBP",
				price: product.default_variant.price,
			},
		},
		image: product.images.map((image) => image.url),
	};
};
