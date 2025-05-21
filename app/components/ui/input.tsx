import {
	Description,
	Field,
	Input as HeadlessInput,
	Label,
} from "@headlessui/react";
import type { InputHTMLAttributes } from "react";
import { cn } from "~/lib/utils";

type InputProps = {
	label?: string;
	description?: string;
	error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
	name,
	label,
	description,
	value,
	onChange,
	error,
	placeholder = "",
	type = "text",
	className = "",
	...props
}: InputProps) => {
	return (
		<div
			className={cn("group/input w-full space-y-1.5 font-semibold", className)}
		>
			<Field>
				{label && (
					<Label
						className={cn("mb-1 block font-semibold", error && "text-red-500")}
					>
						{label}
					</Label>
				)}

				{description && (
					<Description className="mb-1 text-white/50">
						{description}
					</Description>
				)}

				<HeadlessInput
					type={type}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className={cn(
						"w-full rounded-full bg-white px-3 py-2 text-navy-darkest placeholder-gray outline-2 outline-gray-light transition focus:outline-teal",
						error &&
							"border-red-500 focus:border-red-500 focus:ring-red-500/50",
					)}
					{...props}
				/>

				{error && <p className="mt-1 text-red-500">{error}</p>}
			</Field>
		</div>
	);
};
