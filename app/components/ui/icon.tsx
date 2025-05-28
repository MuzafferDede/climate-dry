import type { SVGProps } from "react";
import spriteHref from "~/assets/icon.svg";
import type { IconName } from "~/types/icons";

export function Icon({
	name,
	...props
}: SVGProps<SVGSVGElement> & {
	name: IconName;
}) {
	return (
		<svg {...props}>
			<title>{name}</title>
			<use href={`${spriteHref}#${name}`} />
		</svg>
	);
}
