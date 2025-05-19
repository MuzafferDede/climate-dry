import { Form, Link, href, redirect, useNavigation } from "react-router";
import { z } from "zod";
import { Button, Input, Loading } from "~/components";
import { validator } from "~/lib/utils";
import { guestGuard } from "~/middlewares";
import { fetcher } from "~/services";
import type { Route } from "./+types/register";

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
	data: {
		id: number;
		email: string;
	};
}

export async function loader() {
	return null;
}

export async function action({ request }: { request: Request }) {
	await guestGuard(request);
	const formData = await request.formData();
	const formValues = Object.fromEntries(formData);

	const validated = validator(formValues, registerSchema);

	if (validated.errors) {
		return {
			errors: validated.errors,
			message: "Please fix the errors below.",
		};
	}

	try {
		const api = await fetcher(request);

		await api.post<RegisterResponse>("/customer/register", validated.data);

		return redirect("/login?registered=success");
	} catch (error) {
		return {
			message:
				error instanceof Error
					? error.message
					: "Registration failed. Please try again.",
		};
	}
}

// export const unstable_middleware = [guestMiddleware];

export default function RegisterPage({ actionData }: Route.ComponentProps) {
	const { message, errors } = actionData || {};
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<div className="container mx-auto px-4 py-12">
			<div className="fade-in-90 zoom-in-90 mx-auto my-16 max-w-lg animate-in rounded-xl border border-gray-200 bg-white px-6 py-8 shadow-sm">
				<h1 className="mb-8 text-center font-semibold text-2xl">
					Create your account
				</h1>

				{message && (
					<div className="mb-6 rounded-md bg-destructive/10 px-4 py-3 text-center text-destructive text-sm">
						{message}
					</div>
				)}

				<Form method="post" className="space-y-6">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<Input
							label="First Name"
							name="first_name"
							placeholder="John"
							error={errors?.first_name}
							required
						/>
						<Input
							label="Last Name"
							name="last_name"
							placeholder="Doe"
							error={errors?.last_name}
							required
						/>
						<Input
							label="Email"
							name="email"
							type="email"
							placeholder="you@example.com"
							error={errors?.email}
							className="col-span-2"
							required
						/>
						<Input
							label="Phone"
							name="phone"
							type="tel"
							placeholder="+44 20 7123 4567"
							error={errors?.phone}
							className="col-span-2"
							required
						/>
						<Input
							label="Password"
							name="password"
							type="password"
							placeholder="********"
							error={errors?.password}
							className="col-span-2"
							required
						/>
						<Input
							label="Confirm Password"
							name="password_confirmation"
							type="password"
							placeholder="********"
							error={errors?.password_confirmation}
							className="col-span-2"
							required
						/>
					</div>

					<Button
						className="w-full gap-1"
						variant="default"
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting && <Loading />} <span>Register</span>
					</Button>
				</Form>

				<p className="mt-8 text-center text-sm">
					<span>Already have an account?</span>{" "}
					<Link
						to={href("/login")}
						className="font-medium text-cyan-600 underline-offset-4 hover:underline"
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}
