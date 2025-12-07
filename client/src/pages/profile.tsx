import { Link, useRoute } from "wouter";
import { Layout } from "@/components/layout";
import { MOCK_COACHES } from "@/lib/mockData";
import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, MapPin, Instagram, ExternalLink } from "lucide-react";

export default function Profile() {
  const [match, params] = useRoute("/coach/:id");
  const coachId = params?.id;
  const coach = MOCK_COACHES.find((c) => c.id === coachId);

  if (!coach) {
    return <Layout><div className="container py-20 text-center">Coach not found</div></Layout>;
  }

  return (
    <Layout>
      {/* Header Info */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg rounded-xl">
              <AvatarFallback className="bg-secondary text-secondary-foreground text-4xl font-bold rounded-xl">
                {coach.avatar}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight mb-2">{coach.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {coach.location}</span>
                    <span className="flex items-center gap-1"><Instagram className="h-4 w-4" /> {coach.handle}</span>
                    <Badge variant="outline" className="text-xs bg-muted/50">{coach.category}</Badge>
                </div>
              </div>

              <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                      <span className="text-3xl font-bold">{coach.rating}</span>
                      <StarRating rating={coach.rating} size="md" />
                  </div>
                  <Separator orientation="vertical" className="h-12" />
                  <div className="flex flex-col justify-center">
                      <span className="font-bold">{coach.reviewCount}</span>
                      <span className="text-sm text-muted-foreground">total reviews</span>
                  </div>
              </div>

              <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
                  {coach.bio}
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
                <Link href={`/review/${coach.id}`}>
                    <Button size="lg" className="w-full md:w-auto font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/20 transition-all hover:-translate-y-0.5">
                        Write a Review
                    </Button>
                </Link>
                <Button variant="outline" className="w-full md:w-auto">
                    Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
                <div className="text-xs text-center text-muted-foreground mt-2">
                    Are you {coach.name}? <a href="#" className="underline">Claim this profile</a>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Left Column: Filters (Visual only for MVP) */}
              <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg border shadow-sm">
                      <h3 className="font-bold mb-4">Filter Reviews</h3>
                      <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((star) => (
                              <div key={star} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 p-1 rounded">
                                  <input type="checkbox" className="rounded border-gray-300" />
                                  <span className="flex-1">{star} stars</span>
                                  <div className="h-2 flex-1 bg-secondary rounded-full overflow-hidden">
                                      <div className="h-full bg-primary" style={{ width: star === 5 ? '70%' : '10%' }}></div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Right Column: Reviews List */}
              <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Reviews</h2>
                      <select className="bg-transparent text-sm font-medium border-none outline-none cursor-pointer">
                          <option>Most Recent</option>
                          <option>Highest Rated</option>
                          <option>Lowest Rated</option>
                      </select>
                  </div>

                  {coach.reviews.map((review) => (
                      <div key={review.id} className="bg-white p-6 md:p-8 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10">
                                      <AvatarFallback>{review.author[0]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                      <div className="font-bold text-sm">{review.author}</div>
                                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                          <span>{review.location}</span>
                                          <span>•</span>
                                          <span>{review.date}</span>
                                      </div>
                                  </div>
                              </div>
                              {review.verified ? (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
                                      <CheckCircle className="h-3 w-3" /> Verified Client
                                  </Badge>
                              ) : (
                                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 gap-1">
                                      <AlertCircle className="h-3 w-3" /> Unverified
                                  </Badge>
                              )}
                          </div>

                          <div className="mb-4">
                              <StarRating rating={review.rating} size="sm" />
                          </div>

                          <h3 className="font-bold text-lg mb-2">{review.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">
                              {review.content}
                          </p>

                          <div className="mt-6 flex gap-4">
                              <Button variant="ghost" size="sm" className="text-muted-foreground h-auto p-0 hover:bg-transparent hover:text-foreground">
                                  Useful
                              </Button>
                              <Button variant="ghost" size="sm" className="text-muted-foreground h-auto p-0 hover:bg-transparent hover:text-foreground">
                                  Share
                              </Button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </Layout>
  );
}
