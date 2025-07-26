import type { TSession } from "./session";
/**
 * Simple function to check if a user is authenticated and get their data
 */
export function getCustomer(session: TSession) {
	// Get session token
	const user = session.get("customer");

	// No user means not authenticated
	if (!user) {
		return null;
	}

	return user;
}
