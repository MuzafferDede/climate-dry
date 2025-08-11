import {} from "@heroicons/react/16/solid";
import { data } from "react-router";
import { addToCart, buildHeaders, getPromotion, getSession } from "~/.server";
import { Breadcrumb, Image, ProductList } from "~/components";
import { type Promotion, ToastType } from "~/types";
import { isNonEmptyArray, putToast } from "~/utils";
import type { Route } from "./+types/detail";

export const handle = {
	breadcrumb: (data: { promotion: Promotion }) => [
		{
			label: data.promotion?.name,
			path: `/promotions/${data?.promotion?.slug}`,
		},
	],
};

export const meta = ({ data }: { data: { promotion: Promotion } }) => {
	const { promotion } = data;
	if (!promotion) return [];

	return [
		{ title: data.promotion.name },
		{
			name: "description",
			content: data.promotion.description,
		},
		{
			name: "keywords",
			content: ["promotions"].filter(Boolean).join(", "),
		},
	];
};

export async function loader({ request, params }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));

	const { slug } = params;

	const { response: promotion, error } = await getPromotion(session, slug);

	if (error) throw new Response(error, { status: 404 });

	return {
		promotion,
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
	const { promotion } = loaderData;

	return (
		<div className="space-y-8 py-8">
			<div className="mx-auto max-w-7xl space-y-8 px-5 ">
				<Breadcrumb />
				<div className="space-y-2">
					<h1 className="font-bold text-4xl text-navy-darkest">
						{promotion?.name}
					</h1>
					<div className="flex flex-col gap-4">
						<Image className="w-full" src={promotion.cover_url} />
						{promotion?.description && (
							<div className="w-full">
								<div
									className="prose prose-img:mx-auto prose-figcaption:hidden max-w-none prose-img:max-w-full"
									// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
									dangerouslySetInnerHTML={{ __html: promotion.description }}
								/>
							</div>
						)}
					</div>
				</div>
			</div>

			{isNonEmptyArray(promotion?.products) && (
				<div className="relative isolate bg-gray-lightest">
					<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-8 lg:grid-cols-4">
						<main className="lg:col-span-4">
							<ProductList products={{ data: promotion?.products }} />
						</main>
					</div>
				</div>
			)}
		</div>
	);
}
