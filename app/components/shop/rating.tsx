import type React from "react";
import { pluralize } from "~/utils";

type StarProps = {
	filled: boolean;
};

const Star: React.FC<StarProps> = ({ filled }) => (
	<span
		className="text-gray-light text-md data-[filled=true]:text-yellow-400"
		data-filled={filled}
	>
		★
	</span>
);

type StarRatingDisplayProps = {
	rating: number;
	reviewCount?: number;
};

export const Rating: React.FC<StarRatingDisplayProps> = ({
	rating,
	reviewCount,
}) => {
	const fullStars = Math.round(rating);

	return (
		<div className="flex items-center gap-2">
			<div className="flex gap-1">
				{[1, 2, 3, 4, 5].map((star) => (
					<Star key={star} filled={star <= fullStars} />
				))}
			</div>
			{reviewCount && (
				<span className="text-xs">
					({reviewCount} {pluralize(reviewCount, "review")})
				</span>
			)}
		</div>
	);
};
