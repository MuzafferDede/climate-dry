import type { LoaderFunctionArgs } from "react-router";
import { authGuard } from "~/middlewares";

export function meta() {
	return [
		{ title: "My Account | Climate Dry" },
		{ name: "description", content: "Manage your Climate Dry account" },
	];
}

export async function loader({ request }: LoaderFunctionArgs) {
	await authGuard(request);

	return {
		title: "My Account",
	};
}

// export const unstable_middleware = [authMiddleware];

export default function AccountPage() {
	return (
		<div className="mx-auto max-w-7xl px-4 py-12">
			{/* Header placeholders */}
			<header className="mb-10 flex items-center justify-between">
				<div className="h-10 w-48 animate-pulse rounded bg-teal-700" />
				<div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
			</header>

			<div className="flex flex-col gap-8 md:flex-row">
				{/* Sidebar placeholder */}
				<aside className="w-full shrink-0 md:w-64">
					<div className="animate-pulse rounded-lg bg-gray-100 p-6">
						<div className="space-y-4">
							<div className="mb-4 h-8 w-32 rounded bg-teal-700" />
							<div className="h-6 w-full rounded bg-gray-300" />
							<div className="h-6 w-full rounded bg-gray-300" />
							<div className="h-6 w-full rounded bg-gray-300" />

							<div className="mt-8 mb-4 h-8 w-40 rounded bg-teal-700" />
							<div className="h-6 w-full rounded bg-gray-300" />
							<div className="h-6 w-full rounded bg-gray-300" />
						</div>
					</div>
				</aside>

				{/* Main dashboard placeholders */}
				<main className="flex-1 space-y-10">
					{/* Carbon Usage Summary */}
					<section className="animate-pulse rounded-lg bg-white p-6 shadow-md">
						<div className="mb-6 h-8 w-48 rounded bg-teal-700" />
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							<div className="h-32 rounded-lg bg-gray-100" />
							<div className="h-32 rounded-lg bg-gray-100" />
							<div className="h-32 rounded-lg bg-gray-100" />
						</div>
					</section>

					{/* Recent Activity */}
					<section className="animate-pulse rounded-lg bg-white p-6 shadow-md">
						<div className="mb-6 h-8 w-40 rounded bg-teal-700" />
						<div className="space-y-4">
							<div className="h-16 w-full rounded-lg bg-gray-100" />
							<div className="h-16 w-full rounded-lg bg-gray-100" />
							<div className="h-16 w-full rounded-lg bg-gray-100" />
						</div>
					</section>

					{/* Carbon Reduction Goals */}
					<section className="animate-pulse rounded-lg bg-white p-6 shadow-md">
						<div className="mb-6 h-8 w-56 rounded bg-teal-700" />
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<div className="h-40 rounded-lg bg-gray-100" />
							<div className="h-40 rounded-lg bg-gray-100" />
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
