import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";
import { useEffect, useState } from "react";
import {
	type ActionFunctionArgs,
	Form,
	type LoaderFunctionArgs,
	data,
	redirect,
	useActionData,
	useNavigation,
	useRouteLoaderData,
} from "react-router";
import { z } from "zod";
import { Button, Input, Loading } from "~/components";
import {
	commitSession,
	fetcher,
	getCart,
	getSession,
	putToast,
} from "~/services";
import type { Cart } from "~/types";
import { ToastType } from "~/types";
import { currency, validator } from "~/utils";

// Schema for validating checkout form
const checkoutSchema = z.object({
	email: z.string().email("Please enter a valid email"),
	first_name: z.string().min(1, "First name is required"),
	last_name: z.string().min(1, "Last name is required"),
	payment_method: z.string().min(1, "Payment method is required"),
	payment_status: z.string().min(1, "Payment status is required"),
	payment_reference: z.string().min(1, "Payment reference is required"),
	// Shipping address fields
	shipping_address_line_1: z.string().min(1, "Address is required"),
	shipping_address_line_2: z.string().optional(),
	shipping_city: z.string().min(1, "City is required"),
	shipping_country: z.string().min(1, "Country is required"),
	shipping_county: z.string().min(1, "County is required"),
	shipping_postal_code: z.string().min(1, "Postal code is required"),
	shipping_phone: z.string().min(1, "Phone number is required"),
	shipping_delivery_instructions: z.string().optional(),
	// Billing address fields
	use_shipping_for_billing: z.boolean().default(true),
	billing_address_line_1: z.string().min(1, "Billing address is required"),
	billing_address_line_2: z.string().optional(),
	billing_city: z.string().min(1, "Billing city is required"),
	billing_country: z.string().min(1, "Billing country is required"),
	billing_county: z.string().min(1, "Billing county is required"),
	billing_postal_code: z.string().min(1, "Billing postal code is required"),
	billing_phone: z.string().min(1, "Billing phone number is required"),
	// Card information
	card_number: z
		.string()
		.min(16, "Card number must be 16 digits")
		.max(19, "Card number must be 16 digits"),
	card_holder: z.string().min(1, "Card holder name is required"),
	card_expiry: z
		.string()
		.regex(
			/^(0[1-9]|1[0-2])\/([0-9]{2})$/,
			"Expiry date must be in MM/YY format",
		),
	card_cvv: z
		.string()
		.min(3, "CVV must be 3 digits")
		.max(4, "CVV must be 3-4 digits"),
});

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));

	try {
		const cart = await getCart(request);

		// If cart is empty, redirect to home
		if (!cart?.items?.length) {
			putToast(session, {
				message: "Your cart is empty. Add some items before checkout.",
				type: ToastType.Error,
			});

			return redirect("/", {
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			});
		}

		return data(
			{ cart },
			{
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			},
		);
	} catch {
		putToast(session, {
			message: "Failed to load cart. Please try again.",
			type: ToastType.Error,
		});

		return redirect("/", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}
}

export async function action({ request }: ActionFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const formData = await request.formData();
	const formValues = Object.fromEntries(formData) as Record<string, string>;

	// Convert checkbox value to boolean
	const useShippingForBilling = formValues.use_shipping_for_billing === "on";
	const validatedData = {
		...formValues,
		use_shipping_for_billing: useShippingForBilling,
	} as Record<string, string | boolean>;

	// If using shipping address for billing, copy shipping address to billing
	if (useShippingForBilling) {
		validatedData.billing_address_line_1 =
			validatedData.shipping_address_line_1;
		validatedData.billing_address_line_2 =
			validatedData.shipping_address_line_2;
		validatedData.billing_city = validatedData.shipping_city;
		validatedData.billing_country = validatedData.shipping_country;
		validatedData.billing_county = validatedData.shipping_county;
		validatedData.billing_postal_code = validatedData.shipping_postal_code;
		validatedData.billing_phone = validatedData.shipping_phone;
	}

	const validated = validator(validatedData, checkoutSchema);

	// ❌ Validation failed
	if (validated.errors) {
		putToast(session, {
			message: "Please fix the errors below.",
			type: ToastType.Error,
		});

		return data(
			{ errors: validated.errors },
			{
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			},
		);
	}

	try {
		const api = await fetcher(request);
		await api.post("/orders/checkout", validated.data);

		// ✅ Checkout success
		putToast(session, {
			message: "Order placed successfully!",
			type: ToastType.Success,
		});

		return redirect("/account", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	} catch (error) {
		// ❌ API error
		const message =
			error instanceof Error
				? error.message
				: "Checkout failed. Please try again.";

		putToast(session, {
			message,
			type: ToastType.Error,
		});

		return data(
			{ errors: { email: true, payment_reference: true } },
			{
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			},
		);
	}
}

export default function Checkout() {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [useShippingForBilling, setUseShippingForBilling] = useState(true);
	const { cart } = useRouteLoaderData<{ cart: Cart }>("root") || {};
	const actionData = useActionData<{ errors?: Record<string, string> }>();

	// Reset to first tab when there are errors
	useEffect(() => {
		if (actionData?.errors) {
			// Find the first tab that contains an error
			const errorFields = Object.keys(actionData.errors);

			// Personal Info tab fields
			if (
				errorFields.some((field) =>
					["email", "first_name", "last_name"].includes(field),
				)
			) {
				setSelectedIndex(0);
			}
			// Shipping tab fields
			else if (
				errorFields.some(
					(field) =>
						field.startsWith("shipping_") || field.startsWith("billing_"),
				)
			) {
				setSelectedIndex(1);
			}
			// Payment tab fields
			else if (
				errorFields.some(
					(field) => field.startsWith("card_") || field === "payment_reference",
				)
			) {
				setSelectedIndex(2);
			}
			// Default to first tab if no specific tab matches
			else {
				setSelectedIndex(0);
			}
		}
	}, [actionData?.errors]);

	const {
		subtotal = 0,
		tax_amount = 0,
		discount_amount = 0,
		total = 0,
	} = cart?.totals || {};

	const handleNext = () => {
		setSelectedIndex((prev) => Math.min(prev + 1, 3));
	};

	const handleBack = () => {
		setSelectedIndex((prev) => Math.max(prev - 1, 0));
	};

	const handleBillingToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUseShippingForBilling(e.target.checked);
	};

	return (
		<div className="mx-auto max-w-7xl px-4 py-12">
			<div className="fade-in-90 zoom-in-90 mx-auto my-16 max-w-2xl animate-in rounded-xl border border-gray-light bg-white px-6 py-8 shadow-sm">
				<h1 className="mb-8 text-center font-bold text-2xl">Checkout</h1>

				<Form method="post" className="space-y-6" noValidate>
					<TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
						<TabList className="flex space-x-1 rounded-xl bg-gray-lightest p-1">
							<Tab className="w-full rounded-lg py-2.5 font-medium text-gray-dark text-sm leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-teal focus:outline-none focus:ring-2 data-selected:bg-white data-selected:text-teal data-selected:shadow">
								Personal Info
							</Tab>
							<Tab className="w-full rounded-lg py-2.5 font-medium text-gray-dark text-sm leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-teal focus:outline-none focus:ring-2 data-selected:bg-white data-selected:text-teal data-selected:shadow">
								Shipping
							</Tab>
							<Tab className="w-full rounded-lg py-2.5 font-medium text-gray-dark text-sm leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-teal focus:outline-none focus:ring-2 data-selected:bg-white data-selected:text-teal data-selected:shadow">
								Payment
							</Tab>
							<Tab className="w-full rounded-lg py-2.5 font-medium text-gray-dark text-sm leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-teal focus:outline-none focus:ring-2 data-selected:bg-white data-selected:text-teal data-selected:shadow">
								Review
							</Tab>
						</TabList>

						<TabPanels className="mt-6">
							{/* Personal Information */}
							<div className={selectedIndex === 0 ? "block" : "hidden"}>
								<div className="space-y-6">
									<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
										<div className="col-span-2 md:col-span-1">
											<Input
												label="First Name"
												name="first_name"
												placeholder="John"
												autoComplete="given-name"
												required
												error={actionData?.errors?.first_name}
											/>
										</div>
										<div className="col-span-2 md:col-span-1">
											<Input
												label="Last Name"
												name="last_name"
												placeholder="Doe"
												autoComplete="family-name"
												required
												error={actionData?.errors?.last_name}
											/>
										</div>
										<div className="col-span-2">
											<Input
												label="Email"
												name="email"
												type="email"
												placeholder="you@example.com"
												autoComplete="email"
												required
												error={actionData?.errors?.email}
											/>
										</div>
									</div>
									<div className="flex justify-end">
										<Button
											type="button"
											onClick={handleNext}
											className="w-full md:w-auto"
										>
											Continue to Shipping
										</Button>
									</div>
								</div>
							</div>

							{/* Shipping Address */}
							<div className={selectedIndex === 1 ? "block" : "hidden"}>
								<div className="space-y-6">
									<div className="grid grid-cols-1 gap-6">
										<Input
											label="Address Line 1"
											name="shipping_address_line_1"
											placeholder="123 Main St"
											autoComplete="address-line1"
											required
											error={actionData?.errors?.shipping_address_line_1}
										/>
										<Input
											label="Address Line 2"
											name="shipping_address_line_2"
											placeholder="Apartment, suite, unit, etc. (optional)"
											autoComplete="address-line2"
											error={actionData?.errors?.shipping_address_line_2}
										/>
										<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
											<Input
												label="City"
												name="shipping_city"
												placeholder="London"
												autoComplete="address-level2"
												required
												error={actionData?.errors?.shipping_city}
											/>
											<Input
												label="County"
												name="shipping_county"
												placeholder="London"
												autoComplete="address-level1"
												required
												error={actionData?.errors?.shipping_county}
											/>
										</div>
										<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
											<Input
												label="Postal Code"
												name="shipping_postal_code"
												placeholder="EC1A 1BB"
												autoComplete="postal-code"
												required
												error={actionData?.errors?.shipping_postal_code}
											/>
											<Input
												label="Country"
												name="shipping_country"
												placeholder="UK"
												autoComplete="country"
												required
												error={actionData?.errors?.shipping_country}
											/>
										</div>
										<Input
											label="Phone Number"
											name="shipping_phone"
											type="tel"
											placeholder="+44 20 7123 4567"
											autoComplete="tel"
											required
											error={actionData?.errors?.shipping_phone}
										/>
										<Input
											label="Delivery Instructions"
											name="shipping_delivery_instructions"
											placeholder="Any special delivery instructions (optional)"
											autoComplete="off"
											error={actionData?.errors?.shipping_delivery_instructions}
										/>
									</div>

									{/* Billing Address */}
									<div className="space-y-4">
										<div className="flex items-center gap-2">
											<input
												type="checkbox"
												name="use_shipping_for_billing"
												id="use_shipping_for_billing"
												checked={useShippingForBilling}
												onChange={handleBillingToggle}
												className="h-4 w-4 rounded border-gray-light text-teal focus:ring-teal"
											/>
											<label
												htmlFor="use_shipping_for_billing"
												className="text-gray-dark text-sm"
											>
												Use shipping address for billing
											</label>
										</div>

										{!useShippingForBilling && (
											<div className="rounded-lg border border-gray-light p-4">
												<h3 className="mb-4 font-semibold text-gray-darkest text-lg">
													Billing Address
												</h3>
												<div className="space-y-4">
													<Input
														label="Address Line 1"
														name="billing_address_line_1"
														placeholder="123 Main St"
														autoComplete="billing address-line1"
														required={!useShippingForBilling}
														error={actionData?.errors?.billing_address_line_1}
													/>
													<Input
														label="Address Line 2"
														name="billing_address_line_2"
														placeholder="Apartment, suite, unit, etc. (optional)"
														autoComplete="billing address-line2"
														error={actionData?.errors?.billing_address_line_2}
													/>
													<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
														<Input
															label="City"
															name="billing_city"
															placeholder="London"
															autoComplete="billing address-level2"
															required={!useShippingForBilling}
															error={actionData?.errors?.billing_city}
														/>
														<Input
															label="County"
															name="billing_county"
															placeholder="London"
															autoComplete="billing address-level1"
															required={!useShippingForBilling}
															error={actionData?.errors?.billing_county}
														/>
													</div>
													<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
														<Input
															label="Postal Code"
															name="billing_postal_code"
															placeholder="EC1A 1BB"
															autoComplete="billing postal-code"
															required={!useShippingForBilling}
															error={actionData?.errors?.billing_postal_code}
														/>
														<Input
															label="Country"
															name="billing_country"
															placeholder="UK"
															autoComplete="billing country"
															required={!useShippingForBilling}
															error={actionData?.errors?.billing_country}
														/>
													</div>
													<Input
														label="Phone Number"
														name="billing_phone"
														type="tel"
														placeholder="+44 20 7123 4567"
														autoComplete="billing tel"
														required={!useShippingForBilling}
														error={actionData?.errors?.billing_phone}
													/>
												</div>
											</div>
										)}
									</div>

									<div className="flex justify-between">
										<Button
											type="button"
											variant="outline"
											onClick={handleBack}
											className="w-full md:w-auto"
										>
											Back
										</Button>
										<Button
											type="button"
											onClick={handleNext}
											className="w-full md:w-auto"
										>
											Continue to Payment
										</Button>
									</div>
								</div>
							</div>

							{/* Payment Information */}
							<div className={selectedIndex === 2 ? "block" : "hidden"}>
								<div className="space-y-6">
									{/* Hidden fields for payment method and status */}
									<input type="hidden" name="payment_method" value="card" />
									<input type="hidden" name="payment_status" value="pending" />

									<div className="grid grid-cols-1 gap-6">
										<Input
											label="Card Number"
											name="card_number"
											placeholder="1234 5678 9012 3456"
											autoComplete="cc-number"
											required
											maxLength={19}
											onChange={(e) => {
												// Format card number with spaces
												const value = e.target.value.replace(/\s/g, "");
												const formatted = value
													.replace(/(\d{4})/g, "$1 ")
													.trim();
												e.target.value = formatted;
											}}
											error={actionData?.errors?.card_number}
										/>
										<Input
											label="Card Holder Name"
											name="card_holder"
											placeholder="JOHN DOE"
											autoComplete="cc-name"
											required
											onChange={(e) => {
												// Convert to uppercase
												e.target.value = e.target.value.toUpperCase();
											}}
											error={actionData?.errors?.card_holder}
										/>
										<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
											<Input
												label="Expiry Date"
												name="card_expiry"
												placeholder="MM/YY"
												autoComplete="cc-exp"
												required
												maxLength={5}
												onChange={(e) => {
													// Format expiry date
													let value = e.target.value.replace(/\D/g, "");
													if (value.length >= 2) {
														value = `${value.slice(0, 2)}/${value.slice(2)}`;
													}
													e.target.value = value;
												}}
												error={actionData?.errors?.card_expiry}
											/>
											<Input
												label="CVV"
												name="card_cvv"
												placeholder="123"
												autoComplete="cc-csc"
												required
												maxLength={4}
												type="password"
												error={actionData?.errors?.card_cvv}
											/>
										</div>
										<Input
											label="Payment Reference"
											name="payment_reference"
											placeholder="test-123"
											required
											error={actionData?.errors?.payment_reference}
										/>
									</div>
									<div className="flex justify-between">
										<Button
											type="button"
											variant="outline"
											onClick={handleBack}
											className="w-full md:w-auto"
										>
											Back
										</Button>
										<Button
											type="button"
											onClick={handleNext}
											className="w-full md:w-auto"
										>
											Review Order
										</Button>
									</div>
								</div>
							</div>

							{/* Review Order */}
							<div className={selectedIndex === 3 ? "block" : "hidden"}>
								<div className="space-y-6">
									<div className="rounded-lg border border-gray-light p-4">
										<h3 className="mb-4 font-semibold text-gray-darkest text-lg">
											Order Summary
										</h3>
										<div className="space-y-2">
											<div className="flex justify-between text-sm">
												<span className="text-gray-dark">Subtotal</span>
												<span className="font-medium text-gray-darkest">
													{currency(subtotal)}
												</span>
											</div>
											<div className="flex justify-between text-sm">
												<span className="text-gray-dark">Tax</span>
												<span className="font-medium text-gray-darkest">
													{currency(tax_amount)}
												</span>
											</div>
											{discount_amount > 0 && (
												<div className="flex justify-between text-sm">
													<span className="text-teal">Discount</span>
													<span className="font-medium text-teal">
														-{currency(discount_amount)}
													</span>
												</div>
											)}
											<div className="border-gray-light border-t pt-2">
												<div className="flex justify-between">
													<span className="font-medium text-gray-darkest">
														Total
													</span>
													<span className="font-bold text-gray-darkest">
														{currency(total)}
													</span>
												</div>
											</div>
										</div>
									</div>

									<div className="flex justify-between">
										<Button
											type="button"
											variant="outline"
											onClick={handleBack}
											className="w-full md:w-auto"
										>
											Back
										</Button>
										<Button
											type="submit"
											disabled={isSubmitting}
											icon={isSubmitting && <Loading />}
											className="w-full md:w-auto"
										>
											Place Order
										</Button>
									</div>
								</div>
							</div>
						</TabPanels>
					</TabGroup>
				</Form>
			</div>
		</div>
	);
}
