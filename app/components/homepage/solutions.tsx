import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Tab,
	TabGroup,
	TabList,
	TabPanel,
	TabPanels,
} from "@headlessui/react";
import { ArrowRightIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Link } from "react-router";
import { AnimateOnScroll, Button, SectionHeader } from "~/components";

type Solution = {
	name: string;
	slug: string;
	introduction?: string;
	image: string;
};

const SOLUTIONS: Solution[] = [
	{
		name: "Agriculture",
		slug: "agriculture",
		introduction:
			"Few industries rely on a consistent climate as much as agriculture. Whether it's livestock, greenhouses, or crop drying, maintaining precise conditions is crucial.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Basements",
		slug: "basements",
		introduction:
			"Basements are prone to damp and mould, making climate control vital for maintaining dry and usable space.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Breweries",
		slug: "breweries",
		introduction:
			"Temperature and humidity control are essential in brewing environments to ensure product quality and consistency.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Cellars",
		slug: "cellars",
		introduction:
			"Cellars benefit from controlled humidity and temperature to preserve wine, food, or archived items.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Classic Car Storage",
		slug: "classic-car-storage",
		introduction:
			"Protect valuable vehicles from moisture and condensation damage with consistent climate conditions.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Condensation",
		slug: "condensation",
		introduction:
			"Combat condensation issues in any environment with tailored climate management solutions.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Construction & Decorating",
		slug: "construction-decorating",
		introduction:
			"Speed up drying times for plaster, paint, and other materials while ensuring safety and compliance.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Damp & Mould",
		slug: "damp-mould",
		introduction:
			"Effectively prevent and manage damp and mould in residential, commercial, or industrial spaces.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Data Centres",
		slug: "data-centres",
		introduction:
			"Ensure operational reliability and equipment longevity with precise temperature and humidity control.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Drying Rooms",
		slug: "drying-rooms",
		introduction:
			"Create efficient drying spaces for clothing, gear, and materials across various industries.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Factories",
		slug: "factories",
		introduction:
			"Enhance worker comfort and production quality by managing factory climates effectively.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Food & Drink Production",
		slug: "food-drink-production",
		introduction:
			"Maintain strict hygiene and production standards through controlled temperature and air quality.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Garages",
		slug: "garages",
		introduction:
			"Keep tools, vehicles, and spaces dry and rust-free with targeted humidity control.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "IT & Electronics",
		slug: "it-electronics",
		introduction:
			"Protect sensitive electronics from moisture and overheating in IT environments.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Lofts & Attics",
		slug: "lofts-attics",
		introduction:
			"Prevent condensation and protect insulation or stored items in lofts and attic spaces.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Manufacturing",
		slug: "manufacturing",
		introduction:
			"Consistent climate conditions help improve product quality and reduce downtime in manufacturing.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Pharmaceutical",
		slug: "pharmaceutical",
		introduction:
			"Maintain strict environmental controls to support production and storage of pharmaceutical products.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Storage & Preservation",
		slug: "storage-preservation",
		introduction:
			"Protect sensitive or valuable items from environmental damage in storage conditions.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Warehouses",
		slug: "warehouses",
		introduction:
			"Improve storage conditions and reduce moisture damage with efficient warehouse climate control.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Water Damage Restoration",
		slug: "water-damage-restoration",
		introduction:
			"Accelerate drying and recovery efforts in flood- or leak-damaged environments.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Workshops",
		slug: "workshops",
		introduction:
			"Create a comfortable and moisture-free workspace for crafts, repairs, and industrial work.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Heritage Sites",
		slug: "heritage-sites",
		introduction:
			"Preserve fragile artefacts and structures by managing humidity and temperature carefully.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Shipping Containers",
		slug: "shipping-containers",
		introduction:
			"Prevent condensation and protect stored goods with proper container climate control.",
		image: "/images/temp/solution.webp",
	},
	{
		name: "Museums & Galleries",
		slug: "museums-galleries",
		introduction:
			"Preserve artworks and exhibits with strict control over environmental conditions.",
		image: "/images/temp/solution.webp",
	},
];

export const Solutions = () => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	return (
		<div className="bg-gray-lightest">
			<div className="mx-auto max-w-6xl space-y-8 px-5 py-16">
				<div className="mx-auto max-w-5xl space-y-8">
					<SectionHeader
						category="Solutions Centre"
						title="Find the right solution for you"
						description="We've compiled solutions for your businesses, storage
								requirements and humidity control in one handy guide"
					/>
				</div>
				<TabGroup
					className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-0"
					selectedIndex={selectedIndex}
					onChange={setSelectedIndex}
				>
					<Listbox
						className="mx-auto lg:hidden"
						as={AnimateOnScroll}
						value={selectedIndex}
						onChange={setSelectedIndex}
					>
						<ListboxButton className="relative w-xs rounded border bg-white p-4 text-left font-semibold">
							<span>{SOLUTIONS[selectedIndex].name}</span>
							<span className="absolute inset-y-0 right-2 flex items-center justify-center">
								<ChevronDownIcon className="size-6" />
							</span>
						</ListboxButton>
						<ListboxOptions
							anchor="bottom"
							className="w-xs overflow-auto rounded border bg-white shadow-lg"
						>
							{SOLUTIONS.map((solution, index) => (
								<ListboxOption
									key={solution.name}
									value={index}
									className="cursor-pointer px-4 py-2 hover:bg-gray-200"
								>
									{solution.name}
								</ListboxOption>
							))}
						</ListboxOptions>
					</Listbox>
					<TabList className="hidden grid-cols-2 gap-x-4 self-start lg:grid">
						{SOLUTIONS.map((solution) => (
							<AnimateOnScroll
								key={solution.name}
								type="fadeInLeft"
								threshold={0}
							>
								<Tab className="w-full cursor-pointer border-white border-b py-2.5 text-left font-semibold outline-0 hover:text-teal data-selected:text-teal">
									{solution.name}
								</Tab>
							</AnimateOnScroll>
						))}
					</TabList>
					<TabPanels
						as={AnimateOnScroll}
						className="bg-white"
						type="fadeInRight"
					>
						{SOLUTIONS.map((solution) => (
							<TabPanel
								key={solution.name}
								className="flex h-full flex-col justify-between"
							>
								<div>
									<img
										loading="lazy"
										className="h-56 w-full object-cover"
										src={solution.image}
										alt={solution.name}
									/>
									<div className="space-y-6 p-8">
										<h3 className="font-bold text-3xl">{solution.name}</h3>
										{solution.introduction && <p>{solution.introduction}</p>}
									</div>
								</div>
								<div className="p-8">
									<Link to={solution.slug}>
										<Button
											variant="secondary"
											icon={
												<ArrowRightIcon className="size-6 rounded-full border border-current p-1" />
											}
										>
											<span>See products</span>
										</Button>
									</Link>
								</div>
							</TabPanel>
						))}
					</TabPanels>
				</TabGroup>
				<div className="text-center">
					<Button
						as={Link}
						variant="outline"
						className="hover:text-teal"
						to="/"
					>
						Visit the solutions centre
					</Button>
				</div>
			</div>
		</div>
	);
};
