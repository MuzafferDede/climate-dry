import type { Session } from "react-router";
import { z } from "zod";
import { validator } from "~/utils";
import { fetcher } from "../libs";

// Schema for validating the email input
const subscribeSchema = z.object({
	email: z.string().email("Please enter a valid email"),
});

export const subsucribe = async (session: Session, formData: FormData) => {
	// Get form data from the request
	const formValues = Object.fromEntries(formData);

	// Validate form data against the schema
	const validated = validator(formValues, subscribeSchema);

	// If validation fails, return an error response
	if (validated.errors) {
		return { error: validated.errors.email };
	}
	const api = fetcher(session);

	const { response, error } = await api.post<z.infer<typeof subscribeSchema>>(
		"https://jsonplaceholder.typicode.com/posts",
		validated.data,
	);

	return { response, error };
};
