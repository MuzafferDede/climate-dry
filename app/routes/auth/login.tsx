import {
	type ActionFunctionArgs,
	Form,
	Link,
	data,
	href,
	redirect,
	useNavigation,
} from "react-router";
import { commitSession, getSession, login } from "~/.server";
import { Button, Input, Loading } from "~/components";
import { guestMiddleware } from "~/middlewares";
import { ToastType } from "~/types";
import { putToast } from "~/utils";
import type { Route } from "./+types/login";

export async function action({ request }: ActionFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const formData = await request.formData();

	const { response: customer, error, errors } = await login(session, formData);

	if (customer) {
		session.set("customer", {
			first_name: customer.first_name,
			last_name: customer.last_name,
			id: customer.id,
			email: customer.email,
			token: customer.token,
		});

		putToast(session, {
			message: "Login successful!",
			type: ToastType.Success,
		});

		return redirect("/account", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}

	putToast(session, {
		message: error,
		type: ToastType.Error,
	});

	return data(
		{ errors },
		{
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		},
	);
}

export const unstable_middleware = [guestMiddleware];

export default function LoginPage({ actionData }: Route.ComponentProps) {
	const { errors } = actionData || {};

	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<div className="mx-auto max-w-7xl px-4 py-12">
			<div className="fade-in-90 zoom-in-90 mx-auto my-16 max-w-lg animate-in rounded-xl border border-gray-lighter bg-white px-6 py-8 shadow-sm">
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
