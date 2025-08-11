import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import type React from "react";
import { cn } from "~/utils";

export interface SelectOption {
	label: string;
	value: string;
}

interface SelectProps {
	label?: string;
	value: string;
	options: SelectOption[];
	onChange: (value: string) => void;
	id?: string;
	name?: string;
	className?: string;
	error?: string;
}

export const Select: React.FC<SelectProps> = ({
	label,
	value,
	options,
	onChange,
	id,
	name,
	className = "",
	error,
}) => {
	return (
		<div
			className={`group/input w-full space-y-1.5 font-semibold text-sm ${className}`}
		>
			{label && (
				<label
					htmlFor={id}
					className={cn("mb-1 block text-gray-dark", error && "text-red")}
				>
					{label}
				</label>
			)}
			<Listbox value={value} onChange={onChange} name={name}>
				<div className="relative">
					<ListboxButton
						id={id}
						className={cn(
							"w-full rounded-full border-2 border-gray-light bg-white px-3 py-2 text-left text-navy-darkest text-sm outline-none transition focus:border-teal",
							error && "border-red",
						)}
					>
						<span className="block truncate pr-5">
							{options.find((o) => o.value === value)?.label || ""}
						</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronDownIcon
								className="h-5 w-5 text-gray-dark"
								aria-hidden="true"
							/>
						</span>
					</ListboxButton>
					<ListboxOptions className="absolute z-20 mt-0.5 max-h-60 w-full overflow-auto rounded-2xl border-2 border-gray-lighter bg-white ring-opacity-5 focus:outline-none sm:text-sm">
						{options.map((option) => (
							<ListboxOption
								key={option.value}
								value={option.value}
								className="group relative flex cursor-pointer select-none items-center gap-2 px-2 py-2 text-navy-darkest transition-colors data-[focus]:bg-gray-lighter data-[selected]:font-semibold data-[focus]:text-navy-darkest"
							>
								<CheckIcon
									className="h-4 w-4 shrink-0 text-gray-dark opacity-0 group-data-[selected]:opacity-100"
									aria-hidden="true"
								/>
								<span>{option.label}</span>
							</ListboxOption>
						))}
					</ListboxOptions>
				</div>
			</Listbox>
			{error && <p className="mt-1 text-red">{error}</p>}
		</div>
	);
};
