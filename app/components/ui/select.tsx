import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import type React from "react";

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
}

export const Select: React.FC<SelectProps> = ({
	label,
	value,
	options,
	onChange,
	id,
	name,
	className = "",
}) => {
	return (
		<div
			className={`group/input w-full space-y-1.5 font-semibold ${className}`}
		>
			{label && (
				<label htmlFor={id} className="mb-1 block">
					{label}
				</label>
			)}
			<Listbox value={value} onChange={onChange} name={name}>
				<div className="relative">
					<ListboxButton
						id={id}
						className="w-full rounded-full border-2 border-gray-light bg-white px-3 py-2 text-left text-navy-darkest text-sm outline-none transition focus:border-teal"
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
					<ListboxOptions className="absolute z-20 mt-0 max-h-60 w-full overflow-auto rounded-lg border border-gray-lighter bg-white py-1 text-base ring-opacity-5 focus:outline-none sm:text-sm">
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
		</div>
	);
};
