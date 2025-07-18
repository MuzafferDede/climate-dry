import {
	Combobox,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { href, useFetcher, useNavigate } from "react-router";
import { Input } from "~/components/ui";
import { Loading } from "~/components/ui";
import type { loader } from "~/root";
import type { Product } from "~/types";
import { cn } from "~/utils";

export const Search = () => {
	const fetcher = useFetcher<typeof loader>();
	const products = (fetcher.data?.products?.data as Product[]) || [];
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	return (
		<div className="group-data-[show=true]/search:fade-in group-data-[show=true]/search:slide-in-from-top relative z-20 order-3 hidden w-full animate-in transition-all group-data-[show=true]/search:block md:order-2 md:block md:has-[input:focus]:scale-102 lg:max-w-2xl">
			<Combobox
				onChange={(product: Product) => {
					if (product) {
						navigate(href("/product/:slug", { slug: product.slug }));
					}
				}}
			>
				<div className="relative">
					<fetcher.Form method="get">
						<ComboboxInput
							as={Input}
							name="q"
							autoComplete="off"
							placeholder="Search products..."
							className="border-teal transition-all focus:shadow-sm focus:shadow-teal"
							onChange={(event) => {
								setQuery(event.target.value);
								fetcher.submit(event.currentTarget.form);
							}}
							displayValue={(product: Product) => product?.name || query}
						/>
						{fetcher.state === "loading" ? (
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<Loading className="size-6 text-teal" />
							</span>
						) : (
							<MagnifyingGlassIcon className="pointer-events-none absolute inset-y-0 right-0 m-2 size-6" />
						)}
					</fetcher.Form>
				</div>
				{products.length > 0 && (
					<ComboboxOptions className="absolute inset-x-0 top-full z-200 mt-1 max-h-96 overflow-auto rounded-lg border border-gray-light bg-white p-2 shadow-gray shadow-xl">
						{products.map((product) => (
							<ComboboxOption
								key={product.id}
								value={product}
								className={({ selected, focus }) =>
									cn(
										"flex cursor-pointer items-center gap-4 rounded-lg px-2 py-2 transition-colors",
										selected && "bg-teal/30 text-teal-900",
										focus && !selected && "bg-gray-100 text-teal-900",
										!(selected || focus) && "text-gray-900",
										"hover:bg-teal/30",
									)
								}
							>
								<div className="flex size-16 flex-shrink-0 items-center justify-center overflow-hidden rounded border border-gray-light bg-gray-50">
									{product.images?.[0]?.url ? (
										<img
											src={product.images[0].url}
											alt={product.name}
											className="h-full w-full object-cover"
										/>
									) : (
										<span className="text-gray-300 text-xs">No Image</span>
									)}
								</div>
								<div className="min-w-0 flex-1">
									{product.brand?.name && (
										<div className="mb-0.5 truncate font-medium text-gray-500 text-xs">
											{product.brand.name}
										</div>
									)}
									<div className="flex justify-between gap-1 truncate font-semibold text-base text-gray-900">
										<span>{product.name}</span>
										<span className="py-1 text-gray text-xs">
											SKU: {product.default_variant.sku}
										</span>
									</div>
									<div className="mt-0.5 font-bold text-sm text-teal-700">
										£{product.default_variant?.price?.toFixed(2) ?? "-"}
									</div>
								</div>
							</ComboboxOption>
						))}
					</ComboboxOptions>
				)}
				{query && fetcher.state !== "loading" && products.length === 0 && (
					<ComboboxOptions className="absolute inset-x-0 top-full z-200 mt-1 max-h-96 overflow-auto rounded-lg border border-gray-light bg-white p-5 text-center font-semibold text-gray shadow-gray shadow-xl">
						<div>No results found</div>
					</ComboboxOptions>
				)}
			</Combobox>
		</div>
	);
};
