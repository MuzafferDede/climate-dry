import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Link } from "react-router";
import { Button, ProductCard, SectionHeader } from "~/components";

const CATEGORIES = [
	{
		name: "Commercial",
		products: [
			{
				sale: true,
				image: "images/temp/product.webp",
				brand: "Dantherm",
				name: "CDF 10 Wall Mounted Dehumidifier",
				reviews: 0,
				rating: 0,
				price: 1606.24,
				retail_price: 1918,
				in_stock: true,
				slug: "/",
			},
			{
				sale: true,
				image: "images/temp/product.webp",
				brand: "Ebac",
				name: "PowerDry 21L Commercial Dehumidifier",
				reviews: 12,
				rating: 3,
				price: 1349.99,
				retail_price: 1550,
				in_stock: true,
				slug: "/",
			},
			{
				sale: false,
				image: "images/temp/product.webp",
				brand: "Meaco",
				name: "DryAir Pro 50L Industrial Dehumidifier",
				reviews: 8,
				rating: 5,
				price: 2000,
				retail_price: 2112,
				in_stock: false,
				slug: "/",
			},
			{
				sale: true,
				image: "images/temp/product.webp",
				brand: "Woods",
				name: "WCD8HG Heavy Duty Wall Mounted Dehumidifier",
				reviews: 3,
				rating: 1,
				price: 1899.0,
				retail_price: 2199.0,
				in_stock: true,
				slug: "/",
			},
		],
	},
	{
		name: "Domestic",
		products: [
			{
				sale: false,
				image: "images/temp/product.webp",
				brand: "Meaco",
				name: "MeacoDry ABC 12L Dehumidifier",
				reviews: 120,
				rating: 4,
				price: 169.99,
				retail_price: 199.99,
				in_stock: true,
				slug: "/",
			},
			{
				sale: true,
				image: "images/temp/product.webp",
				brand: "Pro Breeze",
				name: "Ultra Quiet Mini Dehumidifier",
				reviews: 47,
				rating: 4,
				price: 59.99,
				retail_price: 79.99,
				in_stock: true,
				slug: "/",
			},
			{
				sale: false,
				image: "images/temp/product.webp",
				brand: "EcoAir",
				name: "DD1 Simple Desiccant Dehumidifier",
				reviews: 21,
				rating: 3,
				price: 139.99,
				retail_price: 149.99,
				in_stock: false,
				slug: "/",
			},
			{
				sale: true,
				image: "images/temp/product.webp",
				brand: "Inventor",
				name: "Fresh 12L Compact Dehumidifier",
				reviews: 10,
				rating: 4,
				price: 125.0,
				retail_price: 145.0,
				in_stock: true,
				slug: "/",
			},
		],
	},
	{
		name: "Industrial",
		products: [
			{
				sale: true,
				image: "images/temp/product.webp",
				brand: "Trotec",
				name: "TTK 175 S Industrial Dehumidifier",
				reviews: 5,
				rating: 5,
				price: 2199.0,
				retail_price: 2399.0,
				in_stock: true,
				slug: "/",
			},
			{
				sale: false,
				image: "images/temp/product.webp",
				brand: "Dri-Eaz",
				name: "Revolution LGR Dehumidifier",
				reviews: 15,
				rating: 4,
				price: 1850.0,
				retail_price: 2000.0,
				in_stock: false,
				slug: "/",
			},
			{
				sale: true,
				image: "images/temp/product.webp",
				brand: "Phoenix",
				name: "DryMAX XL Commercial Dehumidifier",
				reviews: 9,
				rating: 3,
				price: 2349.0,
				retail_price: 2549.0,
				in_stock: true,
				slug: "/",
			},
			{
				sale: true,
				image: "images/temp/product.webp",
				brand: "Ebac",
				name: "Neptune Industrial Dehumidifier",
				reviews: 4,
				rating: 2,
				price: 1995.5,
				retail_price: 2100,
				in_stock: true,
				slug: "/",
			},
		],
	},
];

export const HumidityReducers = () => {
	return (
		<div className="space-y-8 px-5 py-16">
			<SectionHeader
				category="Our Top Humidity Reducers"
				title="Dehumidifiers"
			/>
			<TabGroup className="isolate mx-auto max-w-7xl">
				<TabList className="scrollbar-hidden mx-auto flex max-w-min snap-x snap-mandatory justify-items-center overflow-auto pb-px">
					{CATEGORIES.map((category) => (
						<Tab
							className=" z-10 translate-y-px cursor-pointer snap-center border-gray-lighter border-b px-3 py-2.5 text-base outline-none transition-all duration-300 data-selected:border-black data-selected:text-teal lg:text-lg"
							key={category.name}
						>
							{category.name}
						</Tab>
					))}
				</TabList>
				<TabPanels className="py-8">
					{CATEGORIES.map((category) => (
						<TabPanel
							key={category.name}
							className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
						>
							{category.products.map((product) => (
								<ProductCard {...product} key={product.name} />
							))}
						</TabPanel>
					))}
				</TabPanels>
				<div className="text-center">
					<Button
						as={Link}
						variant="outline"
						className="hover:text-teal"
						to="/"
					>
						Shop All
					</Button>
				</div>
			</TabGroup>
		</div>
	);
};
