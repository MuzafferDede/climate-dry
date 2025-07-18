import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
	ArrowRightIcon,
	CalculatorIcon,
	MinusIcon,
	PlusIcon,
} from "@heroicons/react/16/solid";
import {
	ArrowTopRightOnSquareIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	PlayIcon,
	ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Form, data, useNavigation } from "react-router";
import {
	Breadcrumb,
	Button,
	Image,
	Input,
	Loading,
	Modal,
	PaymentAndShipping,
	ProductCard,
	Rating,
	StockStatus,
	Table,
	TableBody,
	TableCell,
	TableCellSecondary,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components";
import {
	addToCart,
	commitSession,
	getProduct,
	getSession,
	putToast,
} from "~/services";
import { type Product, ToastType, type Variant } from "~/types";
import {
	calculateSave,
	currency,
	generateBreadcrumb,
	pluralize,
} from "~/utils";

export async function loader({
	params,
	request,
}: { params: { slug?: string }; request: Request }) {
	const { slug } = params;
	const { data: product } = await getProduct(request, slug);
	if (!product) throw new Response("Not found", { status: 404 });
	return { product };
}

export async function action({ request }: { request: Request }) {
	const session = await getSession(request.headers.get("Cookie"));
	try {
		const result = await addToCart(request);
		putToast(session, {
			message: `${result.variant.product.name} added to cart.`,
			type: ToastType.Success,
			action: {
				label: "View Cart",
				path: "/cart",
			},
		});
		return data(
			{ result },
			{
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			},
		);
	} catch (error) {
		putToast(session, {
			message: error instanceof Error ? error.message : String(error),
			type: ToastType.Error,
		});
		return data(
			{ error: error instanceof Error ? error.message : String(error) },
			{
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			},
		);
	}
}

export const handle = {
	breadcrumb: (data: { product: Product }) => {
		const { product } = data;
		const ancestry: { name: string; slug: string }[] = [];
		let current = product.category?.parent;
		while (current) {
			ancestry.unshift({ name: current.name, slug: current.slug });
			current = current.parent;
		}
		const categoryCrumbs = generateBreadcrumb(
			[
				...ancestry,
				{ name: product.category.name, slug: product.category.slug },
			],
			"/c",
		);
		return [
			...categoryCrumbs,
			{ label: product.name, path: `/p/${product.slug}` },
		];
	},
};

export const meta = ({ data }: { data: { product: Product } }) => {
	if (!data?.product) return [];
	const { product } = data;
	return [
		{ title: product.meta_title },
		{
			name: "description",
			content: product.meta_description,
		},
		{
			name: "keywords",
			content: [product.meta_keywords || []].filter(Boolean).join(", "),
		},
	];
};

export default function ProductPage({
	loaderData,
}: { loaderData: { product: Product } }) {
	const { product } = loaderData;
	const navigation = useNavigation();
	const [quantity, setQuantity] = useState(1);
	const [activeIndex, setActiveIndex] = useState(0);
	const [selectedExtras, setSelectedExtras] = useState<number[]>([]);

	const inStock = product.variants.some((v: Variant) => v.in_stock);
	const loading = navigation.state === "submitting";
	const hasVariants = product.variants.length > 1;
	const [open, setOpen] = useState(false);
	const [submittingVariantId, setSubmittingVariantId] = useState<number | null>(
		null,
	);

	// Combine images and videos into a single media array
	const media = [
		...product.images.map((img) => ({ ...img, type: "image" as const })),
		...(product.videos || []).map((video, index) => ({
			...video,
			id: `video-${index}`,
			order: product.images.length + index,
			type: "video" as const,
		})),
	].sort((a, b) => a.order - b.order);

	// Helper function to extract YouTube video ID from URL
	const getYouTubeVideoId = (url: string) => {
		const regExp =
			/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : null;
	};

	const handlePrev = () => {
		setActiveIndex((prev) => (prev > 0 ? prev - 1 : media.length - 1));
	};

	const handleNext = () => {
		setActiveIndex((prev) => (prev < media.length - 1 ? prev + 1 : 0));
	};

	useEffect(() => {
		if (!loading) {
			setOpen(false);
			setSubmittingVariantId(null);
		}
	}, [loading]);

	return (
		<div>
			<div className="mx-auto max-w-7xl space-y-8 px-5 py-8">
				<div className="mb-4 md:col-span-2">
					<Breadcrumb />
				</div>
				<div className="flex flex-col gap-8 lg:flex-row">
					{/* Left: Image Carousel */}
					<div className="mb-6 flex w-full flex-col items-center lg:mb-0 lg:max-w-md">
						<div className="relative flex w-full flex-col items-center lg:max-w-md">
							{product.discount && (
								<span className="absolute top-0 left-4 z-10 rounded bg-red px-2 py-1 text-white text-xs">
									Sale
								</span>
							)}
							<div className="relative w-full">
								{media.length > 1 && (
									<>
										<button
											type="button"
											aria-label="Previous image"
											onClick={handlePrev}
											className="-translate-y-1/2 absolute top-1/2 left-2 z-10 rounded-full bg-white/90 p-2 shadow-lg transition-all duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-teal/50"
										>
											<ChevronLeftIcon className="h-5 w-5 text-navy-darkest" />
										</button>
										<button
											type="button"
											aria-label="Next image"
											onClick={handleNext}
											className="-translate-y-1/2 absolute top-1/2 right-2 z-10 rounded-full bg-white/90 p-2 shadow-lg transition-all duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-teal/50"
										>
											<ChevronRightIcon className="h-5 w-5 text-navy-darkest" />
										</button>
									</>
								)}
								<div className="w-full">
									{media[activeIndex]?.type === "video" ? (
										<div className="fade-in h-64 w-full animate-in rounded-lg bg-gray-lightest shadow duration-300 sm:h-80 md:h-96">
											{(() => {
												const videoId = getYouTubeVideoId(
													media[activeIndex]?.url || "",
												);
												return videoId ? (
													<iframe
														key={activeIndex}
														className="h-full w-full rounded-lg"
														src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
														title={`${product.name} - Video`}
														frameBorder="0"
														allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
														allowFullScreen
													/>
												) : (
													<div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-light">
														<p className="text-gray">Invalid video URL</p>
													</div>
												);
											})()}
										</div>
									) : (
										<Image
											key={activeIndex}
											src={media[activeIndex]?.url}
											alt={product.name}
											className="fade-in h-64 w-full animate-in rounded-lg bg-white object-contain shadow duration-300 sm:h-80 md:h-96"
										/>
									)}
								</div>
							</div>
							{media.length > 1 && (
								<div className="mt-4 flex w-full flex-wrap justify-center gap-2">
									{media.map((item, idx: number) => (
										<button
											key={item.id}
											type="button"
											aria-label={`Show ${item.type} ${idx + 1}`}
											onClick={() => setActiveIndex(idx)}
											className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
												activeIndex === idx
													? "border-teal ring-2 ring-teal/20"
													: "border-gray-lighter hover:border-gray-light"
											}`}
										>
											{item.type === "video" ? (
												<>
													<div className="h-16 w-16 bg-gray-light">
														{(() => {
															const videoId = getYouTubeVideoId(item.url);
															return videoId ? (
																<img
																	src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
																	alt={`${product.name} video thumbnail`}
																	className="h-full w-full object-cover"
																/>
															) : (
																<div className="flex h-full w-full items-center justify-center bg-gray-light">
																	<PlayIcon className="h-6 w-6 text-gray" />
																</div>
															);
														})()}
													</div>
													<div className="absolute inset-0 flex items-center justify-center bg-black/20">
														<PlayIcon className="h-6 w-6 text-white drop-shadow-lg" />
													</div>
												</>
											) : (
												<Image
													src={item.url}
													alt={product.name}
													className="h-16 w-16 bg-white object-contain"
												/>
											)}
										</button>
									))}
								</div>
							)}
						</div>
					</div>
					{/* Right: Product Details */}
					<div className="flex w-full flex-col justify-between gap-x-6 gap-y-2 md:flex-row">
						{/* Left column: Brand, Name, Rating, Introduction */}
						<div className="flex w-full grow flex-col gap-2">
							<div>
								<h3 className="font-bold text-sm text-teal uppercase sm:text-base">
									{product.brand.name}
								</h3>
								<h1 className="font-bold text-2xl capitalize leading-tight sm:text-3xl">
									{product.name}
								</h1>
								<h2 className="text-sm capitalize">
									{product.default_variant.name}
								</h2>
							</div>
							<Rating rating={product.rating} reviewCount={product.reviews} />
							<div
								className="prose-sm prose-li:list-disc"
								// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
								dangerouslySetInnerHTML={{ __html: product.introduction }}
							/>
							<div className="space-y-4 py-4">
								<Button
									icon={
										<CalculatorIcon className="size-6 rounded-full border border-current p-1" />
									}
									variant="secondary"
								>
									<span>Drying Calculator</span>
								</Button>
								<div className="flex gap-4">
									{product.warranty_period > 0 && (
										<div className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-lightest p-3 font-semibold text-teal">
											<ShieldCheckIcon className="size-8" />
											<span className="flex flex-col text-center">
												<span className="flex justify-center gap-1">
													<span>{product.warranty_period}</span>
													{pluralize(product.warranty_period, "Year")}{" "}
												</span>
												<span>Warranty</span>
											</span>
										</div>
									)}
									<div className="inline-flex w-full flex-col items-center rounded-lg bg-gray-lightest p-3 font-semibold text-teal">
										<span className="flex justify-center gap-1 text-navy-darkest">
											Call for advice
										</span>
										<a href="tel:0808 196 6381">0808 196 6381</a>
									</div>
								</div>
							</div>
						</div>
						{/* Right column: Price, Discount, Payment/Shipping, Stock, Actions */}
						<div className="flex shrink-0 flex-col items-end gap-2 md:w-72">
							<div className="flex flex-col items-end gap-1">
								<div className="flex items-end gap-2 font-bold">
									<span className="text-xl sm:text-2xl">
										{currency(product.default_variant.price)}
									</span>
									<span className="text-base text-gray-light line-through sm:text-lg">
										{currency(product.default_variant.retail_price)}
									</span>
								</div>
								{product.discount && (
									<p className="font-bold text-red">
										save{" "}
										{calculateSave(
											product.default_variant.price,
											product.default_variant.retail_price,
										)}
										%
									</p>
								)}
								<div className="flex gap-1">
									<span>
										{currency(
											product.tax_amount + product.default_variant.price,
										)}
									</span>
									<span>(inc VAT)</span>
								</div>
							</div>
							<PaymentAndShipping
								freeShipping={Boolean(product.default_variant.free_shipping)}
								premiumShipping={Boolean(
									product.default_variant.premium_shipping_cost,
								)}
							/>

							{/* Optional Extras Section */}
							{product.extra_products && product.extra_products.length > 0 && (
								<div className="my-4 w-full">
									<p className="mb-2 font-semibold text-navy-darkest/70 text-sm">
										Optional Extras
									</p>
									<div className="flex flex-col items-start gap-1">
										{product.extra_products.map((extra) => {
											const extraInStock = extra.default_variant?.in_stock;
											const checked = selectedExtras.includes(extra.id);
											return (
												<label
													key={extra.id}
													className={`flex items-start gap-2 text-sm ${extraInStock ? "cursor-pointer text-navy-darkest" : "cursor-not-allowed text-gray-light opacity-70"}`}
												>
													<input
														type="checkbox"
														className="my-0.5 h-4 w-4 accent-teal"
														checked={checked}
														onChange={() => {
															setSelectedExtras((prev) =>
																prev.includes(extra.id)
																	? prev.filter((id) => id !== extra.id)
																	: [...prev, extra.id],
															);
														}}
														name="extras[]"
														value={extra.id}
														disabled={!extraInStock}
													/>
													<span className="inline-flex flex-1 items-start gap-1 capitalize">
														<span>{extra.name}</span>
														{extraInStock && extra.default_variant?.price ? (
															<span className="shrink-0 text-teal">
																(+ {currency(extra.default_variant?.price)})
															</span>
														) : null}
														{!extraInStock && (
															<span className="align-middle font-semibold text-red/50 text-xs">
																(Out of stock)
															</span>
														)}
														<a
															href={`/p/${extra.slug}`}
															target="_blank"
															rel="noopener noreferrer"
															className="ml-1 inline-flex items-center text-gray-light transition-colors hover:text-teal"
															aria-label={`View ${extra.name} details`}
															tabIndex={extraInStock ? 0 : -1}
															title="View product detail"
														>
															<ArrowTopRightOnSquareIcon className="h-4 w-4" />
														</a>
													</span>
												</label>
											);
										})}
									</div>
								</div>
							)}

							{/* Quantity and Add to Basket */}
							<Form
								method="post"
								className="mt-2 flex w-full flex-col gap-4"
								onSubmit={(e) => {
									if (hasVariants || !inStock) {
										e.preventDefault();
										setOpen(hasVariants);
									}
								}}
							>
								{/* Hidden extras input for form submission */}
								{selectedExtras.map((id) => (
									<input key={id} type="hidden" name="extras[]" value={id} />
								))}
								<div className="flex w-full items-center gap-2">
									<div className="flex items-center rounded-lg border border-gray-lighter bg-white shadow-sm">
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={() => setQuantity((q) => Math.max(1, q - 1))}
											aria-label="Decrease quantity"
											disabled={quantity <= 1 || !inStock}
											className="rounded-r-none rounded-l-lg border-0 hover:bg-gray-light"
										>
											<MinusIcon className="h-4 w-4" />
										</Button>
										<Input
											id="quantity-input"
											type="number"
											name="quantity"
											min={1}
											value={quantity}
											onChange={(e) => setQuantity(Number(e.target.value))}
											className="w-16 border-0 bg-transparent text-center font-semibold focus:outline-none focus:ring-0"
											aria-label="Quantity"
											disabled={!inStock}
										/>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={() => setQuantity((q) => q + 1)}
											aria-label="Increase quantity"
											disabled={!inStock}
											className="rounded-r-lg rounded-l-none border-0 hover:bg-gray-lightest"
										>
											<PlusIcon className="h-4 w-4" />
										</Button>
									</div>
								</div>
								<Button
									name="id"
									value={product.default_variant.id}
									type={hasVariants ? "button" : "submit"}
									disabled={!inStock}
									loading={loading}
									className="w-full"
									icon={
										<ArrowRightIcon className="size-6 rounded-full border border-current p-1" />
									}
									onClick={() => {
										if (hasVariants) setOpen(true);
									}}
								>
									<span>
										{hasVariants ? "Choose a variant" : "Add to Basket"}
									</span>
								</Button>
								<StockStatus inStock={inStock} />
								<img
									className="mx-auto mt-5 w-full max-w-xs sm:max-w-full"
									src="/images/layout/payments/all-color.webp"
									alt="All cards"
								/>
							</Form>
						</div>
					</div>
				</div>
				<Modal
					open={open}
					onClose={() => setOpen(false)}
					title="Choose a Variant"
				>
					<Form method="post">
						<input
							type="hidden"
							name="quantity"
							id="quantity"
							value={quantity}
						/>
						{/* Hidden extras input for form submission */}
						{selectedExtras.map((id) => (
							<input key={id} type="hidden" name="extras[]" value={id} />
						))}
						<div className="space-y-4">
							{product.variants.map((variant) => (
								<button
									name="id"
									value={variant.id}
									key={variant.id}
									type="submit"
									disabled={!variant.in_stock}
									onClick={() => setSubmittingVariantId(variant.id)}
									className={`group relative w-full cursor-pointer overflow-hidden rounded-lg border border-gray-lighter p-4 text-left shadow-sm transition-all ${variant.in_stock ? "hover:border-teal hover:bg-teal/10" : "cursor-not-allowed opacity-50"}`}
								>
									{loading && submittingVariantId === variant.id && (
										<div className="absolute inset-0 flex items-center justify-center bg-white">
											<Loading className="h-6 w-6 text-teal" />
										</div>
									)}
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1 space-y-2">
											<p className="font-semibold text-navy-darkest text-sm">
												<span className="capitalize">{variant.name}</span> -
												<span className="text-teal">{variant.sku}</span>
											</p>
											<div className="flex flex-wrap gap-x-4 gap-y-1 text-navy-darkest/70 text-sm">
												{variant.attributes.map((attr) => (
													<p key={attr.id}>
														<span className="font-medium">{attr.name}:</span>{" "}
														<span>{attr.value}</span>
													</p>
												))}
											</div>
											<div className="flex items-center gap-2">
												<p className="font-bold text-base text-teal">
													{currency(variant.price)}
												</p>
												{variant.retail_price > variant.price && (
													<p className="text-gray-light text-sm line-through">
														{currency(variant.retail_price)}
													</p>
												)}
											</div>
										</div>
										<div className="mt-1 shrink-0">
											<StockStatus inStock={variant.in_stock} />
										</div>
									</div>
								</button>
							))}
						</div>
					</Form>
				</Modal>

				{/* Tabs Section */}
				{(product.description ||
					(product.specifications && product.specifications.length > 0) ||
					(product.features && product.features.length > 0)) && (
					<div className="mx-auto mt-10 max-w-7xl px-2 sm:px-4">
						<TabGroup>
							<TabList className="mb-4 flex flex-wrap gap-2 border-gray-lighter border-b">
								{product.description && (
									<Tab className="border-transparent border-b-2 px-4 py-2 font-semibold text-sm transition-colors duration-150 hover:text-navy-darkest focus:outline-none data-selected:border-teal data-selected:text-teal">
										Description
									</Tab>
								)}
								{product.specifications &&
									product.specifications.length > 0 && (
										<Tab className="border-transparent border-b-2 px-4 py-2 font-semibold text-sm transition-colors duration-150 hover:text-navy-darkest focus:outline-none data-selected:border-teal data-selected:text-teal">
											Specifications
										</Tab>
									)}
								{product.features && product.features.length > 0 && (
									<Tab className="border-transparent border-b-2 px-4 py-2 font-semibold text-sm transition-colors duration-150 hover:text-navy-darkest focus:outline-none data-selected:border-teal data-selected:text-teal">
										Features
									</Tab>
								)}
							</TabList>
							<TabPanels>
								{product.description && (
									<TabPanel className="fade-in slide-in-from-top-5 animate-in">
										<h2 className="mb-4 font-bold text-2xl text-navy-darkest">
											Description
										</h2>
										<div
											className="prose prose-sm lg:prose !max-w-none prose-img:mx-auto prose-figcaption:hidden prose-img:max-w-full"
											// biome-ignore lint/security/noDangerouslySetInnerHtml: trusted HTML from backend
											dangerouslySetInnerHTML={{ __html: product.description }}
										/>
									</TabPanel>
								)}
								{product.specifications &&
									product.specifications.length > 0 && (
										<TabPanel className="fade-in slide-in-from-top-5 animate-in">
											<h2 className="mb-4 font-bold text-2xl text-navy-darkest">
												Specifications
											</h2>
											<Table>
												<TableHead>
													<TableRow>
														<TableHeader>Specification</TableHeader>
														<TableHeader>Detail</TableHeader>
													</TableRow>
												</TableHead>
												<TableBody>
													{product.specifications.map((spec, idx) => (
														<TableRow key={spec.key || idx}>
															<TableCellSecondary>
																{spec.key}
															</TableCellSecondary>
															<TableCell>{spec.value}</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</TabPanel>
									)}
								{product.features && product.features.length > 0 && (
									<TabPanel className="fade-in slide-in-from-top-5 animate-in">
										<h2 className="mb-4 font-bold text-2xl text-navy-darkest">
											Features
										</h2>
										<Table>
											<TableHead>
												<TableRow>
													<TableHeader>Feature</TableHeader>
													<TableHeader>Detail</TableHeader>
												</TableRow>
											</TableHead>
											<TableBody>
												{product.features.map((feature, idx) => (
													<TableRow key={feature.key || idx}>
														<TableCellSecondary>
															{feature.key}
														</TableCellSecondary>
														<TableCell>{feature.value}</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</TabPanel>
								)}
							</TabPanels>
						</TabGroup>
					</div>
				)}
			</div>
			{/* Similar Products Section */}
			{product.related_products && product.related_products.length > 0 && (
				<section className="w-full bg-gray-lightest py-16">
					<div className="mx-auto max-w-7xl px-2 sm:px-4">
						<div className="mb-8 text-center">
							<p className="mb-2 font-semibold text-sm text-teal uppercase tracking-widest">
								You might also like these
							</p>
							<h2 className="font-bold text-4xl text-navy-darkest">
								Similar Products
							</h2>
						</div>
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{product.related_products.map((relatedProduct) => (
								<ProductCard key={relatedProduct.id} {...relatedProduct} />
							))}
						</div>
					</div>
				</section>
			)}
		</div>
	);
}
