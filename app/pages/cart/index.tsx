export function meta() {
	return [
		{ title: "My Cart | Climate Dry" },
		{
			name: "description",
			content: "Review your shopping cart at Climate Dry",
		},
	];
}

export default function CartPage() {
	return (
		<div className="container mx-auto px-4 py-12">
			{/* Cart Header */}
			<div className="mb-10 flex items-center justify-between">
				<div className="h-10 w-48 animate-pulse rounded bg-teal-700" />
				<div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
			</div>

			{/* Main Content */}
			<div className="flex flex-col gap-8 md:flex-row">
				{/* Cart Items List */}
				<div className="w-full flex-shrink-0 md:w-2/3">
					<div className="rounded-lg bg-white p-6 shadow-md">
						<div className="mb-6 h-8 w-48 animate-pulse rounded bg-teal-700" />{" "}
						{/* "Cart Items" Title */}
						<div className="space-y-4">
							<div className="flex animate-pulse items-center gap-4 rounded-lg border border-gray-200 p-4">
								<div className="h-24 w-24 rounded bg-gray-100" />
								<div className="flex flex-1 flex-col gap-1">
									<div className="h-6 w-48 rounded bg-gray-300" />
									<div className="h-4 w-24 rounded bg-gray-200" />
									<div className="h-4 w-16 rounded bg-gray-200" />
								</div>
								<div className="h-6 w-24 rounded bg-gray-300" />
							</div>
							<div className="flex animate-pulse items-center gap-4 rounded-lg border border-gray-200 p-4">
								<div className="h-24 w-24 rounded bg-gray-100" />
								<div className="flex flex-1 flex-col gap-1">
									<div className="h-6 w-48 rounded bg-gray-300" />
									<div className="h-4 w-24 rounded bg-gray-200" />
									<div className="h-4 w-16 rounded bg-gray-200" />
								</div>
								<div className="h-6 w-24 rounded bg-gray-300" />
							</div>
							{/* Repeat as needed */}
						</div>
					</div>
				</div>

				{/* Cart Summary */}
				<div className="w-full md:w-1/3">
					<div className="animate-pulse rounded-lg bg-white p-6 shadow-md">
						<div className="mb-6 h-8 w-40 rounded bg-teal-700" />{" "}
						{/* "Summary" Title */}
						<div className="space-y-4">
							<div className="flex justify-between rounded bg-gray-100 p-4">
								<div className="h-4 w-24 rounded bg-gray-300" />
								<div className="h-4 w-16 rounded bg-gray-300" />
							</div>
							<div className="flex justify-between rounded bg-gray-100 p-4">
								<div className="h-4 w-24 rounded bg-gray-300" />
								<div className="h-4 w-16 rounded bg-gray-300" />
							</div>
							<div className="flex justify-between rounded bg-gray-100 p-4 font-bold">
								<div>Total</div>
								<div>$123.45</div>
							</div>
							<button
								type="button"
								className="mt-6 w-full rounded bg-teal-700 py-3 font-semibold text-white transition-colors hover:bg-teal-800"
							>
								Proceed to Checkout
							</button>
						</div>
					</div>

					{/* Recommended Products */}
					<div className="mt-8 animate-pulse rounded-lg bg-white p-6 shadow-md">
						<div className="mb-6 h-8 w-56 rounded bg-teal-700" />{" "}
						{/* "Recommended for You" */}
						<div className="grid grid-cols-2 gap-4">
							<div className="h-32 rounded-lg bg-gray-100" />
							<div className="h-32 rounded-lg bg-gray-100" />
							<div className="h-32 rounded-lg bg-gray-100" />
							<div className="h-32 rounded-lg bg-gray-100" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
