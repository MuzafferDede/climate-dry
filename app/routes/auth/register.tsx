import {
	type ActionFunctionArgs,
	Form,
	Link,
	data,
	href,
	redirect,
	useNavigation,
} from "react-router";
import { z } from "zod";
import { Button, Input, Loading } from "~/components";

import { guestMiddleware } from "~/middlewares";
import { commitSession, fetcher, getSession, putToast } from "~/services";
import { ToastType } from "~/types";
import { validator } from "~/utils";
import type { Route } from "./+types/register";

// Zod schema for form validation
const registerSchema = z
	.object({
		first_name: z.string().min(1, "First name is required"),
		last_name: z.string().min(1, "Last name is required"),
		email: z.string().email("Please enter a valid email"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		password_confirmation: z.string(),
		phone: z
			.string()
			.min(1, "Phone number is required")
			.min(10, "Phone number must be at least 10 digits"),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: "Passwords do not match",
		path: ["password_confirmation"],
	});

interface RegisterResponse {
	id: number;
	email: string;
}

export async function action({ request }: ActionFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const formData = await request.formData();
	const formValues = Object.fromEntries(formData);
	const validated = validator(formValues, registerSchema);

	if (validated.errors) {
		putToast(session, {
			message: "Please fix the errors below.",
			type: ToastType.Error,
		});

		return data(
			{
				errors: validated.errors,
			},
			{
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			},
		);
	}

	try {
		const api = await fetcher(request);
		await api.post<RegisterResponse>("/customer/register", validated.data);

		putToast(session, {
			message: "Registration successful! You can now sign in.",
			type: ToastType.Success,
		});

		return redirect("/login", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	} catch (error) {
		const message =
			error instanceof Error
				? error.message
				: "Registration failed. Please try again.";

		putToast(session, {
			message,
			type: ToastType.Error,
		});

		return data(
			{
				errors: null,
			},
			{
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			},
		);
	}
}

export const unstable_middleware = [guestMiddleware];

export default function RegisterPage({ actionData }: Route.ComponentProps) {
	const { errors } = actionData || {};
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<div className="mx-auto max-w-7xl px-4 py-12">
			<div className="fade-in-90 zoom-in-90 mx-auto my-16 max-w-lg animate-in rounded-xl border border-gray-lighter bg-white px-6 py-8 shadow-sm">
				<h1 className="mb-8 text-center font-bold text-2xl">
					Create your account
				</h1>

				<Form method="post" className="space-y-6">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div className="col-span-2 lg:col-span-1">
							<Input
								label="First Name"
								name="first_name"
								placeholder="John"
								error={errors?.first_name}
								autoComplete="given-name"
								required
							/>
						</div>
						<div className="col-span-2 lg:col-span-1">
							<Input
								label="Last Name"
								name="last_name"
								placeholder="Doe"
								error={errors?.last_name}
								autoComplete="family-name"
								required
							/>
						</div>
						<div className="col-span-2">
							<Input
								label="Email"
								name="email"
								type="email"
								placeholder="you@example.com"
								error={errors?.email}
								autoComplete="email"
								required
							/>
						</div>
						<div className="col-span-2">
							<Input
								label="Phone"
								name="phone"
								type="tel"
								placeholder="+44 20 7123 4567"
								error={errors?.phone}
								autoComplete="mobile tel"
								required
							/>
						</div>
						<div className="col-span-2">
							<Input
								label="Password"
								name="password"
								type="password"
								placeholder="********"
								error={errors?.password}
								autoComplete="current-password"
								required
							/>
						</div>
						<div className="col-span-2">
							<Input
								label="Confirm Password"
								name="password_confirmation"
								type="password"
								placeholder="********"
								error={errors?.password_confirmation}
								autoComplete="off"
								required
							/>
						</div>
					</div>

					<Button
						className="w-full justify-center"
						variant="default"
						type="submit"
						disabled={isSubmitting}
						icon={isSubmitting && <Loading />}
					>
						<span>Register</span>
					</Button>
				</Form>

				<p className="mt-8 text-center">
					<span>Already have an account?</span>{" "}
					<Link
						to={href("/login")}
						className="font-medium text-teal underline-offset-4 hover:underline"
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}
