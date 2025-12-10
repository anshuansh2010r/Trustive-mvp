import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { getCoach, addReview, Review } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function SubmitReview() {
  const [match, params] = useRoute("/review/:id");
  const [, setLocation] = useLocation();
  const coachId = params?.id;
  
  const coach = coachId ? getCoach(coachId) : undefined;
  const { toast } = useToast();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coachId) return;

    const formData = new FormData(e.target as HTMLFormElement);
    
    // Create new review object
    const newReview: Review = {
        id: `r-${Date.now()}`,
        author: formData.get("anonymous") === "on" ? "Anonymous" : "Verified User",
        rating: rating,
        date: "Just now",
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        verified: formData.get("paid") === "on",
        location: formData.get("location") as string || "Unknown Location"
    };

    console.log("Review Submitted:", newReview);
    
    // Add to "database"
    const result = addReview(coachId, newReview);

    if (result === "RATE_LIMIT") {
        toast({
            title: "Slow Down",
            description: "You are submitting too many reviews. Please wait a moment.",
            variant: "destructive"
        });
        return;
    }

    if (result) {
        toast({
            title: "Review Submitted",
            description: "Thank you for your feedback! Your review is live.",
        });
    
        // Redirect immediately to show the review
        setTimeout(() => {
            setLocation(`/coach/${coachId}`);
        }, 500);
    } else {
        toast({
            title: "Error",
            description: "Could not submit review. Please try again.",
            variant: "destructive"
        });
    }
  };

  if (!coach) return <Layout><div>Coach not found</div></Layout>;

  return (
    <Layout>
      <div className="bg-secondary/30 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center border-b bg-white rounded-t-lg pb-8">
              <CardTitle className="text-2xl font-bold mb-2">Review {coach.name}</CardTitle>
              <CardDescription>
                Share your experience to help others make better decisions.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Rating Input */}
                <div className="flex flex-col items-center gap-4 py-4">
                  <Label className="text-lg">Rate your experience</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none transition-transform hover:scale-110"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                      >
                        <div className={cn(
                            "p-2 rounded transition-colors",
                            (hoverRating || rating) >= star ? "bg-primary text-white" : "bg-muted text-muted-foreground/30"
                        )}>
                            <Star className={cn(
                              "h-8 w-8 fill-current stroke-none",
                            )} />
                        </div>
                      </button>
                    ))}
                  </div>
                  {/* Hidden input to ensure form validation if needed, though we use state */}
                  <input type="number" name="rating" value={rating} required className="sr-only" min="1" max="5" onChange={()=>{}}/>
                  {rating === 0 && <p className="text-sm text-destructive">Please select a star rating</p>}
                </div>

                {/* Review Content */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title of your review</Label>
                    <Input id="title" name="title" placeholder="Summarize your experience" required className="text-lg font-medium" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Your review</Label>
                    <Textarea 
                      id="content" 
                      name="content" 
                      placeholder="Tell people about the strategy, the mentorship, and your performance..." 
                      className="min-h-[150px] resize-y"
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">City / Address of Service</Label>
                    <Input id="location" name="location" placeholder="e.g. New York, NY" required />
                  </div>
                </div>

                {/* Verification */}
                <div className="space-y-4 p-6 bg-secondary/20 rounded-lg border border-secondary">
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Verification</h4>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="paid" name="paid" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="paid" className="cursor-pointer font-medium">I paid for this service</Label>
                      <p className="text-sm text-muted-foreground">This adds the "Verified Student" badge to your review.</p>
                    </div>
                  </div>
                </div>

                {/* Anonymous Toggle */}
                <div className="flex items-center space-x-2">
                   <Checkbox id="anonymous" name="anonymous" />
                   <Label htmlFor="anonymous" className="cursor-pointer">Post anonymously</Label>
                </div>

                <div className="space-y-4 pt-4">
                    <Button type="submit" size="lg" className="w-full text-lg font-semibold h-12" disabled={rating === 0}>
                    Submit Review
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                        By submitting, you agree to our Terms of Service.
                    </p>
                </div>

              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
