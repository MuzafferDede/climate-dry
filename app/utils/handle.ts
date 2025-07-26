export interface BreadcrumbItem {
	label: string;
	path: string;
}

export const generateBreadcrumb = (
	items: Array<{ name: string; slug: string }>,
	basePath = "",
): BreadcrumbItem[] => {
	return items.map((item) => ({
		label: item.name,
		path: `${basePath}/${item.slug}`,
	}));
};
