import { useEffect, useRef, useState } from "react";
import { cn } from "~/utils";
import { Loading } from "./loading";

export const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
	const { className, src = "", alt = "", ...rest } = props;
	const imgRef = useRef<HTMLImageElement>(null);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (imgRef.current?.complete && src) {
			setLoaded(true);
		} else {
			setLoaded(false);
		}
	}, [src]);

	return (
		<div className={cn("relative overflow-hidden", className)}>
			{!loaded && (
				<div className="absolute inset-0 z-10 flex items-center justify-center">
					<Loading />
				</div>
			)}
			<img
				{...rest}
				ref={imgRef}
				src={src}
				alt={alt || "image"}
				loading="lazy" // Native lazy loading here
				onLoad={() => setLoaded(true)}
				className={cn(
					"fade-in h-full w-full animate-in object-cover duration-500",
					{ "opacity-0": !loaded },
				)}
			/>
		</div>
	);
};
