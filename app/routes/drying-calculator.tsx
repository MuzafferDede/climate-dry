import { useState } from "react";
import {
	Breadcrumb,
	Button,
	Input,
	PageNavigation,
	SectionHeader,
	Select,
} from "~/components/ui";

import type { MetaFunction } from "react-router";


export const meta: MetaFunction = () => [
	{ title: "Drying Calculator" },
	{ name: "description", content: "Calculate your drying needs using our drying calculator. Perfect for use with dehumidifiers and other drying equipment." },
];

const temperatureOptions = [
	{ label: "-20°C", value: "-20" },
	{ label: "-10°C", value: "-10" },
	{ label: "0°C", value: "0" },
	{ label: "10°C", value: "10" },
	{ label: "20°C", value: "20" },
	{ label: "30°C", value: "30" },
	{ label: "40°C", value: "40" },
];
const currentHumidityOptions = [
	{ label: "Damp Protection (60-70%)", value: "60-70" },
	{ label: "Comfort (50-60%)", value: "50-60" },
	{ label: "Dry (40-50%)", value: "40-50" },
	{ label: "Very Dry (30-40%)", value: "30-40" },
];
const targetHumidityOptions = [
	{ label: "Very Dry Specialist Storage Condition (30-40%)", value: "30-40" },
	{ label: "Dry (40-50%)", value: "40-50" },
	{ label: "Comfort (50-60%)", value: "50-60" },
	{ label: "Damp Protection (60-70%)", value: "60-70" },
];

export const handle = {
	breadcrumb: () => [
		{ label: "Advice Hub", path: "/info-hub" },
		{ label: "Drying Calculator", path: "/drying-calculator/" },
	],
};

export default function DryingCalculatorPage() {
	const [length, setLength] = useState(0);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [cubicCapacity, setCubicCapacity] = useState("");
	const [temperature, setTemperature] = useState("-20");
	const [currentHumidity, setCurrentHumidity] = useState("60-70");
	const [targetHumidity, setTargetHumidity] = useState("30-40");
	const [result, setResult] = useState<null | {
		cubic: number;
		litres: number;
	}>(null);

	function getLitresPerM3(target: string) {
		switch (target) {
			case "60-70":
				return 0.5;
			case "50-60":
				return 0.7;
			case "40-50":
				return 1.0;
			case "30-40":
				return 1.2;
			default:
				return 0.7;
		}
	}

	function handleCalculate() {
		let cubic = Number(cubicCapacity);
		if (!cubic || cubic <= 0) {
			cubic = length * width * height;
		}
		cubic = Math.max(0, Math.round(cubic * 100) / 100); // round to 2 decimals
		const litres = Math.round(cubic * getLitresPerM3(targetHumidity));
		setResult(cubic > 0 ? { cubic, litres } : null);
	}

	return (
		<div className="space-y-8 px-5 py-8">
			<div className="mx-auto max-w-7xl space-y-8">
				<Breadcrumb />

				<div className="space-y-2">
					<h1 className="font-bold text-4xl text-navy-darkest">Advice Hub</h1>
					<div className="prose mx-auto prose-img:mx-auto prose-figcaption:hidden max-w-none prose-img:max-w-full">
						<p>
							All our collective industry experts have got together to provide
							you with all you need to know about drying out and keeping dry
							those things precious to you. Read our articles or delve into our
							solutions centre to soak up the knowledge.
						</p>
					</div>
				</div>
				<PageNavigation />
				<SectionHeader
					category="Calculate your drying needs"
					title="Drying calculator"
					description="Use our handy drying calculator to figure out your dehumidification capacity"
				/>
				<div className="mx-auto mt-8 max-w-5xl space-y-10 rounded-lg bg-white p-8">
					<div className="space-y-6">
						<h2 className="text-center font-bold text-2xl text-navy-darkest">
							1. Enter your room dimensions
						</h2>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
							<Input
								label="Length (0-1000m)"
								type="number"
								min={0}
								max={1000}
								value={length}
								onChange={(e) => setLength(Number(e.target.value))}
							/>
							<Input
								label="Width (0-1000m)"
								type="number"
								min={0}
								max={1000}
								value={width}
								onChange={(e) => setWidth(Number(e.target.value))}
							/>
							<Input
								label="Height (0-50m)"
								type="number"
								min={0}
								max={50}
								value={height}
								onChange={(e) => setHeight(Number(e.target.value))}
							/>
						</div>
						<div className="flex items-center justify-center py-2">
							<span className="font-bold text-lg text-navy-darkest">OR</span>
						</div>
						<div className="flex flex-col items-center">
							<Input
								label="Room Cubic Capacity (0-50,000m³)"
								type="number"
								min={0}
								max={50000}
								value={cubicCapacity}
								onChange={(e) => setCubicCapacity(e.target.value)}
							/>
						</div>
					</div>
					<div className="space-y-6">
						<h2 className="text-center font-bold text-2xl text-navy-darkest">
							2. Enter your Space conditions
						</h2>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
							<Select
								label="Avg Room Temperature (-20-40°C)"
								value={temperature}
								options={temperatureOptions}
								onChange={setTemperature}
							/>
							<Select
								label="Current Humidity (%)"
								value={currentHumidity}
								options={currentHumidityOptions}
								onChange={setCurrentHumidity}
							/>
							<Select
								label="Target Humidity (%)"
								value={targetHumidity}
								options={targetHumidityOptions}
								onChange={setTargetHumidity}
							/>
						</div>
					</div>
					<div className="flex justify-center pt-6">
						<Button
							type="button"
							variant="secondary"
							size="default"
							onClick={handleCalculate}
						>
							Calculate
						</Button>
					</div>
				</div>
				{result && (
					<div className="mx-auto mt-8 max-w-2xl rounded-lg border border-teal bg-teal/5 p-6 text-center shadow">
						<h3 className="mb-2 font-bold text-2xl text-teal">
							Calculation Result
						</h3>
						<div className="text-lg text-navy-darkest">
							<p>
								<strong>Room Cubic Capacity:</strong>{" "}
								{result.cubic.toLocaleString()} m³
							</p>
							<p>
								<strong>Estimated Dehumidification Required:</strong>{" "}
								{result.litres.toLocaleString()} litres/day
							</p>
						</div>
						<p className="mt-2 text-gray text-xs">
							* This is a guideline. For specialist or critical environments,
							consult an expert.
						</p>
					</div>
				)}
			</div>

			<div className="mx-auto mt-8 max-w-5xl space-y-10 rounded-lg bg-white p-8">
				<p className="text-center text-xxs">
					Calculation based on approximate maximum moisture load and is subject
					to internal conditions within the space. Real world results may vary
					depending on factors including but not limited to; severity and source
					of moisture infiltration, quality/type of building construction,
					temperature, location and unit settings. Results provided are strictly
					deemed as guidance, and real world performance, functionality and
					suitability of units within a space cannot be guaranteed
				</p>
			</div>
		</div>
	);
}
