import type { z } from "zod";

type ValidationResult<T> =
	| { data: T; errors: null }
	| { data: null; errors: Partial<Record<keyof T, string>> };

export function validator<T>(
	data: unknown,
	schema: z.ZodType<T>,
): ValidationResult<T> {
	const result = schema.safeParse(data);

	if (!result.success) {
		const errors: Partial<Record<keyof T, string>> = {};

		for (const issue of result.error.issues) {
			const field = issue.path[0] as keyof T;
			errors[field] = issue.message;
		}

		return {
			data: null,
			errors,
		};
	}

	return {
		data: result.data,
		errors: null,
	};
}
