import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Popover,
	PopoverButton,
	PopoverGroup,
	PopoverPanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { NavLink, useRouteLoaderData } from "react-router";
import { useAppContext } from "~/contexts";
import type { loader } from "~/root";
import { mainNavigation } from "~/static";
import type { Navigation } from "~/types";
import { cn } from "~/utils";
/**
 * Navigation component that renders desktop and mobile navigation
 */
export const MainNavigation = () => {
	const rootData = useRouteLoaderData<typeof loader>("root");

	const menu = rootData?.menu;

	const { state, updateState } = useAppContext();

	const closeNavitaion = (close?: () => void) => {
		updateState({ isNavigationOpen: false });
		if (close) {
			close();
		}
	};

	const navigation: Navigation[] = [
		{ slug: "/", name: "Our Products", children: menu?.data },
		...mainNavigation,
	];

	return (
		<nav className="relative z-300 bg-white text-base shadow-sm md:z-200">
			{/* Container */}
			<div className="mx-auto max-w-7xl px-4">
				{/* Desktop Navigation */}
				<div className="hidden md:block">
					<PopoverGroup className="flex flex-wrap justify-start gap-5 py-3">
						{navigation.map((item) => {
							const hasChildren = Boolean(item.children);

							return (
								<Popover key={item.slug} className="relative">
									{({ open, close }) =>
										hasChildren ? (
											<>
												<PopoverButton
													className={cn(
														"flex cursor-pointer items-center justify-between gap-2 font-medium outline-none transition-colors",
														open ? "text-teal" : "hover:text-teal",
													)}
												>
													{item.name}

													{hasChildren && (
														<ChevronDownIcon
															className={cn(
																"h-5 w-5 transition-transform",
																open ? "rotate-180" : "",
															)}
														/>
													)}
												</PopoverButton>
												<PopoverPanel
													as="div"
													className="fade-in slide-in-from-top-15 absolute inset-shadow-xs left-0 z-20 flex w-full translate-y-3 animate-in items-start gap-5 rounded-b-lg bg-white p-3 shadow-xl"
													anchor="bottom start"
												>
													<ul className="flex w-full items-start gap-1">
														{item.children?.map((child) => (
															<li
																key={child.slug}
																className="grid w-full gap-1"
															>
																{child.banner_url && (
																	<NavLink
																		to={`/c/${child.slug}`}
																		className={({ isActive }) =>
																			cn(
																				"h-20 w-full",
																				isActive && "font-bold text-teal",
																			)
																		}
																		onClick={() => closeNavitaion(close)}
																	>
																		<img
																			src={child.banner_url}
																			alt={`${child.name} banner`}
																			className="h-full w-full rounded-lg object-cover shadow-sm"
																			loading="lazy"
																		/>
																	</NavLink>
																)}
																<NavLink
																	className={({ isActive }) =>
																		cn(
																			"font-bold text-teal uppercase transition-colors hover:text-navy-darkest",
																			isActive && "font-bold text-teal",
																		)
																	}
																	to={`/c/${child.slug}`}
																	onClick={() => closeNavitaion(close)}
																>
																	{child.name}
																</NavLink>
																{/*  Temporary nav, this will fetch solutions assoc categories */}
																{child.children && (
																	<div>
																		<ul className="grid w-full gap-1">
																			{child.children
																				.filter(
																					(grandChild) =>
																						![
																							"Basement Dehumidifiers",
																							"Cellar Dehumidifiers",
																							"Classic Car Dehumidifiers",
																							"Construction Dehumidifiers",
																							"Drying Room Dehumidifiers",
																							"Factory Dehumidifiers",
																							"Garage Dehumidifiers",
																							"Laundry Dehumidifiers",
																							"Loft Dehumidifiers",
																							"Storage Dehumidifiers",
																							"Warehouse Dehumidifiers",
																							"Water Damage Dehumidifiers",
																							"Workshop Dehumidifiers",
																							//'Portable Dehumidifiers',
																							"Small Dehumidifiers",
																							"Low Grain Dehumidifiers",
																							//'Desiccant Dehumidifiers',
																							//'Refrigerant Dehumidifiers',
																							//'Wall Mounted Dehumidifiers',
																							"Boat Dehumidifiers",
																						].includes(grandChild.name),
																				)
																				.slice(
																					0,
																					child.slug === "heaters"
																						? 3
																						: undefined,
																				)
																				.slice(
																					0,
																					child.slug === "ventilation"
																						? 4
																						: undefined,
																				)

																				.map((grandChild) => (
																					<li key={grandChild.slug}>
																						<NavLink
																							className={({ isActive }) =>
																								cn(
																									"transition-colors hover:text-teal",
																									isActive &&
																										"font-bold text-teal",
																								)
																							}
																							to={`/c/${grandChild.slug}`}
																							onClick={() =>
																								closeNavitaion(close)
																							}
																						>
																							{grandChild.name}
																						</NavLink>
																					</li>
																				))}
																		</ul>
																		{child.slug === "dehumidifiers" && (
																			<div>
																				<p className="pt-4 font-bold text-teal uppercase transition-colors hover:text-navy-darkest">
																					Find your solution
																				</p>
																				<ul>
																					<li>
																						<a
																							href="/c/basement-dehumidifiers/"
																							data-gtm="Dehumidifiers &gt; Basement Dehumidifiers"
																							title="Basement Dehumidifiers"
																						>
																							Basement
																						</a>
																					</li>
																					<li>
																						<a
																							href="/c/boat-dehumidifiers/"
																							data-gtm="Dehumidifiers &gt; Boat Dehumidifiers"
																							title="Boat Dehumidifiers"
																						>
																							Boat
																						</a>
																					</li>
																					<li>
																						<a
																							href="/c/cellar-dehumidifiers/"
																							data-gtm="Dehumidifiers &gt; Cellar Dehumidifiers"
																							title="Cellar Dehumidifiers"
																						>
																							Cellar
																						</a>
																					</li>
																					<li>
																						<a
																							href="/c/classic-car-dehumidifiers/"
																							data-gtm="Dehumidifiers &gt; Classic Car Dehumidifiers"
																							title="Classic Car Dehumidifiers"
																						>
																							Classic Car
																						</a>
																					</li>
																					<li>
																						<a
																							href="/c/construction-dehumidifiers/"
																							data-gtm="Dehumidifiers &gt; Construction Dehumidifiers"
																							title="Construction Dehumidifiers"
																						>
																							Construction
																						</a>
																					</li>
																					<li>
																						<a
																							href="/c/drying-room-dehumidifiers/"
																							data-gtm="Dehumidifiers &gt; Drying Room Dehumidifiers"
																							title="Drying Room Dehumidifiers"
																						>
																							Drying Room
																						</a>
																					</li>
																					<li>
																						<a
																							href="/c/factory-dehumidifiers/"
																							data-gtm="Dehumidifiers &gt; Factory Dehumidifiers"
																							title="Factory Dehumidifiers"
																						>
																							Factory
																						</a>
																					</li>
																					<li>
																						<a
																							href="/c/small-dehumidifiers/"
																							data-gtm="Dehumidifiers &gt; Small Dehumidifiers"
																							title="Small Dehumidifiers"
																						>
																							Small Spaces
																						</a>
																					</li>
																					<li>
																						<a
																							href="/c/garage-dehumidifiers/"
																							data-gtm="Dehumidifiers &gt; Garage Dehumidifiers"
																							title="Garage Dehumidifiers"
																						>
																							Garage
																						</a>
																					</li>
																					<li>
																						<a
																							href="/c/laundry-dehumidifiers/"
																							data-gtm="Dehumidifiers &gt; Laundry Dehumidifiers"
																							title="Laundry Dehumidifiers"
																						>
																							Laundry
																						</a>
																					</li>
																					<li>
																						<a
																							href="/c/loft-dehumidifiers/"
																							data-gtm="Dehumidifiers &gt; Loft Dehumidifiers"
																							title="Loft Dehumidifiers"
																						>
																							Loft
																						</a>
																					</li>
																					<li>
																						<a
																							href="/c/storage-dehumidifiers/"
																							data-gtm="Dehumidifiers &gt; Storage Dehumidifiers"
																							title="Storage Dehumidifiers"
																						>
																							Storage
																						</a>
																					</li>
																					<li>
																						<a
																							href="/c/warehouse-dehumidifiers/"
																							data-gtm="Dehumidifiers &gt; Warehouse Dehumidifiers"
																							title="Warehouse Dehumidifiers"
																						>
																							Warehouse
																						</a>
																					</li>
																					<li>
																						<a
																							href="/c/water-damage-dehumidifiers/"
																							data-gtm="Dehumidifiers &gt; Water Damage Dehumidifiers"
																							title="Water Damage Dehumidifiers"
																						>
																							Water Damage
																						</a>
																					</li>
																					<li>
																						<a
																							href="/c/workshop-dehumidifiers/"
																							data-gtm="Dehumidifiers &gt; Workshop Dehumidifiers"
																							title="Workshop Dehumidifiers"
																						>
																							Workshop
																						</a>
																					</li>{" "}
																				</ul>
																			</div>
																		)}
																	</div>
																)}
															</li>
														))}
													</ul>
												</PopoverPanel>
											</>
										) : (
											<NavLink
												to={item.slug}
												className={({ isActive }) =>
													cn(
														"flex cursor-pointer items-center justify-between gap-2 font-medium outline-none transition-colors",
														isActive && "text-teal",
													)
												}
											>
												{item.name}
											</NavLink>
										)
									}
								</Popover>
							);
						})}
					</PopoverGroup>
				</div>

				{/* Mobile Navigation (Accordion) */}
				<div
					data-navigation-open={state.isNavigationOpen}
					className="slide-in-from-right fixed top-0 right-0 bottom-0 left-12 isolate z-200 hidden overflow-auto scroll-smooth border-0 bg-white shadow-lg transition-all duration-300 ease-in-out data-[navigation-open=true]:block data-[navigation-open=true]:animate-in md:hidden data-[navigation-open=true]:md:hidden"
				>
					<button
						onClick={() =>
							updateState({ isNavigationOpen: !state.isNavigationOpen })
						}
						className="fixed inset-y-0 top-20 left-0 z-10 w-12 backdrop-blur-md"
						type="button"
					>
						<span className="sr-only">Close</span>
					</button>
					<div className="relative z-20 space-y-1 px-2 pt-2 pb-3">
						{navigation.map((item) => (
							<div key={item.slug} className="border-gray-lighter border-b">
								{item.children ? (
									<Disclosure as="div">
										{({ open }) => (
											<>
												<DisclosureButton
													className={cn(
														"flex w-full items-center justify-between py-3 text-left font-medium",
														open ? "text-teal" : "text-navy-darkest",
													)}
												>
													{item.name}
													<ChevronDownIcon
														className={cn(
															"h-5 w-5 transition-transform",
															open ? "rotate-180" : "",
														)}
													/>
												</DisclosureButton>
												<DisclosurePanel className="fade-in slide-in-from-top-10 animate-in pb-2 pl-4">
													<ul className="space-y-2">
														{item.children?.map((child) => (
															<li key={child.slug}>
																{child.children ? (
																	<Disclosure>
																		{({ open }) => (
																			<>
																				<DisclosureButton
																					className={cn(
																						"flex w-full items-center justify-between py-2 text-left font-medium",
																						open
																							? "text-teal"
																							: "text-navy-darkest",
																					)}
																				>
																					<NavLink
																						className={({ isActive }) =>
																							cn(
																								open
																									? "pointer-events-auto"
																									: "pointer-events-none",
																								isActive &&
																									"font-bold text-teal",
																							)
																						}
																						to={`/c/${child.slug}`}
																						onClick={() => closeNavitaion()}
																					>
																						{child.name}
																					</NavLink>
																					<ChevronDownIcon
																						className={cn(
																							"h-4 w-4 transition-transform",
																							open ? "rotate-180" : "",
																						)}
																					/>
																				</DisclosureButton>
																				<DisclosurePanel className="fade-in slide-in-from-top-10 animate-in pb-2 pl-4">
																					<ul className="space-y-1">
																						{child.children?.map(
																							(grandChild) => (
																								<li key={grandChild.slug}>
																									<NavLink
																										to={`/c/${grandChild.slug}`}
																										onClick={() =>
																											closeNavitaion()
																										}
																										className={({ isActive }) =>
																											cn(
																												"block py-1 text-gray-dark hover:text-teal",
																												isActive && "text-teal",
																											)
																										}
																									>
																										{grandChild.name}
																									</NavLink>
																								</li>
																							),
																						)}
																					</ul>
																				</DisclosurePanel>
																			</>
																		)}
																	</Disclosure>
																) : (
																	<NavLink
																		to={`/c/${child.slug}`}
																		onClick={() => closeNavitaion()}
																		className={({ isActive }) =>
																			cn(
																				"block py-2 font-medium text-navy-darkest hover:text-teal",
																				isActive && "font-bold text-teal",
																			)
																		}
																	>
																		{child.name}
																	</NavLink>
																)}
															</li>
														))}
													</ul>
												</DisclosurePanel>
											</>
										)}
									</Disclosure>
								) : (
									<NavLink
										to={item.slug}
										onClick={() => closeNavitaion()}
										className={({ isActive }) =>
											cn(
												"block py-3 font-medium text-navy-darkest hover:text-teal",
												isActive && "font-bold text-teal",
											)
										}
									>
										{item.name}
									</NavLink>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</nav>
	);
};
