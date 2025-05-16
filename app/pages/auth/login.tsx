import { Form, Link, href, redirect, useNavigation } from "react-router";
import { z } from "zod";
import { Button, Input } from "~/components";
import { validator } from "~/lib/utils";
import { guestMiddleware } from "~/middlewares";
import { fetcher } from "~/services";
import { commitSession, getSession } from "~/services/session.server";
import type { Customer } from "~/types";
import type { Route } from "./+types/login";

const loginSchema = z.object({
	email: z.string().email("Please enter a valid email"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.min(1, "Password is required"),
});

interface LoginResponse {
	message: string;
	data: Customer;
}

export async function loader({ request }: { request: Request }) {
	const url = new URL(request.url);
	const registered = url.searchParams.get("registered") === "success";

	return { registered };
}

export async function action({ request }: { request: Request }) {
	const formData = await request.formData();
	const formValues = Object.fromEntries(formData);

	const validated = validator(formValues, loginSchema);

	if (validated.errors) {
		return {
			errors: validated.errors,
			message: "Please fix the errors below.",
		};
	}

	try {
		const api = await fetcher(request);

		const response = await api.post<LoginResponse>(
			"/customer/login",
			validated.data,
		);

		const session = await getSession(request.headers.get("Cookie"));
		session.set("customer", response.data);

		return redirect("/account", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	} catch (error) {
		return {
			message:
				error instanceof Error
					? error.message
					: "Login failed. Please try again.",
		};
	}
}

export const unstable_middleware = [guestMiddleware];

export default function LoginPage({
	actionData,
	loaderData,
}: Route.ComponentProps) {
	const { registered } = loaderData;
	const { errors, message } = actionData || {};
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<div className="container mx-auto px-4 py-12">
			<div className="fade-in-90 zoom-in-90 mx-auto my-16 max-w-lg animate-in rounded-xl border border-gray-200 bg-white px-6 py-8 shadow-sm">
				<h1 className="mb-8 text-center font-semibold text-2xl">
					Sign in to your account
				</h1>

				{registered && (
					<div className="mb-6 rounded-md bg-emerald-100 px-4 py-3 text-center text-emerald-800 text-sm">
						Registration successful! You can now sign in.
					</div>
				)}

				{message && (
					<div className="mb-6 rounded-md bg-rose-100 px-4 py-3 text-center text-rose-800 text-sm">
						{message}
					</div>
				)}

				<Form method="post" className="space-y-6">
					<Input
						label="Email"
						type="email"
						name="email"
						placeholder="you@example.com"
						error={errors?.email}
						required
					/>

					<Input
						label="Password"
						type="password"
						name="password"
						placeholder="********"
						error={errors?.password}
						required
					/>

					<Button
						className="w-full"
						variant="default"
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Signing in..." : "Sign In"}
					</Button>
				</Form>

				<p className="mt-8 text-center text-sm">
					<span>Don't have an account?</span>{" "}
					<Link
						to={href("/register")}
						className="font-medium text-cyan-600 underline-offset-4 hover:underline"
					>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
}
