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
import { Suspense } from "react";
import { Await, NavLink, useRouteLoaderData } from "react-router";
import { Loading } from "~/components/ui";
import { useAppContext } from "~/contexts";
import { cn } from "~/lib/utils";
import type { NavigationItem } from "~/types";
/**
 * Navigation component that renders desktop and mobile navigation
 */
export const Navigation = () => {
	const data = useRouteLoaderData("root");

	const navigation: NavigationItem[] = data?.menu;

	const { state, updateState } = useAppContext();

	return (
		<Suspense
			fallback={
				<div className="flex h-10 w-full items-center justify-center p-6">
					<Loading />
				</div>
			}
		>
			<Await resolve={navigation}>
				{(nav) => (
					<nav className="bg-white shadow-sm">
						{/* Container */}
						<div className="mx-auto max-w-7xl px-4">
							{/* Desktop Navigation */}
							<div className="hidden md:block">
								<PopoverGroup className="flex flex-wrap justify-start gap-5 py-3">
									{nav.map((item) => {
										const hasChildren = Boolean(item.children);

										return (
											<Popover key={item.slug} className="relative">
												{({ open }) => (
													<>
														<PopoverButton
															className={cn(
																"flex cursor-pointer items-center justify-between gap-2 font-semibold outline-none transition-colors has-[span[data-active=true]]:text-teal",
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

														{hasChildren && (
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
																			{child.thumbnail_url && (
																				<NavLink
																					to={child.slug}
																					className="h-20 w-full"
																				>
																					<img
																						src={child.thumbnail_url}
																						alt={`${child.name} banner`}
																						className="h-full w-full rounded-lg object-cover shadow-sm"
																						loading="lazy"
																					/>
																				</NavLink>
																			)}
																			<NavLink
																				className="font-semibold text-teal uppercase transition-colors hover:text-navy-darkest"
																				to={child.slug}
																			>
																				{child.name}
																			</NavLink>
																			{child.children && (
																				<ul className="grid w-full gap-1">
																					{child.children.map((grandChild) => (
																						<li key={grandChild.slug}>
																							<NavLink
																								className="transition-colors hover:text-teal"
																								to={grandChild.slug}
																							>
																								{grandChild.name}
																							</NavLink>
																						</li>
																					))}
																				</ul>
																			)}
																		</li>
																	))}
																</ul>
															</PopoverPanel>
														)}
													</>
												)}
											</Popover>
										);
									})}
								</PopoverGroup>
							</div>

							{/* Mobile Navigation (Accordion) */}
							<div
								data-navigation-open={state.isNavigationOpen}
								className=" slide-in-from-left fixed inset-x-0 top-20 bottom-0 hidden overflow-auto scroll-smooth border-0 bg-white transition-all duration-300 ease-in-out data-[navigation-open=true]:block data-[navigation-open=true]:animate-in md:hidden data-[navigation-open=true]:md:hidden"
							>
								<button
									onClick={() =>
										updateState({ isNavigationOpen: !state.isNavigationOpen })
									}
									className="fixed inset-0"
									type="button"
								>
									<span className="sr-only">Close</span>
								</button>
								<div className="relative z-20 space-y-1 px-2 pt-2 pb-3">
									{nav.map((item) => (
										<div key={item.slug} className="border-gray-200 border-b">
											{item.children ? (
												<Disclosure as="div">
													{({ open }) => (
														<>
															<DisclosureButton
																className={cn(
																	"flex w-full items-center justify-between py-3 text-left font-medium",
																	open ? "text-teal" : "text-gray-900",
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
																										: "text-gray-800",
																								)}
																							>
																								<NavLink
																									className={cn(
																										open
																											? "pointer-events-auto"
																											: "pointer-events-none",
																									)}
																									to={child.slug}
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
																													to={grandChild.slug}
																													className="block py-1 text-gray-700 hover:text-teal"
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
																					to={child.slug}
																					className="block py-2 font-medium text-gray-800 hover:text-teal"
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
													className="block py-3 font-medium text-gray-900 hover:text-teal"
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
				)}
			</Await>
		</Suspense>
	);
};
