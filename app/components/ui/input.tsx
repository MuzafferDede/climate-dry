import {
	Description,
	Field,
	Input as HeadlessInput,
	Label,
} from "@headlessui/react";
import type { InputHTMLAttributes } from "react";
import { cn } from "~/utils";

type InputProps = {
	label?: string;
	description?: string;
	error?: string | boolean;
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
		<div className={cn("group/input w-full space-y-1.5 font-semibold")}>
			<Field>
				{label && (
					<Label className={cn("mb-1 block", error && "text-red")}>
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
						"w-full rounded-full border-2 border-gray-light bg-white px-3 py-2 text-navy-darkest placeholder-gray outline-none transition focus:border-teal",
						error && "border-red",
						className,
					)}
					{...props}
				/>

				{error && <p className="mt-1 text-red">{error}</p>}
			</Field>
		</div>
	);
};
