import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Popover,
	PopoverButton,
	PopoverGroup,
	PopoverPanel,
	useClose,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { NavLink, useRouteLoaderData } from "react-router";
import { useAppContext } from "~/contexts";
import type { loader } from "~/root";
import { mainExtras, mainNavigation } from "~/static";
import type { Navigation } from "~/types";
import { cn, isNonEmptyArray } from "~/utils";
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

	const Extras = ({ navigation }: { navigation: Navigation }) => {
		const found = mainExtras.find((item) => item.slug === navigation?.slug);

		const close = useClose();

		if (!found) return null;

		return (
			<div className="flex w-full flex-1 basis-0 flex-col gap-1">
				<span className="font-bold text-base text-teal uppercase transition-colors hover:text-navy-darkest">
					{found.name}
				</span>
				<ul className="grid w-full gap-1">
					{found.children?.map((child) => (
						<li key={child.slug}>
							<NavLink
								className={({ isActive }) =>
									cn(
										"transition-colors hover:text-teal",
										isActive && "font-bold text-teal",
									)
								}
								to={`/c/${child.slug}`}
								onClick={() => closeNavitaion(close)}
							>
								{child.name}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		);
	};

	return (
		<nav className="relative z-300 bg-white text-base shadow-sm md:z-200">
			{/* Container */}
			<div className="mx-auto max-w-7xl px-4">
				{/* Desktop Navigation */}
				<div className="hidden md:block">
					<PopoverGroup className="flex flex-wrap justify-start gap-5" as="div">
						{navigation.map((item) => {
							const hasChildren = Boolean(item.children);

							return (
								<Popover key={item.slug} className="group">
									{({ close }) =>
										hasChildren ? (
											<>
												<PopoverButton
													className={cn(
														"group flex cursor-pointer items-center justify-between gap-2 font-medium outline-none transition-colors hover:text-teal",
														"py-3 data-open:text-teal",
													)}
												>
													{item.name}

													{hasChildren && (
														<ChevronDownIcon
															className={cn(
																"h-5 w-5 transition-transform",
																"group-data-open:rotate-180",
															)}
														/>
													)}
												</PopoverButton>
												<PopoverPanel
													static
													as="div"
													className="fade-in slide-in-from-top-15 absolute inset-shadow-xs left-0 z-20 hidden w-full translate-y-0 animate-in items-start gap-5 rounded-b-lg data-open:flex"
												>
													<ul className="m-4 flex w-full flex-nowrap items-stretch divide-x divide-gray-light overflow-x-auto rounded-lg border border-gray bg-gray-lightest py-4 text-sm shadow-gray shadow-lg">
														{item.children?.map((child) => (
															<li
																key={child.slug}
																className="flex min-w-fit flex-1 basis-0 flex-col gap-2 px-6"
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

																<div className="flex gap-4">
																	<div className="flex w-full flex-1 basis-0 flex-col gap-1">
																		<NavLink
																			className={({ isActive }) =>
																				cn(
																					"font-bold text-base text-teal uppercase transition-colors hover:text-navy-darkest",
																					isActive && "font-bold text-teal",
																				)
																			}
																			to={`/c/${child.slug}`}
																			onClick={() => closeNavitaion(close)}
																		>
																			{child.name}
																		</NavLink>

																		{isNonEmptyArray(child.children) && (
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
																								"Small Dehumidifiers",
																								"Low Grain Dehumidifiers",
																								"Boat Dehumidifiers",
																							].includes(grandChild.name),
																					)
																					.slice(
																						0,
																						child.slug === "heaters"
																							? 3
																							: child.slug === "ventilation"
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
																		)}
																	</div>

																	{/* Optional extras */}
																	<Extras navigation={child} />
																</div>
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
														"flex cursor-pointer items-center justify-between gap-2 py-3 font-medium outline-none transition-colors",
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
						aria-label="Close"
					/>

					<div className="relative z-20 space-y-1 px-2 pt-2 pb-3">
						{navigation.map((item) => (
							<div key={item.slug} className="border-gray-lighter border-b">
								{isNonEmptyArray(item.children) ? (
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
																{isNonEmptyArray(child.children) ? (
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
