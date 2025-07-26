import {
	type ActionFunctionArgs,
	Form,
	Link,
	data,
	href,
	redirect,
	useNavigation,
} from "react-router";
import { Button, Input, Loading } from "~/components";

import { commitSession, getSession, register } from "~/.server";
import { guestMiddleware } from "~/middlewares";
import { ToastType } from "~/types";
import { putToast } from "~/utils";
import type { Route } from "./+types/register";

export async function action({ request }: ActionFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const formData = await request.formData();
	const {
		response: customer,
		error,
		errors,
	} = await register(session, formData);

	if (customer) {
		putToast(session, {
			message: "Registration successful! You can now sign in.",
			type: ToastType.Success,
		});
		return redirect("/login", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}

	putToast(session, {
		message: error || "Please fix the errors below.",
		type: ToastType.Error,
	});

	return data(
		{ error, errors },
		{
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		},
	);
}

export const unstable_middleware = [guestMiddleware];

export default function RegisterPage({ actionData }: Route.ComponentProps) {
	const { errors, error } = actionData || {};

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
								error={errors?.email || error}
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
