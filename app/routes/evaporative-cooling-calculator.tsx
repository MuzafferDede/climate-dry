import { useState } from "react";
import {
	Breadcrumb,
	Button,
	Input,
	PageNavigation,
	SectionHeader,
} from "~/components/ui";

import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => [
	{ title: "Evaporative Cooling Calculator" },
	{
		name: "description",
		content:
			"Calculate your evaporative cooling needs using our evaporative cooling calculator. Accurately calculate your cooling space and equipment needed with our handy guide.",
	},
];

export const handle = {
	breadcrumb: () => [
		{ label: "Advice Hub", path: "/info-hub" },
		{
			label: "Evaporative Cooling Calculator",
			path: "/evaporative-cooling-calculator/",
		},
	],
};
export default function DryingCalculatorPage() {
	const [length, setLength] = useState(0);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [cubicCapacity, setCubicCapacity] = useState("");
	const [result, setResult] = useState<null | { volume: number; mh: number }>(
		null,
	);

	function calculateRoomVolume(): number {
		const manual = Number.parseFloat(cubicCapacity);
		if (manual > 0) return manual;

		return length * width * height;
	}

	function handleCalculate() {
		const rv = calculateRoomVolume();

		if (!rv || rv <= 0) {
			setResult(null);
			return;
		}

		const mh = (rv / 2) * 1.69;
		setResult({ volume: rv, mh: mh });
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
					category="Calculate your cooling needs"
					title="Evaporative cooling calculator"
					description="Use our handy evaporative cooling calculator to figure out your cooling capacity"
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
								APPROX COOLING CAPACITY:{" "}
								{result.mh.toFixed(1).replace(/[.,]0$/, "")} m³/h required
							</p>
						</div>
						<p className="mt-2 text-gray text-xs">
							* This is a guideline. For specialist or critical environments,
							consult an expert.
						</p>
					</div>
				)}
				<div className="mx-auto mt-8 max-w-5xl space-y-10 rounded-lg bg-white p-8">
					<p className="text-center text-xxs">
						Please be aware, evaporative cooling calculations are approximations
						only.. The effectiveness of the unit also depends on heat retention
						properties of the space, location/placement of the unit, insulation
						type, window direction or sunlight infiltration. Please refer to the
						relevant manual and/or contact the sales team with any specific
						requirements around suitability.
					</p>
				</div>
			</div>

			<div className="mx-auto mt-8 max-w-5xl space-y-10 rounded-lg bg-white p-8">
				<h2 className="text-center font-bold text-2xl text-navy-darkest">
					Delta Temperature Chart
				</h2>

				<p>
					The delta temperature of the air coming from an evaporative cooler can
					vary depending on a number of factors including relative humidity
					within the space, water temperature, airflow setting and more
				</p>

				<table
					className="table-bordered w-full table-auto border-collapse"
					id="evaporative-cooling-table"
				>
					<colgroup width="80" />
					<colgroup width="107" />
					<colgroup span="17" width="80" />
					<tbody>
						<tr>
							<td className="border px-4 py-2" height="19" colspan="19">
								Evaporative Cooler Output Temperature Look-Up
							</td>
						</tr>
						<tr>
							<td
								className="border px-4 py-2"
								colspan="3"
								rowspan="3"
								height="58"
							>
								Celcius
							</td>
							<td className="border px-4 py-2" colspan="16">
								Humidity%
							</td>
						</tr>
						<tr>
							<td className="border px-4 py-2">5</td>
							<td className="border px-4 py-2">10</td>
							<td className="border px-4 py-2">15</td>
							<td className="border px-4 py-2">20</td>
							<td className="border px-4 py-2">25</td>
							<td className="border px-4 py-2">30</td>
							<td className="border px-4 py-2">35</td>
							<td className="border px-4 py-2">40</td>
							<td className="border px-4 py-2">45</td>
							<td className="border px-4 py-2">50</td>
							<td className="border px-4 py-2">55</td>
							<td className="border px-4 py-2">60</td>
							<td className="border px-4 py-2">65</td>
							<td className="border px-4 py-2">70</td>
							<td className="border px-4 py-2">75</td>
							<td className="border px-4 py-2">80</td>
						</tr>
						<tr>
							<td className="border px-4 py-2" colspan="16">
								Example: 36°C and humidity 35% results in an output of 26°C
							</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" />
							<td className="border px-4 py-2">20</td>
							<td className="border px-4 py-2" />
							<td className="border px-4 py-2">9</td>
							<td className="border px-4 py-2">9</td>
							<td className="border px-4 py-2">11</td>
							<td className="border px-4 py-2">11</td>
							<td className="border px-4 py-2">12</td>
							<td className="border px-4 py-2">13</td>
							<td className="border px-4 py-2">13</td>
							<td className="border px-4 py-2">14</td>
							<td className="border px-4 py-2">15</td>
							<td className="border px-4 py-2">16</td>
							<td className="border px-4 py-2">17</td>
							<td className="border px-4 py-2">17</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">19</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" />
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2" />
							<td className="border px-4 py-2">9</td>
							<td className="border px-4 py-2">10</td>
							<td className="border px-4 py-2">11</td>
							<td className="border px-4 py-2">12</td>
							<td className="border px-4 py-2">13</td>
							<td className="border px-4 py-2">13</td>
							<td className="border px-4 py-2">14</td>
							<td className="border px-4 py-2">15</td>
							<td className="border px-4 py-2">16</td>
							<td className="border px-4 py-2">16</td>
							<td className="border px-4 py-2">17</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">20</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" />
							<td className="border px-4 py-2">22</td>
							<td className="border px-4 py-2" />
							<td className="border px-4 py-2">10</td>
							<td className="border px-4 py-2">11</td>
							<td className="border px-4 py-2">12</td>
							<td className="border px-4 py-2">12</td>
							<td className="border px-4 py-2">13</td>
							<td className="border px-4 py-2">14</td>
							<td className="border px-4 py-2">14</td>
							<td className="border px-4 py-2">16</td>
							<td className="border px-4 py-2">16</td>
							<td className="border px-4 py-2">17</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">20</td>
							<td className="border px-4 py-2">21</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19" />
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">11</td>
							<td className="border px-4 py-2">11</td>
							<td className="border px-4 py-2">12</td>
							<td className="border px-4 py-2">13</td>
							<td className="border px-4 py-2">14</td>
							<td className="border px-4 py-2">14</td>
							<td className="border px-4 py-2">15</td>
							<td className="border px-4 py-2">16</td>
							<td className="border px-4 py-2">17</td>
							<td className="border px-4 py-2">17</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">20</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">21</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19">
								A
							</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">11</td>
							<td className="border px-4 py-2">12</td>
							<td className="border px-4 py-2">13</td>
							<td className="border px-4 py-2">13</td>
							<td className="border px-4 py-2">14</td>
							<td className="border px-4 py-2">15</td>
							<td className="border px-4 py-2">16</td>
							<td className="border px-4 py-2">17</td>
							<td className="border px-4 py-2">17</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">20</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">22</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19">
								I
							</td>
							<td className="border px-4 py-2">25</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">12</td>
							<td className="border px-4 py-2">13</td>
							<td className="border px-4 py-2">14</td>
							<td className="border px-4 py-2">14</td>
							<td className="border px-4 py-2">16</td>
							<td className="border px-4 py-2">16</td>
							<td className="border px-4 py-2">17</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">20</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">22</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">23</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19">
								R
							</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">12</td>
							<td className="border px-4 py-2">13</td>
							<td className="border px-4 py-2">14</td>
							<td className="border px-4 py-2">15</td>
							<td className="border px-4 py-2">16</td>
							<td className="border px-4 py-2">17</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">20</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">22</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">24</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19" />
							<td className="border px-4 py-2">27</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">13</td>
							<td className="border px-4 py-2">14</td>
							<td className="border px-4 py-2">15</td>
							<td className="border px-4 py-2">16</td>
							<td className="border px-4 py-2">17</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">20</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">22</td>
							<td className="border px-4 py-2">22</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">25</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19" />
							<td className="border px-4 py-2">28</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">14</td>
							<td className="border px-4 py-2">15</td>
							<td className="border px-4 py-2">16</td>
							<td className="border px-4 py-2">17</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">22</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">25</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">27</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19" />
							<td className="border px-4 py-2">29</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">14</td>
							<td className="border px-4 py-2">16</td>
							<td className="border px-4 py-2">17</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">20</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">22</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">25</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">27</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19">
								T
							</td>
							<td className="border px-4 py-2">30</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">15</td>
							<td className="border px-4 py-2">16</td>
							<td className="border px-4 py-2">17</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">20</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">22</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">25</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">27</td>
							<td className="border px-4 py-2">27</td>
							<td className="border px-4 py-2">28</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19">
								E
							</td>
							<td className="border px-4 py-2">32</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">16</td>
							<td className="border px-4 py-2">17</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">22</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">25</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">27</td>
							<td className="border px-4 py-2">27</td>
							<td className="border px-4 py-2">28</td>
							<td className="border px-4 py-2">29</td>
							<td className="border px-4 py-2">29</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19">
								M
							</td>
							<td className="border px-4 py-2">33</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">17</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">22</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">27</td>
							<td className="border px-4 py-2">27</td>
							<td className="border px-4 py-2">28</td>
							<td className="border px-4 py-2">29</td>
							<td className="border px-4 py-2">29</td>
							<td className="border px-4 py-2">31</td>
							<td className="border px-4 py-2">31</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19">
								P
							</td>
							<td className="border px-4 py-2">34</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">17</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">20</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">22</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">25</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">27</td>
							<td className="border px-4 py-2">28</td>
							<td className="border px-4 py-2">29</td>
							<td className="border px-4 py-2">29</td>
							<td className="border px-4 py-2">30</td>
							<td className="border px-4 py-2">31</td>
							<td className="border px-4 py-2">32</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19">
								E
							</td>
							<td className="border px-4 py-2">35</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">22</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">27</td>
							<td className="border px-4 py-2">28</td>
							<td className="border px-4 py-2">29</td>
							<td className="border px-4 py-2">30</td>
							<td className="border px-4 py-2">31</td>
							<td className="border px-4 py-2">32</td>
							<td className="border px-4 py-2">32</td>
							<td className="border px-4 py-2">33</td>
							<td className="border px-4 py-2">34</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19">
								R
							</td>
							<td className="border px-4 py-2">36</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">18</td>
							<td className="border px-4 py-2">20</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">25</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">27</td>
							<td className="border px-4 py-2">28</td>
							<td className="border px-4 py-2">29</td>
							<td className="border px-4 py-2">30</td>
							<td className="border px-4 py-2">31</td>
							<td className="border px-4 py-2">32</td>
							<td className="border px-4 py-2">33</td>
							<td className="border px-4 py-2">33</td>
							<td className="border px-4 py-2">34</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19">
								A
							</td>
							<td className="border px-4 py-2">37</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">22</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">27</td>
							<td className="border px-4 py-2">28</td>
							<td className="border px-4 py-2">29</td>
							<td className="border px-4 py-2">30</td>
							<td className="border px-4 py-2">31</td>
							<td className="border px-4 py-2">32</td>
							<td className="border px-4 py-2">32</td>
							<td className="border px-4 py-2">33</td>
							<td className="border px-4 py-2">34</td>
							<td className="border px-4 py-2">35</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19">
								T
							</td>
							<td className="border px-4 py-2">38</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">19</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">22</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">25</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">27</td>
							<td className="border px-4 py-2">28</td>
							<td className="border px-4 py-2">29</td>
							<td className="border px-4 py-2">31</td>
							<td className="border px-4 py-2">32</td>
							<td className="border px-4 py-2">33</td>
							<td className="border px-4 py-2">33</td>
							<td className="border px-4 py-2">34</td>
							<td className="border px-4 py-2">35</td>
							<td className="border px-4 py-2">36</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19">
								U
							</td>
							<td className="border px-4 py-2">40</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">20</td>
							<td className="border px-4 py-2">22</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">25</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">28</td>
							<td className="border px-4 py-2">29</td>
							<td className="border px-4 py-2">30</td>
							<td className="border px-4 py-2">31</td>
							<td className="border px-4 py-2">32</td>
							<td className="border px-4 py-2">33</td>
							<td className="border px-4 py-2">34</td>
							<td className="border px-4 py-2">35</td>
							<td className="border px-4 py-2">36</td>
							<td className="border px-4 py-2">37</td>
							<td className="border px-4 py-2">38</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19">
								R
							</td>
							<td className="border px-4 py-2">41</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">22</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">27</td>
							<td className="border px-4 py-2">28</td>
							<td className="border px-4 py-2">29</td>
							<td className="border px-4 py-2">31</td>
							<td className="border px-4 py-2">32</td>
							<td className="border px-4 py-2">33</td>
							<td className="border px-4 py-2">34</td>
							<td className="border px-4 py-2">34</td>
							<td className="border px-4 py-2">36</td>
							<td className="border px-4 py-2">37</td>
							<td className="border px-4 py-2">37</td>
							<td className="border px-4 py-2">38</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19">
								E
							</td>
							<td className="border px-4 py-2">42</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">21</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">27</td>
							<td className="border px-4 py-2">29</td>
							<td className="border px-4 py-2">30</td>
							<td className="border px-4 py-2">31</td>
							<td className="border px-4 py-2">32</td>
							<td className="border px-4 py-2">33</td>
							<td className="border px-4 py-2">34</td>
							<td className="border px-4 py-2">36</td>
							<td className="border px-4 py-2">37</td>
							<td className="border px-4 py-2">38</td>
							<td className="border px-4 py-2">38</td>
							<td className="border px-4 py-2">39</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19" />
							<td className="border px-4 py-2">43</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">22</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">27</td>
							<td className="border px-4 py-2">29</td>
							<td className="border px-4 py-2">30</td>
							<td className="border px-4 py-2">32</td>
							<td className="border px-4 py-2">33</td>
							<td className="border px-4 py-2">34</td>
							<td className="border px-4 py-2">35</td>
							<td className="border px-4 py-2">36</td>
							<td className="border px-4 py-2">37</td>
							<td className="border px-4 py-2">38</td>
							<td className="border px-4 py-2">39</td>
							<td className="border px-4 py-2">39</td>
							<td className="border px-4 py-2">41</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19" />
							<td className="border px-4 py-2">44</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">28</td>
							<td className="border px-4 py-2">29</td>
							<td className="border px-4 py-2">31</td>
							<td className="border px-4 py-2">32</td>
							<td className="border px-4 py-2">33</td>
							<td className="border px-4 py-2">34</td>
							<td className="border px-4 py-2">36</td>
							<td className="border px-4 py-2">37</td>
							<td className="border px-4 py-2">38</td>
							<td className="border px-4 py-2">38</td>
							<td className="border px-4 py-2">39</td>
							<td className="border px-4 py-2">40</td>
							<td className="border px-4 py-2">41</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19" />
							<td className="border px-4 py-2">45</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">25</td>
							<td className="border px-4 py-2">27</td>
							<td className="border px-4 py-2">28</td>
							<td className="border px-4 py-2">30</td>
							<td className="border px-4 py-2">31</td>
							<td className="border px-4 py-2">33</td>
							<td className="border px-4 py-2">34</td>
							<td className="border px-4 py-2">35</td>
							<td className="border px-4 py-2">37</td>
							<td className="border px-4 py-2">38</td>
							<td className="border px-4 py-2">38</td>
							<td className="border px-4 py-2">39</td>
							<td className="border px-4 py-2">40</td>
							<td className="border px-4 py-2">41</td>
							<td className="border px-4 py-2">42</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19" />
							<td className="border px-4 py-2">46</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">23</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">27</td>
							<td className="border px-4 py-2">29</td>
							<td className="border px-4 py-2">31</td>
							<td className="border px-4 py-2">32</td>
							<td className="border px-4 py-2">33</td>
							<td className="border px-4 py-2">34</td>
							<td className="border px-4 py-2">36</td>
							<td className="border px-4 py-2">37</td>
							<td className="border px-4 py-2">38</td>
							<td className="border px-4 py-2">39</td>
							<td className="border px-4 py-2">40</td>
							<td className="border px-4 py-2">41</td>
							<td className="border px-4 py-2">42</td>
							<td className="border px-4 py-2">43</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19" />
							<td className="border px-4 py-2">47</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">28</td>
							<td className="border px-4 py-2">29</td>
							<td className="border px-4 py-2">31</td>
							<td className="border px-4 py-2">33</td>
							<td className="border px-4 py-2">34</td>
							<td className="border px-4 py-2">36</td>
							<td className="border px-4 py-2">37</td>
							<td className="border px-4 py-2">38</td>
							<td className="border px-4 py-2">39</td>
							<td className="border px-4 py-2">40</td>
							<td className="border px-4 py-2">41</td>
							<td className="border px-4 py-2">42</td>
							<td className="border px-4 py-2">43</td>
							<td className="border px-4 py-2">43</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19" />
							<td className="border px-4 py-2">48</td>
							<td className="border px-4 py-2" />
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">26</td>
							<td className="border px-4 py-2">28</td>
							<td className="border px-4 py-2">30</td>
							<td className="border px-4 py-2">32</td>
							<td className="border px-4 py-2">33</td>
							<td className="border px-4 py-2">34</td>
							<td className="border px-4 py-2">36</td>
							<td className="border px-4 py-2">37</td>
							<td className="border px-4 py-2">38</td>
							<td className="border px-4 py-2">39</td>
							<td className="border px-4 py-2">41</td>
							<td className="border px-4 py-2">41</td>
							<td className="border px-4 py-2">42</td>
							<td className="border px-4 py-2">43</td>
							<td className="border px-4 py-2">44</td>
						</tr>
						<tr className="air-temp">
							<td className="border px-4 py-2" height="19">
								<br />
							</td>
							<td className="border px-4 py-2">49</td>
							<td className="border px-4 py-2">
								<br />
							</td>
							<td className="border px-4 py-2">24</td>
							<td className="border px-4 py-2">27</td>
							<td className="border px-4 py-2">29</td>
							<td className="border px-4 py-2">31</td>
							<td className="border px-4 py-2">32</td>
							<td className="border px-4 py-2">34</td>
							<td className="border px-4 py-2">36</td>
							<td className="border px-4 py-2">37</td>
							<td className="border px-4 py-2">38</td>
							<td className="border px-4 py-2">39</td>
							<td className="border px-4 py-2">40</td>
							<td className="border px-4 py-2">43</td>
							<td className="border px-4 py-2">42</td>
							<td className="border px-4 py-2">43</td>
							<td className="border px-4 py-2">44</td>
							<td className="border px-4 py-2">45</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
