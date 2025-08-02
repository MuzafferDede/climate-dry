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
import type { Solution } from "~/types";

export const Solutions = ({ solutions }: { solutions: Solution[] }) => {
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
						as="div"
						value={selectedIndex}
						onChange={setSelectedIndex}
					>
						<ListboxButton
							as={AnimateOnScroll}
							className="relative w-xs rounded border bg-white p-4 text-left font-semibold"
						>
							<span>{solutions[selectedIndex].name}</span>
							<span className="absolute inset-y-0 right-2 flex items-center justify-center">
								<ChevronDownIcon className="size-6" />
							</span>
						</ListboxButton>
						<ListboxOptions
							anchor="bottom"
							className="w-xs overflow-auto rounded border bg-white shadow-lg"
						>
							{solutions.map((solution, index) => (
								<ListboxOption
									key={solution.name}
									value={index}
									className="cursor-pointer px-4 py-2 hover:bg-gray-lighter"
								>
									{solution.name}
								</ListboxOption>
							))}
						</ListboxOptions>
					</Listbox>
					<TabList className="hidden grid-cols-2 gap-x-4 self-start lg:grid">
						{solutions.map((solution) => (
							<Tab
								key={solution.name}
								className="w-full cursor-pointer border-white border-b py-2.5 text-left font-semibold outline-0 hover:text-teal data-selected:text-teal"
							>
								{solution.name}
							</Tab>
						))}
					</TabList>
					<TabPanels
						as={AnimateOnScroll}
						className="bg-white"
						type="fadeInRight"
					>
						{solutions.map((solution) => (
							<TabPanel
								key={solution.name}
								className="flex h-full flex-col justify-between"
							>
								<div>
									<img
										loading="lazy"
										className="h-56 w-full object-cover"
										src={solution.banner_url}
										alt={solution.name || "image"}
									/>
									<div className="space-y-6 p-8">
										<h3 className="font-bold text-3xl">{solution.name}</h3>
										<div
											// biome-ignore lint/security/noDangerouslySetInnerHtml: safe backend HTML
											dangerouslySetInnerHTML={{
												__html: solution.introduction,
											}}
										/>
									</div>
								</div>
								<div className="p-8">
									<Link to={`/solution/${solution.slug}`}>
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
					<Button as={Link} to="/solution/agriculture" variant="outline">
						Visit the solutions centre
					</Button>
				</div>
			</div>
		</div>
	);
};
