import * as RadixSlider from "@radix-ui/react-slider";
import { forwardRef, useEffect, useState } from "react";
import { currency } from "~/utils";

export interface SliderProps {
	className?: string;
	isCurrency?: boolean;
	defaultValue?: number[];
	disabled?: boolean;
	id?: string;
	label: string;
	max?: number;
	min?: number;
	onValueChange?: (value: number[]) => void;
	onValueCommit?: (value: number[]) => void;
	prefix?: string;
	showValue?: boolean;
	step?: number;
	suffix?: string;
	value?: number[];
}

/**
 * Slider component supporting single or double thumbs (range).
 * Uses Radix UI Slider primitive.
 */
export const Slider = forwardRef<HTMLSpanElement, SliderProps>(
	(
		{
			className = "",
			isCurrency = false,
			defaultValue = [1],
			disabled = false,
			id,
			label,
			max = 100,
			min = 0,
			onValueChange,
			onValueCommit,
			prefix = "",
			showValue = true,
			step = 1,
			suffix = "",
			value,
			...props
		},
		ref,
	) => {
		const thumbs = (value ?? defaultValue).length;

		const [internalValue, setInternalValue] = useState(
			value ?? defaultValue,
		);

		useEffect(() => {
			if (value !== undefined) setInternalValue(value);
		}, [value]);

		const handleValueChange = (val: number[]) => {
			setInternalValue(val);
			onValueChange?.(val);
		};

		const formatValue = (val: number) => {
			if (isCurrency) {
				// Use currency util to format
				return currency(val, 0);
			}
			// If currency is false, just show number as is
			return val.toString();
		};

		return (
			<div className={className}>
				<div className="flex flex-col gap-1">
					<span className="font-bold">{label}</span>
					{showValue && (
						<div className="flex items-center gap-1 font-medium text-gray-700 text-sm">
							{prefix && !isCurrency && <span>{prefix}</span>}
							{internalValue.length === 1 ? (
								<span>{formatValue(internalValue[0])}</span>
							) : (
								<>
									<span>{formatValue(internalValue[0])}</span>
									<span className="mx-1">~</span>
									<span>{formatValue(internalValue[1])}</span>
								</>
							)}
							{suffix && !currency && <span>{suffix}</span>}
						</div>
					)}
				</div>
				<RadixSlider.Root
					ref={ref}
					id={id}
					min={min}
					max={max}
					step={step}
					{...(value !== undefined ? { value } : { defaultValue })}
					onValueChange={handleValueChange}
					onValueCommit={onValueCommit}
					disabled={disabled}
					className="relative flex h-6 w-full touch-none select-none items-center"
					{...props}
				>
					<RadixSlider.Track className="relative h-2 grow rounded-full bg-gray-light">
						<RadixSlider.Range className="absolute h-2 rounded-full bg-teal" />
					</RadixSlider.Track>
					{Array.from({ length: thumbs }).map((_, i) => (
						<RadixSlider.Thumb
							key={`thumb-${i}-${(value ?? defaultValue)[i]}`}
							className="block h-5 w-5 rounded-full border-2 border-white bg-teal shadow focus:outline-none focus:ring-2 focus:ring-teal disabled:bg-gray-light"
						/>
					))}
				</RadixSlider.Root>
			</div>
		);
	},
);

Slider.displayName = "Slider";

export default Slider;
