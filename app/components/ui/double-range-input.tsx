import React from "react";

interface DoubleRangeInputProps {
	min: number;
	max: number;
	step?: number;
	defaultMin?: number;
	defaultMax?: number;
	name?: string; // base name, e.g. 'price'
	label?: string;
	className?: string;
}

export const DoubleRangeInput: React.FC<DoubleRangeInputProps> = ({
	min,
	max,
	step = 1,
	defaultMin,
	defaultMax,
	name = "price",
	label,
	className = "",
}) => {
	const minId = React.useId();
	const [minVal, setMinVal] = React.useState(defaultMin ?? min);
	const [maxVal, setMaxVal] = React.useState(defaultMax ?? max);
	const fillRef = React.useRef<HTMLDivElement>(null);

	// Update fill on value change
	React.useEffect(() => {
		const percentMin = ((minVal - min) / (max - min)) * 100;
		const percentMax = ((maxVal - min) / (max - min)) * 100;
		if (fillRef.current) {
			fillRef.current.style.left = `${percentMin}%`;
			fillRef.current.style.width = `${percentMax - percentMin}%`;
		}
	}, [minVal, maxVal, min, max]);

	// Handlers
	const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Math.min(Number(e.target.value), maxVal - step);
		setMinVal(value);
	};

	const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Math.max(Number(e.target.value), minVal + step);
		setMaxVal(value);
	};

	return (
		<div className={`flex flex-col gap-2 ${className}`}>
			{label && (
				<label htmlFor={minId} className="font-medium text-sm">
					{label}
				</label>
			)}
			<div className="relative flex h-8 items-center">
				{/* Track fill */}
				<div
					ref={fillRef}
					className="absolute h-2 rounded-lg bg-teal-500"
					style={{
						left: 0,
						width: 0,
						top: "50%",
						transform: "translateY(-50%)",
						zIndex: 1,
					}}
				/>
				{/* Track background */}
				<div className="-translate-y-1/2 absolute top-1/2 z-0 h-2 w-full rounded-lg bg-gray-200" />
				{/* Min thumb */}
				<input
					id={minId}
					type="range"
					min={min}
					max={max}
					step={step}
					value={minVal}
					name={`${name}[min]`}
					onChange={handleMinInput}
					className="pointer-events-auto absolute h-2 range-thumb:h-5 range-thumb:w-5 w-full appearance-none range-thumb:rounded-full range-thumb:border-2 range-thumb:border-white bg-transparent range-thumb:bg-teal-500 range-track:bg-transparent accent-teal range-thumb:shadow-lg range-thumb:shadow-teal-200"
					style={{ zIndex: 3 }}
				/>
				{/* Max thumb */}
				<input
					type="range"
					min={min}
					max={max}
					step={step}
					value={maxVal}
					name={`${name}[max]`}
					onChange={handleMaxInput}
					className="pointer-events-auto absolute h-2 range-thumb:h-5 range-thumb:w-5 w-full appearance-none range-thumb:rounded-full range-thumb:border-2 range-thumb:border-white bg-transparent range-thumb:bg-teal-500 range-track:bg-transparent accent-teal range-thumb:shadow-lg range-thumb:shadow-teal-200"
					style={{ zIndex: 2 }}
				/>
			</div>
			<div className="flex justify-between text-gray-500 text-xs">
				<span>{minVal}</span>
				<span>{maxVal}</span>
			</div>
		</div>
	);
};

export default DoubleRangeInput;
