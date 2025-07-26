import {
	Description,
	Field,
	Input as HeadlessInput,
	Label,
	Textarea,
} from "@headlessui/react";
import type { InputHTMLAttributes } from "react";
import { cn } from "~/utils";

type InputProps = {
	label?: string;
	description?: string;
	error?: string | boolean;
	rows?: number;
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
	rows = 4,
	...props
}: InputProps) => {
	const Component = type === "textarea" ? Textarea : HeadlessInput;

	return (
		<div className={cn("group/input w-full space-y-1.5 font-semibold")}>
			<Field>
				{label && (
					<Label
						className={cn("mb-1 block text-gray-dark", error && "text-red")}
					>
						{label}
					</Label>
				)}

				{description && (
					<Description className="mb-1 text-white/50">
						{description}
					</Description>
				)}

				<Component
					type={type}
					name={name}
					value={value}
					{...(type === "textarea" ? { rows } : {})}
					// @ts-ignore
					onChange={onChange}
					placeholder={placeholder}
					className={cn(
						"w-full rounded-3xl border-2 border-gray-light bg-white px-3 py-2 text-navy-darkest placeholder-gray outline-none transition focus:border-teal disabled:bg-gray-lighter",
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
