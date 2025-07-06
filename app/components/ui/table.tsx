import { cn } from "~/utils";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
	children: React.ReactNode;
}

interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
	children: React.ReactNode;
}

interface TableHeaderProps
	extends React.ThHTMLAttributes<HTMLTableCellElement> {
	children: React.ReactNode;
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
	children: React.ReactNode;
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
	children: React.ReactNode;
}

export const Table = ({ className, children, ...props }: TableProps) => {
	return (
		<div className="overflow-hidden rounded-xl border border-gray-lighter bg-white shadow-md">
			<div className="overflow-x-auto">
				<table className={cn("min-w-full", className)} {...props}>
					{children}
				</table>
			</div>
		</div>
	);
};

export const TableHead = ({
	className,
	children,
	...props
}: TableHeadProps) => {
	return (
		<thead
			className={cn("border-gray-lighter border-b bg-gray-lightest", className)}
			{...props}
		>
			{children}
		</thead>
	);
};

export const TableHeader = ({
	className,
	children,
	...props
}: TableHeaderProps) => {
	return (
		<th
			className={cn(
				"px-4 py-3 text-left font-bold text-sm text-teal uppercase tracking-wide",
				className,
			)}
			{...props}
		>
			{children}
		</th>
	);
};

export const TableBody = ({
	children,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => {
	return (
		<tbody className="bg-white" {...props}>
			{children}
		</tbody>
	);
};

export const TableRow = ({ className, children, ...props }: TableRowProps) => {
	return (
		<tr
			className={cn(
				"border-gray-lighter border-b transition-all duration-200 last:border-b-0 odd:bg-white even:bg-gray-lightest hover:bg-teal/20 hover:shadow-sm has-[th]:hover:bg-white",
				className,
			)}
			{...props}
		>
			{children}
		</tr>
	);
};

export const TableCell = ({
	className,
	children,
	...props
}: TableCellProps) => {
	return (
		<td
			className={cn("px-4 py-3 text-navy-darkest text-sm", className)}
			{...props}
		>
			{children}
		</td>
	);
};

export const TableCellSecondary = ({
	className,
	children,
	...props
}: TableCellProps) => {
	return (
		<td
			className={cn(
				"px-4 py-3 font-semibold text-navy-darkest capitalize",
				className,
			)}
			{...props}
		>
			{children}
		</td>
	);
};
