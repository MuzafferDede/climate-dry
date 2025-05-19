import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
	ArrowRightStartOnRectangleIcon,
	Bars3Icon,
	KeyIcon,
	MagnifyingGlassIcon,
	ShoppingCartIcon,
	UserCircleIcon,
	UserIcon,
	UserPlusIcon,
	XMarkIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";
import { Link, href, useRouteLoaderData } from "react-router";
import { Fragment } from "react/jsx-runtime";
import logo from "~/assets/logo.svg";
import { Button, Input } from "~/components";
import { useAppContext } from "~/contexts";
import type { Customer } from "~/types";

export const Middle = () => {
	const data = useRouteLoaderData<{ customer: Customer }>("pages/layout");

	const customer = data?.customer;

	const [showSearch, setShowSerach] = useState(false);
	const { state, updateState } = useAppContext();

	return (
		<div className="bg-white md:py-2">
			<div className="container mx-auto">
				<div
					className="group/search flex flex-wrap items-center justify-between gap-2 p-2 md:flex-nowrap md:p-0"
					data-show={showSearch}
				>
					{/* Mobile toggle button */}
					<div className="flex items-center justify-end md:hidden">
						<Button
							variant="ghost"
							size="icon"
							onClick={() =>
								updateState({ isNavigationOpen: !state.isNavigationOpen })
							}
						>
							{state.isNavigationOpen ? (
								<XMarkIcon className="block h-6 w-6" />
							) : (
								<Bars3Icon className="block h-6 w-6" />
							)}
						</Button>
					</div>
					<Link to="/" className="order-1 flex-1 md:flex-none">
						<img src={logo} alt="Climate Dry" className="h-8 w-auto md:h-14" />
					</Link>
					<div className="group-data-[show=true]/search:fade-in group-data-[show=true]/search:slide-in-from-top relative order-3 hidden w-full animate-in group-data-[show=true]/search:block md:order-2 md:block lg:max-w-2xl">
						<Input name="search" placeholder="Search..." />
						<Button
							variant="ghost"
							size="icon"
							className="absolute inset-y-px right-0 py-0"
						>
							<MagnifyingGlassIcon className="size-5" />
						</Button>
					</div>
					<div className="order-2 flex justify-end gap-1 md:order-3">
						<Button
							size="icon"
							variant="ghost"
							onClick={() => setShowSerach((prev) => !prev)}
							className="md:hidden"
						>
							<MagnifyingGlassIcon className="size-5" />
							<XMarkIcon className="hidden size-5 group-data-[show=true]/search:block" />
						</Button>
						<div className="relative flex">
							<Button size="icon" variant="ghost">
								<Link to={href("/cart")}>
									<span className="-mt-1 -mr-1 absolute top-0 right-0 z-10 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 font-bold text-white text-xs">
										<span className="px-1.5">7</span>
									</span>
									<ShoppingCartIcon className="size-5" />
								</Link>
							</Button>
						</div>
						<div className="relative flex">
							<Menu>
								<MenuButton as={Fragment}>
									<Button size="icon" variant="ghost">
										<UserCircleIcon className="size-5" />
									</Button>
								</MenuButton>
								<MenuItems
									anchor="bottom end"
									className="slide-in-from-right-10 z-20 w-48 origin-top-right animate-in rounded-xl border border-gray-200 bg-white p-1 font-semibold text-gray-700 text-sm/6 shadow-sm transition [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
								>
									{customer ? (
										<>
											<Button asChild variant="ghost">
												<MenuItem
													as={Link}
													to={href("/account")}
													className="flex w-full justify-start gap-2"
												>
													<UserIcon className="size-4" />
													<span>My Account</span>
												</MenuItem>
											</Button>

											<Button asChild variant="ghost">
												<MenuItem
													as={Link}
													to={href("/logout")}
													className="flex w-full justify-start gap-2 text-red-500"
												>
													<ArrowRightStartOnRectangleIcon className="size-4" />
													<span>Logout</span>
												</MenuItem>
											</Button>
										</>
									) : (
										<>
											<Button asChild variant="ghost">
												<MenuItem
													as={Link}
													to={href("/login")}
													className="flex w-full justify-start gap-2"
												>
													<KeyIcon className="size-4" />
													<span>Sign in</span>
												</MenuItem>
											</Button>

											<Button asChild variant="ghost">
												<MenuItem
													as={Link}
													to={href("/register")}
													className="flex w-full justify-start gap-2"
												>
													<UserPlusIcon className="size-4" />
													<span>Register</span>
												</MenuItem>
											</Button>
										</>
									)}
								</MenuItems>
							</Menu>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
