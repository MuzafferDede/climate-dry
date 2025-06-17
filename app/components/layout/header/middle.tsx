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
import { Button, Icon, Input } from "~/components";
import { useAppContext } from "~/contexts";
import type { Cart, Customer } from "~/types";

export const Middle = () => {
	const data = useRouteLoaderData<{ customer: Customer; cart: Cart }>("root");

	const customer = data?.customer;
	const cart = data?.cart;

	const [showSearch, setShowSerach] = useState(false);
	const { state, updateState } = useAppContext();

	return (
		<div className="bg-white md:py-2">
			<div className="mx-auto max-w-7xl">
				<div
					className="group/search flex flex-wrap items-center justify-between gap-2 p-2 md:flex-nowrap md:py-0"
					data-show={showSearch}
				>
					{/* Mobile toggle button */}
					<div className="flex items-center justify-end md:hidden">
						<Button
							variant="none"
							size="icon"
							onClick={() =>
								updateState({ isNavigationOpen: !state.isNavigationOpen })
							}
							icon={
								state.isNavigationOpen ? (
									<XMarkIcon className="block h-6 w-6" />
								) : (
									<Bars3Icon className="block h-6 w-6" />
								)
							}
						/>
					</div>
					<Link to="/" className="order-1 flex-1 md:flex-none">
						<Icon
							name="logo-animated"
							className="fade-in-10 slide-in-from-top aspect-60/13 w-full max-w-40 animate-in md:max-w-64 "
						/>
					</Link>
					<div className="group-data-[show=true]/search:fade-in group-data-[show=true]/search:slide-in-from-top relative order-3 hidden w-full animate-in transition-all group-data-[show=true]/search:block md:order-2 md:block md:has-[input:focus]:scale-102 lg:max-w-2xl">
						<Input
							autoComplete="off"
							name="search"
							placeholder="Search products..."
							className="border-teal transition-all focus:shadow-sm focus:shadow-teal"
						/>
						<Button
							variant="plain"
							size="icon"
							className="absolute inset-y-0 right-0"
							icon={<MagnifyingGlassIcon className="size-6" />}
						/>
					</div>
					<div className="order-2 flex justify-end gap-1 md:order-3">
						<Button
							variant="plain"
							size="none"
							onClick={() => setShowSerach((prev) => !prev)}
							className="md:hidden"
						>
							<MagnifyingGlassIcon className="size-6 group-data-[show=true]/search:hidden" />
							<XMarkIcon className="hidden size-6 group-data-[show=true]/search:block" />
						</Button>
						<div className="relative flex">
							<Link to={href("/cart")} className="relative">
								<span className="-mt-1 -mr-1 absolute top-0 right-0 z-10 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal font-bold text-white text-xs">
									<span className="px-1.5">{cart?.items?.length || 0}</span>
								</span>
								<Button
									size="icon"
									variant="ghost"
									animation="zoom"
									icon={<ShoppingCartIcon className="size-6" />}
								/>
							</Link>
						</div>
						<div className="relative flex">
							<Menu>
								<MenuButton as={Fragment}>
									<Button
										size="icon"
										variant="ghost"
										animation="zoom"
										icon={<UserCircleIcon className="size-6" />}
									/>
								</MenuButton>
								<MenuItems
									anchor="bottom end"
									className="slide-in-from-right-10 z-20 w-48 origin-top-right animate-in rounded-xl border border-gray-200 bg-white p-1 font-bold text-gray-700 shadow-sm transition [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
								>
									{customer ? (
										<>
											<MenuItem
												as={Link}
												to={href("/account")}
												className="flex w-full justify-start gap-2 p-2 hover:text-teal"
											>
												<UserIcon className="size-4" />
												<span>My Account</span>
											</MenuItem>

											<MenuItem
												as={Link}
												to={href("/logout")}
												className="flex w-full justify-start gap-2 p-2 text-red hover:text-teal"
											>
												<ArrowRightStartOnRectangleIcon className="size-4" />
												<span>Logout</span>
											</MenuItem>
										</>
									) : (
										<>
											<MenuItem
												as={Link}
												to={href("/login")}
												className="flex w-full justify-start gap-2 p-2 hover:text-teal"
											>
												<KeyIcon className="size-4" />
												<span>Sign in</span>
											</MenuItem>

											<MenuItem
												as={Link}
												to={href("/register")}
												className="flex w-full justify-start gap-2 p-2 hover:text-teal"
											>
												<UserPlusIcon className="size-4" />
												<span>Register</span>
											</MenuItem>
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
