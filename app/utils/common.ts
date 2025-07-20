export const currency = (value: number, faction = 2) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "GBP",
		minimumFractionDigits: faction,
		maximumFractionDigits: faction,
	});

	return formatter.format(value);
};

export const calculateSave = (price: number, retail: number) => {
	if (retail <= 0 || price >= retail) return 0;
	return Number.parseFloat((((retail - price) / retail) * 100).toFixed(0));
};
