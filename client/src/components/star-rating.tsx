import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  showCount?: boolean;
  count?: number;
}

export function StarRating({ rating, size = "md", className, showCount, count }: StarRatingProps) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-5 w-5",
    lg: "h-8 w-8",
  };
  
  // Trustpilot usually has a green box with a star, but for the rating display 
  // they often use 5 green squares with stars inside. 
  // Let's stick to simple colored stars for MVP simplicity but make them brand green.

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <div key={i} className="bg-primary text-white p-[2px] mr-[2px]">
            <Star className={cn("fill-white stroke-none", sizeClasses[size])} />
        </div>
      );
    } else if (i === fullStars && hasHalfStar) {
        // Simple half star logic: just show a filled star for now or empty? 
        // Actually Trustpilot fills the box based on percentage.
        // Let's keep it simple: Filled stars vs Empty stars (gray).
       stars.push(
        <div key={i} className="bg-muted text-muted-foreground p-[2px] mr-[2px]">
            <Star className={cn("fill-muted-foreground/20 stroke-none", sizeClasses[size])} />
        </div>
      );
    } else {
      stars.push(
        <div key={i} className="bg-muted text-muted-foreground/30 p-[2px] mr-[2px]">
            <Star className={cn("fill-white/40 stroke-none", sizeClasses[size])} />
        </div>
      );
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex">
        {stars}
      </div>
      {showCount && count !== undefined && (
        <span className="text-sm text-muted-foreground font-medium">
            {count} reviews
        </span>
      )}
    </div>
  );
}
