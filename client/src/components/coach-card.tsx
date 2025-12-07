import { Link } from "wouter";
import { Coach } from "@/lib/mockData";
import { StarRating } from "./star-rating";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function CoachCard({ coach }: { coach: Coach }) {
  return (
    <Link href={`/coach/${coach.id}`}>
      <a className="block h-full group">
        <Card className="h-full border-transparent shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
          <CardContent className="p-6 flex flex-col items-center text-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-white shadow-sm">
              <AvatarFallback className="bg-secondary text-secondary-foreground font-heading text-xl font-bold">
                {coach.avatar}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-lg group-hover:underline decoration-2 underline-offset-4 decoration-primary/50">
                {coach.name}
              </h3>
              <p className="text-sm text-muted-foreground">{coach.handle}</p>
            </div>

            <StarRating rating={coach.rating} count={coach.reviewCount} showCount />

            <div className="mt-2">
                <Badge variant="secondary" className="font-normal text-muted-foreground bg-secondary/50">
                    {coach.category}
                </Badge>
            </div>
            
            <div className="mt-auto w-full pt-4 border-t border-border/50 text-xs text-muted-foreground flex justify-between items-center">
                <span>{coach.location}</span>
                <span className="text-primary font-medium">Latest review 2d ago</span>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
