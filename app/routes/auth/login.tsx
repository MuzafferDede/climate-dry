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
import { type Customer, ToastType } from "~/types";
import { validator } from "~/utils";
import type { Route } from "./+types/login";

// Schema for validating login form
const loginSchema = z.object({
	email: z.string().email("Please enter a valid email"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

// Response shape from your backend
interface LoginResponse {
	message: string;
	data: Customer;
}

export async function action({ request }: ActionFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const formData = await request.formData();
	const formValues = Object.fromEntries(formData);
	const validated = validator(formValues, loginSchema);

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
		const response = await api.post<LoginResponse>(
			"/customer/login",
			validated.data,
		);

		// ✅ Login success
		session.set("customer", response.data);
		putToast(session, {
			message: "Login successful!",
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
				: "Login failed. Please try again.";

		putToast(session, {
			message,
			type: ToastType.Error,
		});

		return data(
			{
				errors: {
					email: true,
					password: true,
				},
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

export default function LoginPage({ actionData }: Route.ComponentProps) {
	const { errors } = actionData || {};
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<div className="mx-auto max-w-7xl px-4 py-12">
			<div className="fade-in-90 zoom-in-90 mx-auto my-16 max-w-lg animate-in rounded-xl border border-gray-200 bg-white px-6 py-8 shadow-sm">
				<h1 className="mb-8 text-center font-bold text-2xl">
					Sign in to your account
				</h1>

				<Form method="post" className="space-y-6">
					<Input
						label="Email"
						type="email"
						name="email"
						placeholder="you@example.com"
						error={errors?.email}
						autoComplete="email"
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
						className="w-full justify-center"
						variant="default"
						type="submit"
						disabled={isSubmitting}
						icon={isSubmitting && <Loading />}
					>
						<span>Signin</span>
					</Button>
				</Form>

				<p className="mt-8 text-center">
					<span>Don't have an account?</span>{" "}
					<Link
						to={href("/register")}
						className="font-medium text-teal underline-offset-4 hover:underline"
					>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
}
