import {
	ArrowLeftIcon,
	ArrowRightIcon,
	CreditCardIcon,
} from "@heroicons/react/24/outline";
import {
	Elements,
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { type Stripe, loadStripe } from "@stripe/stripe-js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Form, useRouteLoaderData } from "react-router";

import { useCart } from "~/hooks";
import type { loader } from "~/root";
import { cn } from "~/utils";
import { CartSummary } from "../cart/cart-summary";
import { Button, Input, Modal, Select } from "../ui";

interface FormErrors {
	[key: string]: string;
}

interface CheckoutFormWizardProps {
	open: boolean;
	onClose: () => void;
	secret: string;
}

// Lazy load Stripe only when needed
let stripePromise: Promise<Stripe | null> | null = null;

const getStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
	}
	return stripePromise;
};

const CheckoutPaymentForm = ({ pay }: { pay: boolean }) => {
	const stripe = useStripe();
	const elements = useElements();

	const handlePayment = useCallback(async () => {
		if (!stripe || !elements) return;
		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/checkout/success`,
			},
		});
		if (error) alert(error.message);
	}, [stripe, elements]);

	useEffect(() => {
		if (pay) handlePayment();
	}, [pay, handlePayment]);

	return (
		<PaymentElement
			options={{ layout: { type: "tabs", defaultCollapsed: false } }}
		/>
	);
};

export const CheckoutFormWizard = ({
	open,
	onClose,
	secret,
}: CheckoutFormWizardProps) => {
	const { cart } = useCart();
	// Country options - only UK for now
	const countryOptions = [{ label: "United Kingdom", value: "United Kingdom" }];

	const rootData = useRouteLoaderData<typeof loader>("root");
	const customer = rootData?.customer;

	const {
		first_name,
		last_name,
		email,
		phone,
		shipping_address_line_1,
		shipping_address_line_2,
		shipping_city,
		shipping_county,
		shipping_country,
		shipping_postal_code,
		shipping_phone,
		shipping_delivery_instructions,
		billing_address_line_1,
		billing_address_line_2,
		billing_city,
		billing_county,
		billing_country,
		billing_postal_code,
		billing_phone,
		use_shipping_for_billing,
	} = customer || {};

	const [step, setStep] = useState(1);
	const [billingSameAsShipping, setBillingSameAsShipping] = useState(
		use_shipping_for_billing || false,
	);
	const [pay, setPay] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({});

	const [formData, setFormData] = useState<Record<string, string | undefined>>(
		() => {
			const initialData = {
				first_name,
				last_name,
				email,
				phone,
				shipping_address_line_1,
				shipping_address_line_2,
				shipping_city,
				shipping_county,
				shipping_country: shipping_country || "United Kingdom",
				shipping_postal_code,
				shipping_phone,
				shipping_delivery_instructions,
				billing_address_line_1,
				billing_address_line_2,
				billing_city,
				billing_county,
				billing_country: billing_country || "United Kingdom",
				billing_postal_code,
				billing_phone,
			};

			// If customer prefers to use shipping for billing, copy shipping data to billing
			if (use_shipping_for_billing) {
				initialData.billing_address_line_1 =
					initialData.shipping_address_line_1;
				initialData.billing_address_line_2 =
					initialData.shipping_address_line_2;
				initialData.billing_city = initialData.shipping_city;
				initialData.billing_county = initialData.shipping_county;
				initialData.billing_country = initialData.shipping_country;
				initialData.billing_postal_code = initialData.shipping_postal_code;
				initialData.billing_phone = initialData.shipping_phone;
			}

			return initialData;
		},
	);

	const steps = useMemo(
		() => [
			{ id: 1, label: "Contact" },
			{ id: 2, label: "Shipping" },
			{ id: 3, label: "Billing" },
			{ id: 4, label: "Summary" },
			{ id: 5, label: "Payment" },
		],
		[],
	);

	const validateStep = useCallback(
		(stepNumber: number): boolean => {
			const newErrors: FormErrors = {};

			// Define required fields for each step
			const stepFields: Record<number, string[]> = {
				1: ["first_name", "last_name", "email", "phone"],
				2: [
					"shipping_address_line_1",
					"shipping_city",
					"shipping_country",
					"shipping_postal_code",
					"shipping_phone",
				],
				3: billingSameAsShipping
					? []
					: [
							"billing_address_line_1",
							"billing_city",
							"billing_country",
							"billing_postal_code",
							"billing_phone",
						],
			};

			const fieldsToValidate = stepFields[stepNumber] || [];

			// Simple validation - just check if required fields are filled
			for (const field of fieldsToValidate) {
				const value = formData[field]?.trim();
				if (!value) {
					newErrors[field] = "This field is required";
				} else if (field === "email" && !value.includes("@")) {
					newErrors[field] = "Please enter a valid email";
				}
			}

			setErrors((prev) => ({ ...prev, ...newErrors }));
			return Object.keys(newErrors).length === 0;
		},
		[formData, billingSameAsShipping],
	);

	useEffect(() => {
		if (secret) setStep(5);
	}, [secret]);

	const goToNextStep = useCallback(() => {
		if (validateStep(step)) {
			setStep((prev) => Math.min(prev + 1, 5));
		}
	}, [step, validateStep]);

	const goToPrevStep = useCallback(() => {
		setStep((prev) => Math.max(prev - 1, 1));
	}, []);

	const handleSameAsShippingChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const checked = e.target.checked;
			setBillingSameAsShipping(checked);

			if (checked) {
				// Copy shipping data to billing
				setFormData((prev) => ({
					...prev,
					billing_address_line_1: prev.shipping_address_line_1,
					billing_address_line_2: prev.shipping_address_line_2,
					billing_city: prev.shipping_city,
					billing_county: prev.shipping_county,
					billing_country: prev.shipping_country,
					billing_postal_code: prev.shipping_postal_code,
					billing_phone: prev.shipping_phone,
				}));

				// Clear billing errors
				setErrors((prev) => {
					const newErrors = { ...prev };
					for (const key of Object.keys(newErrors)) {
						if (key.startsWith("billing_")) {
							delete newErrors[key];
						}
					}
					return newErrors;
				});
			}
		},
		[],
	);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));

			// Clear error for this field when user starts typing
			if (errors[name]) {
				setErrors((prev) => {
					const newErrors = { ...prev };
					delete newErrors[name];
					return newErrors;
				});
			}
		},
		[errors],
	);

	const handleSelectChange = useCallback(
		(name: string, value: string) => {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));

			// Clear error for this field when changed
			if (errors[name]) {
				setErrors((prev) => {
					const newErrors = { ...prev };
					delete newErrors[name];
					return newErrors;
				});
			}
		},
		[errors],
	);

	const renderStepper = (
		<div className="sticky top-0 z-20 mb-6 border-gray-lightest border-b bg-white pt-4 pb-4">
			<div className="relative">
				{/* Progress bar background */}
				<div className="absolute top-4 right-0 left-0 h-0.5 bg-gray-light" />
				{/* Progress bar fill */}
				<div
					className="absolute top-4 left-0 h-0.5 bg-teal transition-all duration-500 ease-out"
					style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
				/>

				<div className="relative grid grid-cols-5 gap-2 text-center">
					{steps.map((s) => (
						<div
							key={s.id}
							className="flex flex-col items-center justify-start gap-2"
						>
							<div
								className={cn(
									"flex h-8 w-8 items-center justify-center rounded-full font-bold text-white shadow-md transition-all duration-300 ease-out",
									step > s.id
										? "scale-110 bg-teal"
										: step === s.id
											? "scale-110 bg-navy-darkest"
											: "scale-100 bg-gray",
								)}
							>
								{step > s.id ? "✓" : s.id}
							</div>
							<p
								className={cn(
									"font-semibold text-xs uppercase transition-colors duration-300",
									"hidden sm:block",
									step >= s.id ? "text-teal" : "text-gray-dark",
								)}
							>
								{s.label}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);

	const renderSummary = () => (
		<div className="space-y-6">
			<div className="mb-6">
				<h2 className="mb-2 font-semibold text-navy-darkest text-xl">
					Order Summary
				</h2>
				<p className="text-gray-dark text-sm">
					Please review your information before proceeding
				</p>
			</div>

			{/* Summary Cards */}
			<div className="space-y-4">
				{/* Contact Information */}
				<div className="rounded-lg border border-gray-light bg-white p-4">
					<div className="mb-3 flex items-center justify-between">
						<h3 className="font-semibold text-navy-darkest">
							Contact Information
						</h3>
						<Button
							variant="ghost"
							size="sm"
							type="button"
							onClick={() => setStep(1)}
							className="text-teal hover:text-teal-dark"
						>
							Edit
						</Button>
					</div>
					<div className="space-y-2 text-sm">
						<div className="flex flex-col sm:flex-row sm:gap-4">
							<span className="min-w-16 font-medium text-gray-darkest">
								Name:
							</span>
							<span className="text-navy-darkest">
								{formData.first_name} {formData.last_name}
							</span>
						</div>
						<div className="flex flex-col sm:flex-row sm:gap-4">
							<span className="min-w-16 font-medium text-gray-darkest">
								Email:
							</span>
							<span className="text-navy-darkest">{formData.email}</span>
						</div>
						<div className="flex flex-col sm:flex-row sm:gap-4">
							<span className="min-w-16 font-medium text-gray-darkest">
								Phone:
							</span>
							<span className="text-navy-darkest">{formData.phone}</span>
						</div>
					</div>
				</div>

				{/* Shipping Address */}
				<div className="rounded-lg border border-gray-light bg-white p-4">
					<div className="mb-3 flex items-center justify-between">
						<h3 className="font-semibold text-navy-darkest">
							Shipping Address
						</h3>
						<Button
							variant="ghost"
							size="sm"
							type="button"
							onClick={() => setStep(2)}
							className="text-teal hover:text-teal-dark"
						>
							Edit
						</Button>
					</div>
					<div className="text-navy-darkest text-sm">
						<div>{formData.shipping_address_line_1}</div>
						{formData.shipping_address_line_2 && (
							<div>{formData.shipping_address_line_2}</div>
						)}
						<div>
							{formData.shipping_city},{" "}
							{formData.shipping_county && `${formData.shipping_county}, `}
							{formData.shipping_postal_code}
						</div>
						<div>{formData.shipping_country}</div>
						<div className="mt-2 text-gray-dark">
							Phone: {formData.shipping_phone}
						</div>
						{formData.shipping_delivery_instructions && (
							<div className="mt-2 text-gray-dark">
								<span className="font-medium">Instructions:</span>{" "}
								{formData.shipping_delivery_instructions}
							</div>
						)}
					</div>
				</div>

				{/* Billing Address */}
				<div className="rounded-lg border border-gray-light bg-white p-4">
					<div className="mb-3 flex items-center justify-between">
						<h3 className="font-semibold text-navy-darkest">Billing Address</h3>
						<Button
							variant="ghost"
							size="sm"
							type="button"
							onClick={() => setStep(3)}
							className="text-teal hover:text-teal-dark"
						>
							Edit
						</Button>
					</div>
					{billingSameAsShipping ? (
						<div className="text-gray-dark text-sm italic">
							Same as shipping address
						</div>
					) : (
						<div className="text-navy-darkest text-sm">
							<div>{formData.billing_address_line_1}</div>
							{formData.billing_address_line_2 && (
								<div>{formData.billing_address_line_2}</div>
							)}
							<div>
								{formData.billing_city},{" "}
								{formData.billing_county && `${formData.billing_county}, `}
								{formData.billing_postal_code}
							</div>
							<div>{formData.billing_country}</div>
							<div className="mt-2 text-gray-dark">
								Phone: {formData.billing_phone}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Terms and Conditions */}
			<div className="rounded-lg border border-teal-200 bg-teal-50 p-4">
				<label className="flex cursor-pointer items-start gap-3 text-sm">
					<input
						type="checkbox"
						name="terms_accepted"
						required
						className="mt-0.5 h-4 w-4 accent-teal"
					/>
					<span>
						I agree to the{" "}
						<a
							href="/pages/terms"
							className="font-medium text-teal hover:underline"
							target="_blank"
							rel="noreferrer"
						>
							Terms and Conditions
						</a>{" "}
						and{" "}
						<a
							href="/pages/privacy-policy"
							className="font-medium text-teal hover:underline"
							target="_blank"
							rel="noreferrer"
						>
							Privacy Policy
						</a>
					</span>
				</label>
			</div>
		</div>
	);

	return (
		<Modal
			open={open}
			onClose={() => {
				onClose();
				setStep(1);
			}}
			title="Checkout"
		>
			{renderStepper}

			<Form method="POST" className="space-y-6">
				{/* Step 1: Contact Info */}
				<div
					className={
						step === 1
							? "fade-in slide-in-from-bottom-5 animate-in space-y-4"
							: "hidden"
					}
				>
					<div className="mb-6">
						<h2 className="mb-2 font-semibold text-navy-darkest text-xl">
							Contact Information
						</h2>
						<p className="text-gray-dark text-sm">
							We'll use this to contact you about your order
						</p>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<Input
							name="first_name"
							label="First name"
							required
							value={formData.first_name || ""}
							onChange={handleInputChange}
							error={errors.first_name}
							placeholder="John"
						/>
						<Input
							name="last_name"
							label="Last name"
							required
							value={formData.last_name || ""}
							onChange={handleInputChange}
							error={errors.last_name}
							placeholder="Smith"
						/>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<Input
							name="email"
							type="email"
							label="Email address"
							required
							value={formData.email || ""}
							onChange={handleInputChange}
							error={errors.email}
							placeholder="your@email.com"
						/>

						<Input
							name="phone"
							type="tel"
							label="Phone number"
							required
							value={formData.phone || ""}
							onChange={handleInputChange}
							error={errors.phone}
							placeholder="07123 456789 or +44 7123 456789"
						/>
					</div>
				</div>

				{/* Step 2: Shipping Address */}
				<div
					className={
						step === 2
							? "fade-in slide-in-from-bottom-5 animate-in space-y-4"
							: "hidden"
					}
				>
					<div className="mb-6">
						<h2 className="mb-2 font-semibold text-navy-darkest text-xl">
							Shipping Address
						</h2>
						<p className="text-gray-dark text-sm">
							Where should we deliver your order?
						</p>
					</div>

					<Input
						name="shipping_address_line_1"
						label="Address line 1"
						required
						value={formData.shipping_address_line_1 || ""}
						onChange={handleInputChange}
						error={errors.shipping_address_line_1}
						placeholder="123 High Street"
					/>

					<Input
						name="shipping_address_line_2"
						label="Address line 2 (optional)"
						value={formData.shipping_address_line_2 || ""}
						onChange={handleInputChange}
						placeholder="Flat 4B"
					/>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<Input
							name="shipping_city"
							label="Town/City"
							required
							value={formData.shipping_city || ""}
							onChange={handleInputChange}
							error={errors.shipping_city}
							placeholder="London"
						/>
						<Input
							name="shipping_county"
							label="County"
							value={formData.shipping_county || ""}
							onChange={handleInputChange}
							placeholder="Greater London"
						/>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<Select
							name="shipping_country"
							label="Country"
							value={formData.shipping_country || "United Kingdom"}
							options={countryOptions}
							onChange={(value) =>
								handleSelectChange("shipping_country", value)
							}
							error={errors.shipping_country}
						/>
						<Input
							name="shipping_postal_code"
							label="Postcode"
							required
							value={formData.shipping_postal_code || ""}
							onChange={handleInputChange}
							error={errors.shipping_postal_code}
							placeholder="SW1A 1AA"
						/>
					</div>

					<Input
						name="shipping_phone"
						type="tel"
						label="Phone number"
						required
						value={formData.shipping_phone || ""}
						onChange={handleInputChange}
						error={errors.shipping_phone}
						placeholder="07123 456789 (for delivery updates)"
					/>

					<Input
						name="shipping_delivery_instructions"
						label="Delivery instructions"
						value={formData.shipping_delivery_instructions || ""}
						onChange={handleInputChange}
						placeholder="Leave at front door, ring bell, etc. (optional)"
					/>
				</div>

				{/* Step 3: Billing Address */}
				<div
					className={
						step === 3
							? "fade-in slide-in-from-bottom-5 animate-in space-y-4"
							: "hidden"
					}
				>
					<div className="mb-6">
						<h2 className="mb-2 font-semibold text-navy-darkest text-xl">
							Billing Address
						</h2>
						<p className="text-gray-dark text-sm">
							Where should we send your invoice?
						</p>
					</div>

					<div className="rounded-lg bg-gray-50 p-4">
						<label className="flex cursor-pointer items-start gap-3 text-sm">
							<input
								type="checkbox"
								name="use_shipping_for_billing"
								checked={billingSameAsShipping}
								onChange={handleSameAsShippingChange}
								className="mt-0.5 h-4 w-4 accent-teal"
							/>
							<span className="font-medium">
								Use shipping address for billing
							</span>
						</label>
					</div>

					{!billingSameAsShipping && (
						<div className="space-y-4">
							<Input
								name="billing_address_line_1"
								label="Address line 1"
								required
								value={formData.billing_address_line_1 || ""}
								onChange={handleInputChange}
								error={errors.billing_address_line_1}
								placeholder="123 High Street"
							/>

							<Input
								name="billing_address_line_2"
								label="Address line 2 (optional)"
								value={formData.billing_address_line_2 || ""}
								onChange={handleInputChange}
								placeholder="Flat 4B"
							/>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<Input
									name="billing_city"
									label="Town/City"
									required
									value={formData.billing_city || ""}
									onChange={handleInputChange}
									error={errors.billing_city}
									placeholder="London"
								/>
								<Input
									name="billing_county"
									label="County"
									value={formData.billing_county || ""}
									onChange={handleInputChange}
									placeholder="Greater London"
								/>
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<Select
									name="billing_country"
									label="Country"
									value={formData.billing_country || "United Kingdom"}
									options={countryOptions}
									onChange={(value) =>
										handleSelectChange("billing_country", value)
									}
									error={errors.billing_country}
								/>
								<Input
									name="billing_postal_code"
									label="Postcode"
									required
									value={formData.billing_postal_code || ""}
									onChange={handleInputChange}
									error={errors.billing_postal_code}
									placeholder="SW1A 1AA"
								/>
							</div>

							<Input
								name="billing_phone"
								label="Phone number"
								type="tel"
								required
								value={formData.billing_phone || ""}
								onChange={handleInputChange}
								error={errors.billing_phone}
								placeholder="07123 456789 (for billing inquiries)"
							/>
						</div>
					)}
				</div>

				{/* Step 4: Summary */}
				<div
					className={
						step === 4
							? "fade-in slide-in-from-bottom-5 block animate-in"
							: "hidden"
					}
				>
					{renderSummary()}
				</div>

				{/* Step 5: Payment */}
				<div
					className={
						step === 5
							? "fade-in slide-in-from-bottom-5 animate-in space-y-6"
							: "hidden"
					}
				>
					<div className="mb-6">
						<h2 className="mb-2 font-semibold text-navy-darkest text-xl">
							Payment
						</h2>
						<p className="text-gray-dark text-sm">
							Complete your order securely
						</p>
					</div>

					{/* Cart Summary at Payment Step */}
					<CartSummary cart={cart} />

					{secret && (
						<div className="rounded-lg border border-gray-light bg-white p-4">
							<Elements options={{ clientSecret: secret }} stripe={getStripe()}>
								<CheckoutPaymentForm pay={pay} />
							</Elements>
						</div>
					)}
				</div>

				{/* Navigation Buttons */}
				<div className="sticky bottom-0 z-20 flex justify-between gap-4 border-gray-lightest border-t bg-white pt-4 pb-2">
					<div className="flex justify-between gap-3 sm:justify-start sm:gap-4">
						{step > 1 && (
							<Button
								variant="secondary"
								type="button"
								onClick={goToPrevStep}
								icon={<ArrowLeftIcon className="h-5 w-5" />}
								iconPosition="left"
							>
								<span>Previous</span>
							</Button>
						)}
					</div>

					<div className="flex gap-3 sm:gap-4">
						{step < 4 && (
							<Button
								type="button"
								onClick={goToNextStep}
								icon={<ArrowRightIcon className="h-5 w-5" />}
								iconPosition="right"
							>
								<span>Next</span>
							</Button>
						)}
						{step === 4 && (
							<Button
								name="_action"
								value="checkout"
								type="submit"
								icon={<CreditCardIcon className="h-5 w-5" />}
								iconPosition="right"
							>
								<span>Proceed to Payment</span>
							</Button>
						)}
						{step === 5 && (
							<Button
								type="button"
								onClick={() => setPay(true)}
								icon={<CreditCardIcon className="h-5 w-5" />}
							>
								<span>Pay</span>
							</Button>
						)}
					</div>
				</div>
			</Form>
		</Modal>
	);
};
