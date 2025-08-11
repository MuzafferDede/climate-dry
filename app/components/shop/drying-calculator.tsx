import { CalculatorIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import type { Product } from "~/types";
import { Button, Input, Modal, Select } from "../ui";

// Options
const temperatureOptions = Array.from({ length: 21 }, (_, i) => {
	const val = 20 + i;
	return { label: `${val}°C`, value: String(val) };
});

const humidityOptions = [
	{ label: "Extremely Dry (0-30%)", value: "30" },
	{ label: "Very Dry (30-40%)", value: "40" },
	{ label: "Dry (40-50%)", value: "50" },
	{ label: "Normal (50-60%)", value: "60" },
	{ label: "Damp (60-70%)", value: "70" },
	{ label: "Humid (70-100%)", value: "100" },
];

// Utils
const parseNumber = (v: string) => Number.parseFloat(v) || 0;
const getHumidityFactor = (current: number, target: number) =>
	Math.max(0.5, (current - target) / 10);
const getTempFactor = (temp: number) => Math.max(0.8, 1 + (temp - 20) * 0.02);

export const DryingCalculator = ({ product }: { product: Product }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [form, setForm] = useState({
		volume: "",
		temperature: "20",
		currentHumidity: "70",
		targetHumidity: "40",
	});
	const [error, setError] = useState("");
	const [result, setResult] = useState<number | null>(null);

	const handleChange = (name: string, value: string) =>
		setForm((prev) => ({ ...prev, [name]: value }));

	const calculateDrying = () => {
		const vol = parseNumber(form.volume);
		if (vol <= 0) {
			setError("Please enter a valid room volume");
			setResult(null);
			return;
		}
		setError("");

		const requiredCapacity =
			vol *
			getHumidityFactor(
				parseNumber(form.currentHumidity),
				parseNumber(form.targetHumidity),
			) *
			getTempFactor(parseNumber(form.temperature));

		setResult(Number(requiredCapacity.toFixed(2)));
	};

	const resetCalculator = () => {
		setResult(null);
		setError("");
		setForm({
			volume: "",
			temperature: "20",
			currentHumidity: "70",
			targetHumidity: "40",
		});
	};

	const shouldRender = product.categories.some(
		(category) => category.slug === "dehumidifiers",
	);

	if (!shouldRender) return null;

	return (
		<div>
			<Button
				icon={
					<CalculatorIcon className="size-6 rounded-full border border-current p-1" />
				}
				variant="secondary"
				onClick={() => setIsOpen(true)}
			>
				Drying Calculator
			</Button>

			<Modal
				open={isOpen}
				onClose={() => setIsOpen(false)}
				title="Drying Calculator"
			>
				<div className="space-y-6">
					{!result ? (
						<>
							{/* Step 1: Form */}
							<div className="space-y-4">
								<h3 className="font-semibold text-lg">
									1. Enter Your Room Dimensions
								</h3>
								<Input
									label="Room cubic capacity m³"
									type="number"
									name="volume"
									value={form.volume}
									onChange={(e) => handleChange(e.target.name, e.target.value)}
									error={error}
									placeholder="e.g. 25"
								/>
							</div>

							<div className="space-y-4">
								<h3 className="font-semibold text-lg">
									2. Enter Your Space Conditions
								</h3>
								<Select
									label="Average Room Temperature"
									value={form.temperature}
									options={temperatureOptions}
									onChange={(val) => handleChange("temperature", val)}
								/>
								<Select
									label="Current Humidity"
									value={form.currentHumidity}
									options={humidityOptions}
									onChange={(val) => handleChange("currentHumidity", val)}
								/>
								<Select
									label="Target Humidity"
									value={form.targetHumidity}
									options={humidityOptions}
									onChange={(val) => handleChange("targetHumidity", val)}
								/>
							</div>

							<div className="flex justify-center">
								<Button onClick={calculateDrying}>Calculate</Button>
							</div>
						</>
					) : (
						<>
							{/* Step 2: Result */}
							<div className="rounded-lg border border-teal bg-teal/5 p-4 text-center">
								<p className="font-semibold text-teal uppercase">
									Approx Max. Moisture Draw:
								</p>
								<p className="text-lg">{result} L per day</p>
								<p className="mt-1 text-gray-500 text-xs">
									Calculation based on approximate maximum moisture load and is
									subject to internal conditions within the space. Real world
									results may vary depending on factors including but not
									limited to; severity and source of moisture infiltration,
									quality/type of building construction, temperature, location
									and unit settings. Results provided are strictly deemed as
									guidance, and real world performance, functionality and
									suitability of units within a space cannot be guaranteed
								</p>
							</div>

							<div className="flex justify-center">
								<Button variant="secondary" onClick={resetCalculator}>
									Recalculate
								</Button>
							</div>
						</>
					)}
				</div>
			</Modal>
		</div>
	);
};
