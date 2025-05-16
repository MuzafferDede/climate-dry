import { getSession } from "./session.server";
/**
 * Simple function to check if a user is authenticated and get their data
 */
export async function getCustomer(request: Request) {
	// Get session token
	const session = await getSession(request.headers.get("Cookie"));
	const user = session.get("customer");

	// No user means not authenticated
	if (!user) {
		return null;
	}

	return user;
}
