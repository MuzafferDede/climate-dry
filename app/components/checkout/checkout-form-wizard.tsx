import {
	Elements,
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Form, useRouteLoaderData } from "react-router";
import type { Cart } from "~/types";
import { cn } from "~/utils";
import { CartSummary } from "../cart/cart-summary";
import { Button, Input, Modal } from "../ui";

interface CheckoutFormWizardProps {
	open: boolean;
	onClose: () => void;
	secret: string;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

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
	const [step, setStep] = useState(1);
	const [billingSameAsShipping, setBillingSameAsShipping] = useState(false);
	const [pay, setPay] = useState(false);
	const defaultFormData = {
		first_name: "John",
		last_name: "Doe",
		email: "you@example.com",
		phone: "+44 20 7123 4567",
		shipping_address_line_1: "123 Main St",
		shipping_address_line_2: "Flat 2B",
		shipping_city: "London",
		shipping_county: "Greater London",
		shipping_country: "United Kingdom",
		shipping_postal_code: "EC1A 1AA",
		shipping_phone: "+44 20 7123 4567",
		shipping_delivery_instructions: "Leave at the front door",
		billing_address_line_1: "123 Main St",
		billing_address_line_2: "Flat 2B",
		billing_city: "London",
		billing_county: "Greater London",
		billing_country: "United Kingdom",
		billing_postal_code: "EC1A 1AA",
		billing_phone: "+44 20 7123 4567",
	};
	const [formData, setFormData] =
		useState<Record<string, string>>(defaultFormData);

	const cartData = useRouteLoaderData<{ cart: Cart }>("root");
	const cart = cartData?.cart;

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

	useEffect(() => {
		if (secret) setStep(5);
	}, [secret]);

	const goToNextStep = useCallback(() => {
		setStep((prev) => Math.min(prev + 1, 5));
	}, []);

	const goToPrevStep = useCallback(() => {
		setStep((prev) => Math.max(prev - 1, 1));
	}, []);

	const handleSameAsShippingChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setBillingSameAsShipping(e.target.checked);
		},
		[],
	);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormData((prev) => ({
				...prev,
				[e.target.name]: e.target.value,
			}));
		},
		[],
	);

	const renderStepper = (
		<div className="sticky top-0 z-20 mb-4 border-gray-lightest border-b bg-white pt-2 pb-4">
			<div className="relative z-10 grid grid-cols-5 gap-2 text-center">
				{steps.map((s, index) => (
					<div
						key={s.id}
						className="flex flex-col items-center justify-start gap-1"
					>
						<div
							className={cn(
								"flex h-8 w-8 items-center justify-center rounded-full font-bold text-white shadow-md",
								step > s.id
									? "bg-teal"
									: step === s.id
										? "bg-navy-darkest"
										: "bg-gray",
							)}
						>
							{s.id}
						</div>
						<p
							className={cn(
								"hidden font-semibold text-xs uppercase md:block",
								step >= s.id ? "text-teal" : "text-gray-dark",
							)}
						>
							{s.label}
						</p>
						{index < steps.length && (
							<div
								className={cn(
									"w-full rounded-full border-t-2 transition-all duration-300 ease-in-out",
									step > s.id ? "border-teal" : "border-gray-light",
								)}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);

	const renderSummary = () => (
		<div className="space-y-8">
			{/* 3-column summary grid */}
			<div className="grid gap-8">
				{/* Contact Information */}
				<div className="grid gap-2">
					<h3 className="font-semibold text-lg text-navy-darkest">
						Contact Information
					</h3>
					<div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
						<div>
							<span className="font-semibold text-gray-darkest">Name</span>
							<div className="text-navy-darkest">
								{formData.first_name} {formData.last_name}
							</div>
						</div>
						<div>
							<span className="font-semibold text-gray-darkest">Email</span>
							<div className="text-navy-darkest">{formData.email}</div>
						</div>
						<div>
							<span className="font-semibold text-gray-darkest">Phone</span>
							<div className="text-navy-darkest">{formData.phone}</div>
						</div>
					</div>
				</div>
				{/* Shipping Address */}
				<div className="grid gap-2">
					<h3 className="font-semibold text-lg text-navy-darkest">
						Shipping Address
					</h3>
					<div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
						<div>
							<span className="font-semibold text-gray-darkest">
								Address Line 1
							</span>
							<div className="text-navy-darkest">
								{formData.shipping_address_line_1}
							</div>
						</div>
						{formData.shipping_address_line_2 && (
							<div>
								<span className="font-semibold text-gray-darkest">
									Address Line 2
								</span>
								<div className="text-navy-darkest">
									{formData.shipping_address_line_2}
								</div>
							</div>
						)}
						<div>
							<span className="font-semibold text-gray-darkest">City</span>
							<div className="text-navy-darkest">{formData.shipping_city}</div>
						</div>
						<div>
							<span className="font-semibold text-gray-darkest">County</span>
							<div className="text-navy-darkest">
								{formData.shipping_county}
							</div>
						</div>
						<div>
							<span className="font-semibold text-gray-darkest">Country</span>
							<div className="text-navy-darkest">
								{formData.shipping_country}
							</div>
						</div>
						<div>
							<span className="font-semibold text-gray-darkest">
								Postal Code
							</span>
							<div className="text-navy-darkest">
								{formData.shipping_postal_code}
							</div>
						</div>
						<div>
							<span className="font-semibold text-gray-darkest">Phone</span>
							<div className="text-navy-darkest">{formData.shipping_phone}</div>
						</div>
						{formData.shipping_delivery_instructions && (
							<div>
								<span className="font-semibold text-gray-darkest">
									Delivery Instructions
								</span>
								<div className="text-navy-darkest">
									{formData.shipping_delivery_instructions}
								</div>
							</div>
						)}
					</div>
				</div>
				{/* Billing Address */}
				<div className="grid gap-2">
					<h3 className="font-semibold text-lg text-navy-darkest">
						Billing Address
					</h3>
					{billingSameAsShipping ? (
						<div className="text-gray-darkest text-sm italic">
							Same as shipping address
						</div>
					) : (
						<div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
							<div>
								<span className="font-semibold text-gray-darkest">
									Address Line 1
								</span>
								<div className="text-navy-darkest">
									{formData.billing_address_line_1}
								</div>
							</div>
							{formData.billing_address_line_2 && (
								<div>
									<span className="font-semibold text-gray-darkest">
										Address Line 2
									</span>
									<div className="text-navy-darkest">
										{formData.billing_address_line_2}
									</div>
								</div>
							)}
							<div>
								<span className="font-semibold text-gray-darkest">City</span>
								<div className="text-navy-darkest">{formData.billing_city}</div>
							</div>
							<div>
								<span className="font-semibold text-gray-darkest">County</span>
								<div className="text-navy-darkest">
									{formData.billing_county}
								</div>
							</div>
							<div>
								<span className="font-semibold text-gray-darkest">Country</span>
								<div className="text-navy-darkest">
									{formData.billing_country}
								</div>
							</div>
							<div>
								<span className="font-semibold text-gray-darkest">
									Postal Code
								</span>
								<div className="text-navy-darkest">
									{formData.billing_postal_code}
								</div>
							</div>
							<div>
								<span className="font-semibold text-gray-darkest">Phone</span>
								<div className="text-navy-darkest">
									{formData.billing_phone}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			{/* Terms and Conditions */}
			<div className="rounded-lg bg-gray-50 p-4">
				<label className="flex items-start gap-3 text-sm">
					<input
						type="checkbox"
						name="terms_accepted"
						required
						className="mt-0.5 h-4 w-4 accent-teal"
					/>
					<span>
						I agree to the{" "}
						<a
							href="/terms"
							className="text-teal hover:underline"
							target="_blank"
							rel="noreferrer"
						>
							Terms and Conditions
						</a>{" "}
						and{" "}
						<a
							href="/privacy"
							className="text-teal hover:underline"
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
		<Modal open={open} onClose={onClose} title="Checkout">
			{renderStepper}

			<Form method="POST" className="grid gap-4">
				{/* Step 1: Contact Info + Shipping */}
				<div
					className={
						step === 1
							? "fade-in slide-in-from-bottom-5 grid animate-in grid-cols-2 gap-4"
							: "hidden"
					}
				>
					<Input
						name="first_name"
						label="First name"
						required
						value={formData.first_name}
						onChange={handleInputChange}
					/>
					<Input
						name="last_name"
						label="Last name"
						required
						value={formData.last_name}
						onChange={handleInputChange}
					/>
					<Input
						name="email"
						type="email"
						label="Email"
						required
						value={formData.email}
						onChange={handleInputChange}
					/>
					<Input
						name="phone"
						type="tel"
						label="Phone"
						required
						value={formData.phone}
						onChange={handleInputChange}
					/>
				</div>

				{/* Step 2: Shipping Address */}
				<div
					className={
						step === 2
							? "fade-in slide-in-from-bottom-5 grid animate-in grid-cols-2 gap-4"
							: "hidden"
					}
				>
					<div className="col-span-2">
						<Input
							name="shipping_address_line_1"
							label="Address Line 1"
							required
							value={formData.shipping_address_line_1}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col-span-2">
						<Input
							name="shipping_address_line_2"
							label="Address Line 2"
							value={formData.shipping_address_line_2}
							onChange={handleInputChange}
						/>
					</div>
					<Input
						name="shipping_city"
						label="City"
						required
						value={formData.shipping_city}
						onChange={handleInputChange}
					/>
					<Input
						name="shipping_county"
						label="County"
						value={formData.shipping_county}
						onChange={handleInputChange}
					/>
					<Input
						name="shipping_country"
						label="Country"
						required
						value={formData.shipping_country}
						onChange={handleInputChange}
					/>
					<Input
						name="shipping_postal_code"
						label="Postal Code"
						required
						value={formData.shipping_postal_code}
						onChange={handleInputChange}
					/>
					<Input
						name="shipping_phone"
						type="tel"
						label="Phone"
						required
						value={formData.shipping_phone}
						onChange={handleInputChange}
					/>
					<div className="col-span-2">
						<Input
							name="shipping_delivery_instructions"
							label="Delivery Instructions"
							value={formData.shipping_delivery_instructions}
							placeholder="Optional"
							onChange={handleInputChange}
						/>
					</div>
				</div>

				{/* Step 3: Billing Address */}
				<div
					className={
						step === 3
							? "fade-in slide-in-from-bottom-5 grid animate-in grid-cols-2 gap-4"
							: "hidden"
					}
				>
					<div className="col-span-2">
						<label className="flex items-center gap-2 text-sm">
							<input
								type="checkbox"
								name="use_shipping_for_billing"
								checked={billingSameAsShipping}
								onChange={handleSameAsShippingChange}
								className="h-4 w-4 accent-teal"
							/>
							<span>Same as shipping</span>
						</label>
					</div>
					<div className="col-span-2">
						<Input
							name="billing_address_line_1"
							label="Address Line 1"
							required
							disabled={billingSameAsShipping}
							value={formData.billing_address_line_1}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col-span-2">
						<Input
							name="billing_address_line_2"
							label="Address Line 2"
							disabled={billingSameAsShipping}
							value={formData.billing_address_line_2}
							onChange={handleInputChange}
						/>
					</div>
					<Input
						name="billing_city"
						label="City"
						required
						disabled={billingSameAsShipping}
						value={formData.billing_city}
						onChange={handleInputChange}
					/>
					<Input
						name="billing_county"
						label="County"
						disabled={billingSameAsShipping}
						value={formData.billing_county}
						onChange={handleInputChange}
					/>
					<Input
						name="billing_country"
						label="Country"
						required
						disabled={billingSameAsShipping}
						value={formData.billing_country}
						onChange={handleInputChange}
					/>
					<Input
						name="billing_postal_code"
						label="Postal Code"
						required
						disabled={billingSameAsShipping}
						value={formData.billing_postal_code}
						onChange={handleInputChange}
					/>
					<Input
						name="billing_phone"
						label="Phone"
						type="tel"
						required
						disabled={billingSameAsShipping}
						value={formData.billing_phone}
						onChange={handleInputChange}
					/>
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
							? "fade-in slide-in-from-bottom-5 grid animate-in gap-4"
							: "hidden"
					}
				>
					{/* Cart Summary at Payment Step */}
					<div>
						<CartSummary cart={cart} />
					</div>
					{secret && (
						<Elements options={{ clientSecret: secret }} stripe={stripePromise}>
							<CheckoutPaymentForm pay={pay} />
						</Elements>
					)}
				</div>

				{/* Navigation Buttons */}
				<div className="sticky bottom-0 z-20 flex justify-between gap-4 border-gray-lightest border-t bg-white pt-4 pb-2 shadow-[0_-2px_8px_-4px_rgba(0,0,0,0.04)]">
					{step > 1 && (
						<Button type="button" onClick={goToPrevStep}>
							Previous
						</Button>
					)}
					<div className="flex-1" />
					{step < 4 && (
						<Button type="button" onClick={goToNextStep}>
							Next
						</Button>
					)}
					{step === 4 && (
						<Button name="_action" value="checkout" type="submit">
							Proceed to Payment
						</Button>
					)}
					{step === 5 && (
						<Button type="button" onClick={() => setPay(true)}>
							Pay
						</Button>
					)}
				</div>
			</Form>
		</Modal>
	);
};
