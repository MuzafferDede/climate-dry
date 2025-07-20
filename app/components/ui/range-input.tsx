import { Input as HeadlessInput } from "@headlessui/react";
import React from "react";

interface RangeInputProps {
	min: number;
	max: number;
	defaultValue?: number;
	step?: number;
	onChange?: (value: number) => void;
	label?: string;
	className?: string;
}

export const RangeInput: React.FC<RangeInputProps> = ({
	min,
	max,
	defaultValue,
	step = 1,
	onChange,
	label,
	className = "",
	...rest
}) => {
	const id = React.useId();
	const inputRef = React.useRef<HTMLInputElement>(null);
	const outputRef = React.useRef<HTMLOutputElement>(null);

	const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
		const value = (e.target as HTMLInputElement).value;
		if (outputRef.current) {
			outputRef.current.textContent = value;
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(Number(e.target.value));
	};

	React.useEffect(() => {
		// Set initial output value
		if (outputRef.current && inputRef.current) {
			outputRef.current.textContent = inputRef.current.value;
		}
	}, []);

	return (
		<div className={`flex flex-col gap-2 ${className}`}>
			{label && (
				<label htmlFor={id} className="font-medium text-sm">
					{label}
				</label>
			)}
			<HeadlessInput
				ref={inputRef}
				id={id}
				type="range"
				min={min}
				max={max}
				step={step}
				defaultValue={defaultValue}
				onInput={handleInput}
				onChange={handleChange}
				className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary"
				{...rest}
			/>
			<div className="flex justify-between text-gray-500 text-xs">
				<span>{min}</span>
				<output ref={outputRef} htmlFor={id} id={`${id}-output`} />
				<span>{max}</span>
			</div>
		</div>
	);
};

export default RangeInput;
