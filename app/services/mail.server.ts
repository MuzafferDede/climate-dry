import { z } from "zod";
import { validator } from "~/utils";
import { fetcher } from "./api.server";

// Schema for validating the email input
const subscribeSchema = z.object({
	email: z.string().email("Please enter a valid email"),
});

export const subsucribe = async (request: Request) => {
	try {
		// Get form data from the request
		const formData = await request.formData();
		const formValues = Object.fromEntries(formData);

		// Validate form data against the schema
		const validated = validator(formValues, subscribeSchema);

		// If validation fails, return an error response
		if (validated.errors) {
			throw { error: validated.errors.email };
		}
		const api = await fetcher(request);

		const response = await api.post<z.infer<typeof subscribeSchema>>(
			"https://jsonplaceholder.typicode.com/posts",
			validated.data,
		);

		console.log(response);

		return {
			message: "You have successfully subscribed to our newsletter.",
			email: response.email,
		};
	} catch (error) {
		const message =
			error instanceof Error
				? error.message
				: "Something went wrong. Please try again.";

		return { error: message };
	}
};
