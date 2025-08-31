import {
	type ActionFunctionArgs,
	Form,
	Link,
	data,
	href,
	redirect,
	useNavigation,
} from "react-router";
import { buildHeaders, getSession, login } from "~/.server";
import { Button, Input, Loading } from "~/components";
import { ToastType } from "~/types";
import { putToast } from "~/utils";
import type { Route } from "./+types/login";

import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => [
	{ title: "Login to your Climate Dry Account" },
	{
		name: "description",
		content:
			"Login page to allow you to access all the information you have in your Climate Dry account.",
	},
];

export async function action({ request }: ActionFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const formData = await request.formData();

	const { response: customer, error, errors } = await login(session, formData);

	if (customer) {
		session.set("customer", customer);

		putToast(session, {
			message: "Login successful!",
			type: ToastType.Success,
		});

		return redirect("/account", {
			headers: await buildHeaders(session),
		});
	}

	putToast(session, {
		message: error,
		type: ToastType.Error,
	});

	return data(
		{ errors },
		{
			headers: await buildHeaders(session),
		},
	);
}

export default function LoginPage({ actionData }: Route.ComponentProps) {
	const { errors } = actionData || {};

	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<div className="mx-auto max-w-7xl px-4 py-12">
			<div className="fade-in-90 zoom-in-90 mx-auto my-16 max-w-lg animate-in rounded-xl border border-gray-lighter bg-white px-6 py-8 shadow-sm">
				<h1 className="mb-8 text-center font-bold text-2xl">
					Login to your account
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
						<span>Login</span>
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
