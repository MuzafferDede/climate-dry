import { type TSession, commitSession } from "./session";

export const buildHeaders = async (
	session: TSession,
	extra: Record<string, string> = {},
	cacheControl = "max-age=300, stale-while-revalidate=60",
): Promise<Headers> => {
	const setCookie = await commitSession(session);

	const headers = new Headers({
		"Set-Cookie": setCookie,
		"Cache-Control": cacheControl,
	});

	for (const [key, value] of Object.entries(extra)) {
		headers.set(key, value);
	}

	return headers;
};
