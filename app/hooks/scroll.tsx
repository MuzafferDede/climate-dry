import { useEffect, useRef, useState } from "react";

export const useInViewport = ({
	threshold = 0.1,
	rootMargin = "0px",
	delayMs = 200,
}: {
	threshold?: number;
	rootMargin?: string;
	delayMs?: number;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [inView, setInView] = useState(false);
	const timeoutRef = useRef<number>(0);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = window.setTimeout(() => {
					setInView(entry.isIntersecting);
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
