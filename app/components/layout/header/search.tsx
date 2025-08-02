import {} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Form, href, useNavigation, useSearchParams } from "react-router";
import { Input } from "~/components/ui";
import { Loading } from "~/components/ui";

export const Search = () => {
	const navigation = useNavigation();
	const [searchParams] = useSearchParams();
	const loading = navigation.formAction === href("/search");
	const rawQuery = searchParams.get("q")?.trim() ?? "";

	return (
		<div className="group-data-[show=true]/search:fade-in group-data-[show=true]/search:slide-in-from-top relative z-20 order-3 hidden w-full animate-in transition-all group-data-[show=true]/search:block md:order-2 md:block md:has-[input:focus]:scale-102 lg:max-w-2xl">
			<div className="relative">
				<Form method="get" action={href("/search")} key={rawQuery}>
					<Input
						name="q"
						autoComplete="off"
						placeholder="Search products..."
						className="border-teal transition-all focus:shadow-sm focus:shadow-teal"
						defaultValue={rawQuery}
					/>
					{loading ? (
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<Loading className="size-6 text-teal" />
						</span>
					) : (
						<button
							type="submit"
							className="absolute inset-y-0 right-0 m-2 cursor-pointer hover:text-teal"
						>
							<MagnifyingGlassIcon className="size-6" />
						</button>
					)}
				</Form>
			</div>
		</div>
	);
};
