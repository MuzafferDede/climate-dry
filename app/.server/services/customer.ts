import { z } from "zod";
import type { Customer } from "~/types";
import { validator } from "~/utils";
import { type TSession, fetcher } from "../libs";

// Schema for validating login form
const loginSchema = z.object({
	email: z.string().email("Please enter a valid email"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

// Zod schema for form validation
const registerSchema = z
	.object({
		first_name: z.string().min(1, "First name is required"),
		last_name: z.string().min(1, "Last name is required"),
		email: z.string().email("Please enter a valid email"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		password_confirmation: z.string(),
		phone: z
			.string()
			.min(1, "Phone number is required")
			.min(10, "Phone number must be at least 10 digits"),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: "Passwords do not match",
		path: ["password_confirmation"],
	});

interface RegisterResponse {
	id: number;
	email: string;
}

export const register = async (session: TSession, formData: FormData) => {
	const formValues = Object.fromEntries(formData);

	const validated = validator(formValues, registerSchema);

	if (validated.errors) {
		return {
			errors: validated.errors,
		};
	}

	const api = fetcher(session);

	const { response, error } = await api.post<RegisterResponse>(
		"/customers/register",
		validated.data,
	);

	return {
		response,
		error,
	};
};

export const login = async (session: TSession, formData: FormData) => {
	const formValues = Object.fromEntries(formData);

	const validated = validator(formValues, loginSchema);

	if (validated.errors) {
		return {
			errors: validated.errors,
		};
	}

	const api = fetcher(session);

	const { response, error } = await api.post<Customer>(
		"/customers/login",
		validated.data,
	);

	return {
		response,
		error,
	};
};

export const logout = async (session: TSession) => {
	const api = fetcher(session);

	return await api.post<{ message: string }>("/customers/logout", {});
};
