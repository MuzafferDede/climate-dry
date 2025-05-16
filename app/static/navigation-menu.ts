type NavigationItem = {
	path: string;
	label: string;
	banner?: string;
	children?: NavigationItem[];
};

export const navigation: NavigationItem[] = [
	{
		path: "/dehumidifiers",
		label: "Dehumidifiers",
		banner: "https://placehold.co/400x200/teal/white?text=Dehumidifiers",
		children: [
			{
				path: "/dehumidifiers/categories",
				label: "Categories",
				children: [
					{
						path: "/dehumidifiers/categories/domestic",
						label: "Domestic",
					},
					{
						path: "/dehumidifiers/categories/commercial",
						label: "Commercial",
					},
					{
						path: "/dehumidifiers/categories/industrial",
						label: "Industrial",
					},
					{
						path: "/dehumidifiers/categories/wall-mounted",
						label: "Wall-Mounted",
					},
					{
						path: "/dehumidifiers/categories/portable",
						label: "Portable",
					},
					{
						path: "/dehumidifiers/categories/desiccant",
						label: "Desiccant",
					},
					{
						path: "/dehumidifiers/categories/refrigerant",
						label: "Refrigerant",
					},
				],
			},
			{
				path: "/dehumidifiers/solutions",
				label: "Find your solution",
				children: [
					{
						path: "/dehumidifiers/solutions/basement",
						label: "Basement",
					},
					{
						path: "/dehumidifiers/solutions/boat",
						label: "Boat",
					},
					{
						path: "/dehumidifiers/solutions/cellar",
						label: "Cellar",
					},
					{
						path: "/dehumidifiers/solutions/classic-car",
						label: "Classic Car",
					},
					{
						path: "/dehumidifiers/solutions/construction",
						label: "Construction",
					},
					{
						path: "/dehumidifiers/solutions/drying-room",
						label: "Drying Room",
					},
					{
						path: "/dehumidifiers/solutions/factory",
						label: "Factory",
					},
					{
						path: "/dehumidifiers/solutions/small-spaces",
						label: "Small Spaces",
					},
					{
						path: "/dehumidifiers/solutions/garage",
						label: "Garage",
					},
					{
						path: "/dehumidifiers/solutions/laundry",
						label: "Laundry",
					},
					{
						path: "/dehumidifiers/solutions/loft",
						label: "Loft",
					},
					{
						path: "/dehumidifiers/solutions/storage",
						label: "Storage",
					},
					{
						path: "/dehumidifiers/solutions/warehouse",
						label: "Warehouse",
					},
					{
						path: "/dehumidifiers/solutions/water-damage",
						label: "Water Damage",
					},
					{
						path: "/dehumidifiers/solutions/workshop",
						label: "Workshop",
					},
				],
			},
		],
	},
	{
		path: "/ventilation",
		label: "Ventilation",
		banner: "https://placehold.co/400x200/teal/white?text=Ventilation",
		children: [
			{
				path: "/ventilation/industrial-fans",
				label: "Industrial Fans",
			},
			{
				path: "/ventilation/floor-dryers",
				label: "Floor Dryers",
			},
			{
				path: "/ventilation/air-scrubbers",
				label: "Air Scrubbers",
			},
			{
				path: "/ventilation/ducting",
				label: "Ducting",
			},
			{
				path: "/ventilation/water-damage-restoration",
				label: "Water Damage Restoration",
			},
		],
	},
	{
		path: "/heaters",
		label: "Heaters",
		banner: "https://placehold.co/400x200/teal/white?text=Heaters",
		children: [
			{
				path: "/heaters/electric-fan-heaters",
				label: "Electric Fan Heaters",
			},
			{
				path: "/heaters/infrared-heaters",
				label: "Infrared Heaters",
			},
			{
				path: "/heaters/indirect-diesel-heaters",
				label: "Indirect Diesel Heaters",
			},
			{
				path: "/heaters/drying-bundle-deals",
				label: "Drying Bundle Deals",
			},
		],
	},
	{
		path: "/cooling",
		label: "Cooling",
		banner: "https://placehold.co/400x200/teal/white?text=Cooling",
	},
	{
		path: "/bundles",
		label: "Bundles",
		banner: "https://placehold.co/400x200/teal/white?text=Bundles",
		children: [
			{
				path: "/bundles/drying-packages",
				label: "Drying Packages",
			},
			{
				path: "/bundles/heater-bundles-deals",
				label: "Heater Bundles Deals",
			},
			{
				path: "/bundles/drying-calculator",
				label: "Drying Calculator",
			},
		],
	},
	{
		path: "/water-pumps",
		label: "Water Pumps",
		banner: "https://placehold.co/400x200/teal/white?text=Water+Pumps",
	},
	{
		path: "/new-arrivals",
		label: "New Arrivals",
		banner: "https://placehold.co/400x200/teal/white?text=New+Arrivals",
	},
	{
		path: "/advice-hub",
		label: "Advice Hub",
		banner: "https://placehold.co/400x200/teal/white?text=Advice+Hub",
	},
	{
		path: "/sale",
		label: "Sale",
		banner: "https://placehold.co/400x200/teal/white?text=Sale+Items",
	},
];
