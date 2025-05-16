import type { Route } from "./+types";

export function meta({ data }: Route.MetaArgs) {
	return [
		{ title: data.title },
		{
			name: "description",
			content: "Climate Dry - Track and reduce your carbon footprint",
		},
	];
}

export function loader({ params }: Route.LoaderArgs) {
	const title = "Climate Dry";
	return { params, title };
}

export default function Home() {
	return (
		<div className="flex min-h-screen w-full flex-col">
			{/* Hero Section */}
			<div className="flex h-96 w-full items-center justify-center bg-teal-700">
				<div className="h-32 w-3/4 rounded-lg bg-teal-600" />
			</div>

			{/* Feature Section */}
			<div className="w-full bg-gray-100 py-16">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap justify-center gap-6">
						{/* Feature card placeholders */}
						<div className="h-64 w-72 rounded-lg bg-white shadow-md" />
						<div className="h-64 w-72 rounded-lg bg-white shadow-md" />
						<div className="h-64 w-72 rounded-lg bg-white shadow-md" />
					</div>
				</div>
			</div>

			{/* Statistics Section */}
			<div className="w-full bg-teal-800 py-16">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap justify-center gap-8">
						{/* Stat placeholders */}
						<div className="h-40 w-64 rounded-lg bg-teal-700" />
						<div className="h-40 w-64 rounded-lg bg-teal-700" />
						<div className="h-40 w-64 rounded-lg bg-teal-700" />
					</div>
				</div>
			</div>

			{/* Chart Section */}
			<div className="w-full bg-white py-16">
				<div className="container mx-auto px-4">
					<div className="h-80 w-full rounded-xl bg-gray-200" />
				</div>
			</div>

			{/* Call to Action Section */}
			<div className="w-full bg-gray-100 py-16">
				<div className="container mx-auto flex justify-center px-4">
					<div className="h-48 w-3/4 rounded-lg bg-teal-600" />
				</div>
			</div>

			{/* User Dashboard Preview */}
			<div className="w-full bg-gray-800 py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div className="h-64 rounded-lg bg-gray-700" />
						<div className="h-64 rounded-lg bg-gray-700" />
					</div>
				</div>
			</div>
		</div>
	);
}
