import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/16/solid";
import { useFetcher } from "react-router";
import type { action } from "~/routes/contact/handler";
import { Button, Input } from "../ui";

export const ContactUsForm = () => {
	const fetcher = useFetcher<typeof action>();

	const success = fetcher.data?.success;

	return (
		<div className="@container">
			{!success ? (
				<fetcher.Form
					method="post"
					className="grid @lg:grid-cols-2 gap-4"
					action="/contact"
				>
					<Input
						required
						type="text"
						name="first_name"
						label="First Name"
						placeholder="John"
					/>
					<Input
						required
						type="text"
						name="last_name"
						label="Last Name"
						placeholder="Doe"
					/>
					<Input
						required
						type="email"
						name="email"
						label="Email"
						placeholder="you@example.com"
					/>
					<Input
						type="tel"
						name="phone"
						label="Phone"
						placeholder="+44 20 7123 4567"
					/>
					<div className="@lg:col-span-2">
						<Input
							required
							type="textarea"
							rows={4}
							label="Message"
							name="message"
							placeholder="Your message here"
						/>
					</div>
					<div className="@lg:col-span-2 flex justify-end">
						<Button
							variant="secondary"
							type="submit"
							className="text-white"
							icon={
								<ArrowRightIcon className="size-6 rounded-full border border-current p-1" />
							}
						>
							<span>Submit</span>
						</Button>
					</div>
				</fetcher.Form>
			) : (
				<div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-teal bg-gray-lightest p-8 text-center">
					<CheckCircleIcon className="size-16 text-green" />
					<h2 className="font-bold text-2xl text-gray-800">Thank you!</h2>
					<p className="text-gray-600">
						Your message has been sent successfully. We'll get back to you
						shortly.
					</p>
				</div>
			)}
		</div>
	);
};
