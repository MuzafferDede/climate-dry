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
		<div className={`relative w-full ${className}`}>
			{label && (
				<label htmlFor={id} className="mb-1 block text-gray-600 text-xs">
					{label}
				</label>
			)}
			<Listbox value={value} onChange={onChange} name={name}>
				<div className="relative">
					<ListboxButton
						id={id}
						className="relative w-full cursor-pointer rounded-lg border border-gray-lighter bg-white py-2 pr-10 pl-3 text-left text-navy-darkest text-sm outline-none transition-all hover:border-navy-darkest hover:bg-navy-darkest hover:text-white focus:border-gray-lighter focus:outline-none focus:ring-0 data-[open]:border-navy-darkest data-[open]:bg-navy-darkest data-[open]:text-white"
					>
						<span className="block truncate">
							{options.find((o) => o.value === value)?.label || ""}
						</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronDownIcon
								className="h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</span>
					</ListboxButton>
					<ListboxOptions className="absolute z-20 mt-0 max-h-60 w-full overflow-auto rounded-lg border border-gray-lighter bg-white py-1 text-base ring-opacity-5 focus:outline-none sm:text-sm">
						{options.map((option) => (
							<ListboxOption
								key={option.value}
								value={option.value}
								className="group relative flex cursor-pointer select-none items-center gap-2 px-2 py-2 text-navy-darkest transition-colors data-[focus]:bg-gray-100 data-[selected]:font-semibold data-[focus]:text-navy-darkest"
							>
								<CheckIcon
									className="h-4 w-4 shrink-0 text-gray-400 opacity-0 group-data-[selected]:opacity-100"
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
