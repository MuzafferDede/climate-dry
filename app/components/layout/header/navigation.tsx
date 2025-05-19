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
import { Await, Link, useRouteLoaderData } from "react-router";
import { Loading } from "~/components/ui";
import { useAppContext } from "~/contexts";
import { cn } from "~/lib/utils";
import type { NavigationItem } from "~/types";
/**
 * Navigation component that renders desktop and mobile navigation
 */
export const Navigation = () => {
	const data = useRouteLoaderData("pages/layout");

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
						<div className="container mx-auto px-4">
							{/* Desktop Navigation */}
							<div className="hidden md:block">
								<PopoverGroup className="flex flex-wrap justify-start gap-5 py-3">
									{nav.map((item) => {
										const hasChildren = Boolean(item.children);

										return (
											<Popover key={item.path} className="relative">
												{({ open }) => (
													<>
														<PopoverButton
															className={cn(
																"flex cursor-pointer items-center justify-between gap-2 font-semibold outline-none transition-colors",
																open ? "text-cyan-600" : "hover:text-cyan-600",
															)}
														>
															<Link
																className={cn(
																	!hasChildren || open
																		? "pointer-events-auto"
																		: "pointer-events-none",
																)}
																to={item.path}
															>
																{item.label}
															</Link>
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
																className="fade-in slide-in-from-top-15 transy4 absolute inset-shadow-xs left-0 z-20 grid w-max translate-y-3 animate-in gap-2 rounded-b-lg bg-white p-3 shadow-xl"
																anchor="bottom start"
															>
																{item.banner && (
																	<Link to={item.banner.url}>
																		<img
																			src={item.banner.image}
																			alt={`${item.label} banner`}
																			className="h-28 w-full rounded-lg object-cover shadow-sm"
																			loading="lazy"
																		/>
																	</Link>
																)}
																<ul className="flex grid-cols-[1fr_auto] items-start gap-3">
																	{item.children?.map((child) => (
																		<li
																			key={child.path}
																			className="grid w-full min-w-64 gap-1"
																		>
																			<Link
																				className="font-semibold text-cyan-700 transition-colors hover:text-cyan-600"
																				to={child.path}
																			>
																				{child.label}
																			</Link>
																			{child.children && (
																				<ul className="grid w-full gap-1 font-semibold text-sm">
																					{child.children.map((grandChild) => (
																						<li key={grandChild.path}>
																							<Link
																								className="transition-colors hover:text-cyan-600"
																								to={grandChild.path}
																							>
																								{grandChild.label}
																							</Link>
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
										<div key={item.path} className="border-gray-200 border-b">
											{item.children ? (
												<Disclosure as="div">
													{({ open }) => (
														<>
															<DisclosureButton
																className={cn(
																	"flex w-full items-center justify-between py-3 text-left font-medium",
																	open ? "text-cyan-600" : "text-gray-900",
																)}
															>
																<Link
																	className={cn(
																		open
																			? "pointer-events-auto"
																			: "pointer-events-none",
																	)}
																	to={item.path}
																>
																	{item.label}
																</Link>
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
																		<li key={child.path}>
																			{child.children ? (
																				<Disclosure>
																					{({ open }) => (
																						<>
																							<DisclosureButton
																								className={cn(
																									"flex w-full items-center justify-between py-2 text-left font-medium",
																									open
																										? "text-cyan-600"
																										: "text-gray-800",
																								)}
																							>
																								<Link
																									className={cn(
																										open
																											? "pointer-events-auto"
																											: "pointer-events-none",
																									)}
																									to={child.path}
																								>
																									{child.label}
																								</Link>
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
																											<li key={grandChild.path}>
																												<Link
																													to={grandChild.path}
																													className="block py-1 text-gray-700 hover:text-cyan-600"
																												>
																													{grandChild.label}
																												</Link>
																											</li>
																										),
																									)}
																								</ul>
																							</DisclosurePanel>
																						</>
																					)}
																				</Disclosure>
																			) : (
																				<Link
																					to={child.path}
																					className="block py-2 font-medium text-gray-800 hover:text-cyan-600"
																				>
																					{child.label}
																				</Link>
																			)}
																		</li>
																	))}
																</ul>
															</DisclosurePanel>
														</>
													)}
												</Disclosure>
											) : (
												<Link
													to={item.path}
													className="block py-3 font-medium text-gray-900 hover:text-cyan-600"
												>
													{item.label}
												</Link>
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
