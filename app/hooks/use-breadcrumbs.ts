import { useMatches } from "react-router";

export type Breadcrumb = {
	label: string;
	path: string;
};

type Handle = {
	breadcrumb?: (data: unknown) => { label: string };
};

export const useBreadcrumbs = (): Breadcrumb[] => {
	const matches = useMatches() as {
		handle?: Handle;
		data: unknown;
		pathname: string;
	}[];

	const crumbs = matches
		.filter((match): match is { handle: Required<Handle> } & typeof match =>
			Boolean(match.handle?.breadcrumb),
		)
		.flatMap((match) => {
			const breadcrumb = match.handle.breadcrumb(match.data);
			// If the handle returns an array, use it; otherwise, wrap in array
			return Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb];
		});

	return crumbs;
};
