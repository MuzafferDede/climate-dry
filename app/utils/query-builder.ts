export function queryBuilder(
	params: Record<string, string | number | undefined | null>,
) {
	const searchParams = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== null && value !== "") {
			searchParams.append(key, String(value));
		}
	}

	return searchParams.toString();
}
