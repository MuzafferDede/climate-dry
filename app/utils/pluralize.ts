/**
 * Simple utility to pluralize words based on a count
 * @param count - The number to check
 * @param singular - The singular form of the word
 * @param plural - The plural form of the word (optional, defaults to singular + 's')
 * @returns The appropriate form of the word
 *
 * @example
 * pluralize(1, 'year') // 'year'
 * pluralize(2, 'year') // 'years'
 * pluralize(1, 'child', 'children') // 'child'
 * pluralize(2, 'child', 'children') // 'children'
 */
export function pluralize(
	count: number,
	singular: string,
	plural?: string,
): string {
	if (count === 1) {
		return singular;
	}
	return plural || `${singular}s`;
}
