export const currency = (value: number) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "GBP",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return formatter.format(value);
};

export const calculateSave = (price: number, retail: number) => {
	if (retail <= 0 || price >= retail) return 0;
	return Number.parseFloat((((retail - price) / retail) * 100).toFixed(0));
};
