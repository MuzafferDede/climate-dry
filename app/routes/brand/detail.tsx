import {} from "@heroicons/react/16/solid";
import { data } from "react-router";
import {
	addToCart,
	buildHeaders,
	getBrand,
	getBrandProducts,
	getSession,
} from "~/.server";
import { Breadcrumb, Button, ProductList } from "~/components";
import { type Brand, ToastType } from "~/types";
import { isNonEmptyArray, putToast } from "~/utils";
import type { Route } from "./+types/detail";

export const handle = {
	breadcrumb: (data: { brand: Brand }) => [
		{ label: "Our Brands", path: "/brands" },
		{ label: data.brand.name, path: `/brand/${data.brand.slug}` },
	],
};

export const meta = ({ data }: { data: { brand: Brand } }) => {
	const { brand } = data;
	if (!brand) return [];

	return [
		{ title: brand.meta_title },
		{
			name: "description",
			content: brand.meta_description,
		},
		{
			name: "keywords",
			content: [brand.meta_keywords || []].filter(Boolean).join(", "),
		},
	];
};

export async function loader({ request, params }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const url = new URL(request.url);

	const { slug } = params;

	const { response: brand, error } = await getBrand(session, slug);
	const { response: products } = await getBrandProducts(session, url, slug);

	if (error) throw new Response(error, { status: 404 });

	return {
		brand,
		products,
	};
}

export async function action({ request }: Route.ActionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const formData = await request.formData();

	const { response, error } = await addToCart(session, formData);

	putToast(session, {
		message: error || `${response.variant.product.name} added to cart.`,
		type: error ? ToastType.Error : ToastType.Success,
		action: {
			label: "View Cart",
			path: "/cart",
		},
	});

	return data(
		{ response },
		{
			headers: await buildHeaders(session),
		},
	);
}

export default function BrandPage({ loaderData }: Route.ComponentProps) {
	const { brand, products } = loaderData;

	return (
		<div className="space-y-8 py-8">
			<div className="mx-auto max-w-7xl space-y-8 px-5 ">
				<Breadcrumb />
				<div className="space-y-2">
					<h1 className="font-bold text-4xl text-navy-darkest">{brand.name}</h1>
					{brand.introduction && (
						<div
							className="prose prose-img:mx-auto prose-figcaption:hidden max-w-none prose-img:max-w-full"
							// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
							dangerouslySetInnerHTML={{ __html: brand.introduction }}
						/>
					)}
					<Button variant="plain" size="none" as="a" href="#description">
						Read More
					</Button>
				</div>
			</div>

			{isNonEmptyArray(products.data) && (
				<div className="relative isolate bg-gray-lightest">
					<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-8 lg:grid-cols-4">
						<main className="lg:col-span-4">
							<ProductList products={products} />
						</main>
					</div>
				</div>
			)}

			{brand.description && (
				<div className="mx-auto max-w-7xl scroll-mt-40" id="description">
					<div
						className="prose prose-img:mx-auto prose-figcaption:hidden max-w-none prose-img:max-w-full"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{ __html: brand.description }}
					/>
				</div>
			)}
		</div>
	);
}
