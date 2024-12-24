import { Star, StarHalf } from "lucide-react";

export const getStarRepresentation = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={`full-${i}`} className="text-amber-400 fill-amber-400" />
    ); // Full star
  }

  // Add half star if applicable
  if (hasHalfStar) {
    stars.push(
      <StarHalf key="half" className="text-amber-400 fill-amber-400" />
    ); // Half star
  }

  // Add empty stars to make it 5 stars total
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star key={`empty-${i}`} className="text-amber-400 fill-none" />
    ); // Empty star
  }

  return stars; // Return an array of star JSX elements
};
