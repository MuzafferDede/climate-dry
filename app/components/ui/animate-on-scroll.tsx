import { useInViewport } from "~/hooks";
import { cn } from "~/utils";

// Animation presets
const animationPresets = {
	fadeInDown: "slide-in-from-top-10 slide-out-to-top-10",
	fadeInUp: "slide-in-from-bottom-10 slide-out-to-bottom-10",
	fadeInLeft: "slide-in-from-left-10 slide-out-to-left-10",
	fadeInRight: "slide-in-from-right-10 slide-out-to-right-10",
	zoomIn: "zoom-in zoom-out",
} as const;

// Hoo

// Types
interface AnimateProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	type?: keyof typeof animationPresets;
	threshold?: number;
	rootMargin?: string;
	delayMs?: number;
}

export const AnimateOnScroll = ({
	children,
	type = "fadeInUp",
	threshold = 0.5,
	rootMargin = "0px",
	delayMs = 100,
	className,
	...props
}: AnimateProps) => {
	const { ref, inView } = useInViewport({ threshold, rootMargin, delayMs });

	return (
		<div
			ref={ref}
			data-state={inView ? "show" : "hide"}
			className={cn(
				"!fill-mode-forwards fade-in fade-out duration-500 data-[state=hide]:animate-out data-[state=show]:animate-in",
				animationPresets[type],
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};
