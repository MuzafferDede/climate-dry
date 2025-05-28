import { useEffect, useRef, useState } from "react";

interface UseCarouselOptions {
	length: number;
	interval?: number; // ms
}

export function useCarousel({ length, interval = 5000 }: UseCarouselOptions) {
	const [index, setIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// Auto-scroll
	useEffect(() => {
		if (length <= 1 || isPaused) return;

		const timer = setInterval(() => {
			setIndex((prev) => (prev + 1) % length);
		}, interval);

		return () => clearInterval(timer);
	}, [length, interval, isPaused]);

	// Scroll effect
	useEffect(() => {
		const container = containerRef.current;
		if (!container || container.children.length === 0) return;

		const firstChild = container.children[0] as HTMLElement;
		const itemWidth = firstChild.offsetWidth;

		container.scrollTo({
			left: itemWidth * index,
			behavior: "smooth",
		});
	}, [index]);

	// Hover listeners
	useEffect(() => {
		const node = containerRef.current;
		if (!node) return;

		const handleMouseEnter = () => setIsPaused(true);
		const handleMouseLeave = () => setIsPaused(false);

		node.addEventListener("mouseenter", handleMouseEnter);
		node.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			node.removeEventListener("mouseenter", handleMouseEnter);
			node.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, []);

	return {
		containerRef,
		index,
		setIndex,
		isPaused,
		setIsPaused,
	};
}
