import { useState, useEffect } from "react";
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
import { useLocation } from "wouter";

export default function ManageProfile() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [myCoach, setMyCoach] = useState<any>(null);
  const [currentAccount, setCurrentAccount] = useState<any>(null);
  
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [replyText, setReplyText] = useState<{[key: string]: string}>({});

  useEffect(() => {
      // Check auth
      const role = localStorage.getItem("userRole");
      const accountStr = localStorage.getItem("trustive_current_coach");
      
      if (role !== "coach" || !accountStr) {
          setLocation("/login");
          return;
      }

      const account = JSON.parse(accountStr);
      setCurrentAccount(account);

      if (account.linkedCoachProfileId) {
          const coaches = getCoaches();
          const profile = coaches.find(c => c.id === account.linkedCoachProfileId);
          if (profile) {
              setMyCoach(profile);
              setName(profile.name);
              setBio(profile.bio);
              setWebsite(profile.website || "");
          }
      }
      setLoading(false);
  }, []);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!myCoach) return;

    // Ownership check (redundant if we only loaded linked profile, but good practice)
    if (myCoach.owner_coach_id && myCoach.owner_coach_id !== currentAccount.id) {
         toast({ title: "Error", description: "You do not have permission to edit this profile.", variant: "destructive" });
         return;
    }

    const updated = {
        ...myCoach,
        name,
        bio,
        website
    };
    updateCoach(updated);
    // Update local state
    setMyCoach(updated);
    toast({
        title: "Profile Updated",
        description: "Your changes have been saved."
    });
  };

  const handleReply = (reviewId: string) => {
      if (!myCoach) return;
      const text = replyText[reviewId];
      if (!text) return;

      const reviewIndex = myCoach.reviews.findIndex((r: any) => r.id === reviewId);
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
          setMyCoach(updatedCoach); // Update local
          
          toast({
              title: "Reply Posted",
              description: "Your response is now live."
          });
          
          setReplyText(prev => ({...prev, [reviewId]: ""}));
      }
  };

  if (loading) return <Layout><div>Loading...</div></Layout>;

  if (!myCoach) {
      return (
          <Layout>
              <div className="container mx-auto px-4 py-20 text-center">
                  <h1 className="text-2xl font-bold mb-4">No Profile Linked</h1>
                  <p className="mb-6">You are logged in as a guru but don't have a public profile yet.</p>
                  <Button onClick={() => setLocation("/create-profile")}>Create Profile</Button>
              </div>
          </Layout>
      );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Guru Dashboard</h1>
        
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
                                <Input value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://" />
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
                <h2 className="text-2xl font-bold">Your Reviews ({myCoach.reviewCount})</h2>
                
                {myCoach.reviews.length === 0 && <p className="text-muted-foreground">No reviews yet.</p>}

                {myCoach.reviews.map((review: any) => (
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
                                    <p className="text-xs font-bold text-primary mb-1">Response from professional</p>
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
