import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getCoaches, updateCoach } from "@/lib/mockData";
import { StarRating } from "@/components/star-rating";
import { Badge } from "@/components/ui/badge";

export default function ManageProfile() {
  const { toast } = useToast();
  // Simulate fetching logged in user's coach profile
  // For MVP, we'll just grab the first one to simulate "My Profile"
  const coaches = getCoaches();
  const myCoach = coaches[0]; 
  
  const [name, setName] = useState(myCoach.name);
  const [bio, setBio] = useState(myCoach.bio);
  const [website, setWebsite] = useState(myCoach.website || "");
  const [replyText, setReplyText] = useState<{[key: string]: string}>({});

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
        ...myCoach,
        name,
        bio,
        website
    };
    updateCoach(updated);
    toast({
        title: "Profile Updated",
        description: "Your changes have been saved."
    });
  };

  const handleReply = (reviewId: string) => {
      const text = replyText[reviewId];
      if (!text) return;

      const reviewIndex = myCoach.reviews.findIndex(r => r.id === reviewId);
      if (reviewIndex !== -1) {
          const updatedReviews = [...myCoach.reviews];
          updatedReviews[reviewIndex] = {
              ...updatedReviews[reviewIndex],
              reply: text
          };
          
          const updatedCoach = {
              ...myCoach,
              reviews: updatedReviews
          };
          
          updateCoach(updatedCoach);
          toast({
              title: "Reply Posted",
              description: "Your response is now live."
          });
          
          // Clear input
          setReplyText(prev => ({...prev, [reviewId]: ""}));
          // Force re-render not needed as we are not using state for the coach object fully reactively here
          // but in a real app queryClient would handle this. 
          // Since we are reading from localStorage in component render, we might need to force update or just reload.
          // For MVP simplicity:
           window.location.reload();
      }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Edit Profile Column */}
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input value={name} onChange={e => setName(e.target.value)} />
                            </div>
                             <div className="space-y-2">
                                <Label>Website</Label>
                                <Input value={website} onChange={e => setWebsite(e.target.value)} />
                            </div>
                             <div className="space-y-2">
                                <Label>Bio</Label>
                                <Textarea value={bio} onChange={e => setBio(e.target.value)} className="min-h-[150px]" />
                            </div>
                            <Button type="submit" className="w-full">Save Changes</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Reviews Management Column */}
            <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold">Your Reviews</h2>
                
                {myCoach.reviews.map(review => (
                    <Card key={review.id}>
                        <CardContent className="p-6">
                             <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="font-bold">{review.author}</div>
                                    <div className="text-sm text-muted-foreground">{review.date}</div>
                                </div>
                                <StarRating rating={review.rating} size="sm" />
                            </div>
                            <h3 className="font-bold mb-2">{review.title}</h3>
                            <p className="text-muted-foreground mb-4">{review.content}</p>

                            {review.reply ? (
                                <div className="bg-muted/30 p-4 rounded border-l-4 border-primary">
                                    <p className="text-xs font-bold text-primary mb-1">Your Reply</p>
                                    <p className="text-sm">{review.reply}</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Label className="text-xs uppercase text-muted-foreground">Reply to this review</Label>
                                    <div className="flex gap-2">
                                        <Input 
                                            placeholder="Write a public response..." 
                                            value={replyText[review.id] || ""}
                                            onChange={e => setReplyText(prev => ({...prev, [review.id]: e.target.value}))}
                                        />
                                        <Button onClick={() => handleReply(review.id)}>Reply</Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </Layout>
  );
}
