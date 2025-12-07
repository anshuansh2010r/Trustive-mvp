import { Layout } from "@/components/layout";
import { MOCK_COACHES } from "@/lib/mockData";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/star-rating";

export default function ForCoaches() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">For Coaches</h1>
        <p className="text-muted-foreground mb-8">
          Browse our directory of verified coaches.
        </p>

        <div className="grid gap-4">
          {MOCK_COACHES.map((coach) => (
            <Link key={coach.id} href={`/coach/${coach.id}`}>
              <a className="block group">
                <Card className="hover:shadow-md transition-all">
                  <CardContent className="p-6 flex items-center gap-6">
                    <Avatar className="h-16 w-16 border">
                      <AvatarFallback className="bg-secondary text-lg font-bold">
                        {coach.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                          {coach.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {coach.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {coach.handle}
                      </p>
                      <div className="flex items-center gap-4">
                        <StarRating rating={coach.rating} size="sm" />
                        <span className="text-sm text-muted-foreground">
                          {coach.reviewCount} reviews
                        </span>
                      </div>
                    </div>

                    <div className="hidden md:block text-sm text-muted-foreground">
                      {coach.location}
                    </div>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
