import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { MOCK_COACHES } from "@/lib/mockData";
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
  const coach = MOCK_COACHES.find((c) => c.id === coachId);
  const { toast } = useToast();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    console.log("Review Submitted:", { ...data, rating });
    
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback! Your review is pending moderation.",
    });

    setTimeout(() => {
        setLocation(`/coach/${coachId}`);
    }, 1500);
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
                  <input type="hidden" name="rating" value={rating} required />
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
                      placeholder="Tell people about the program, the communication, and your results..." 
                      className="min-h-[150px] resize-y"
                      required 
                    />
                  </div>
                </div>

                {/* Verification */}
                <div className="space-y-4 p-6 bg-secondary/20 rounded-lg border border-secondary">
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Verification (Optional)</h4>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="paid" name="paid" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="paid" className="cursor-pointer font-medium">I paid for this service</Label>
                      <p className="text-sm text-muted-foreground">This helps us verify legitimate reviews.</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proof">Upload Proof of Purchase (Screenshot)</Label>
                    <Input id="proof" type="file" className="cursor-pointer bg-white" />
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
                        By submitting, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Community Guidelines</a>.
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
