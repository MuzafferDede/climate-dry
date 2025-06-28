import { useEffect, useRef, useState } from "react";

export const useInViewport = ({
	threshold = 0.1,
	rootMargin = "0px",
	delayMs = 10,
}: {
	threshold?: number;
	rootMargin?: string;
	delayMs?: number;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [inView, setInView] = useState(false);
	const timeoutRef = useRef<number>(0);
	const lastValueRef = useRef<boolean>(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				clearTimeout(timeoutRef.current);

				// Delay to debounce rapid in/out events near viewport edge
				timeoutRef.current = window.setTimeout(() => {
					const isVisible = entry.isIntersecting;

					// Only update state if value changed
					if (lastValueRef.current !== isVisible) {
						lastValueRef.current = isVisible;
						setInView(isVisible);
					}
				}, delayMs);
			},
			{ threshold, rootMargin },
		);

		observer.observe(element);

		return () => {
			observer.disconnect();
			clearTimeout(timeoutRef.current);
		};
	}, [threshold, rootMargin, delayMs]);

	return { ref, inView };
};
