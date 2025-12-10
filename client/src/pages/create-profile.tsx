import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { createCoach, Coach } from "@/lib/mockData";
import { useLocation } from "wouter";

export default function CreateProfile() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  // We need to capture password/email for account creation simultaneously if not logged in
  // OR use currently logged in coach account.
  
  // For MVP simplicity based on instructions "When publishing a NEW coach profile... form must include Password"
  // implies we are creating the account AND profile together here.

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    // 1. Create Coach Account
    const coaches = JSON.parse(localStorage.getItem("trustive_coach_accounts") || "[]");
    if (coaches.some((c: any) => c.email === email)) {
         toast({ title: "Error", description: "Account with this email already exists.", variant: "destructive" });
         return;
    }

    const coachProfileId = `coach-${Date.now()}`;
    const newCoachAccount = {
        id: `ca-${Date.now()}`,
        name: name,
        email: email,
        password: password,
        profileImage: "", // Could handle upload here if added to form
        linkedCoachProfileId: coachProfileId
    };

    coaches.push(newCoachAccount);
    localStorage.setItem("trustive_coach_accounts", JSON.stringify(coaches));

    // 2. Create Public Profile
    const newCoachProfile: Coach = {
        id: coachProfileId,
        name: name,
        handle: formData.get("instagram") as string,
        category: formData.get("category") as string,
        country: formData.get("country") as string,
        location: formData.get("location") as string,
        bio: formData.get("bio") as string,
        website: formData.get("website") as string || undefined,
        avatar: name.substring(0, 2).toUpperCase(),
        rating: 0,
        reviewCount: 0,
        reviews: [],
        claimed: true,
        claim_status: "claimed",
        owner_coach_id: newCoachAccount.id
    };

    createCoach(newCoachProfile);

    // Auto login
    localStorage.setItem("trustive_current_coach", JSON.stringify(newCoachAccount));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", "coach");

    toast({
      title: "Profile Published",
      description: "Your coach profile is now live and claimed.",
    });
    
    setTimeout(() => {
        setLocation(`/manage-profile`);
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Publish Guru Profile</CardTitle>
            <CardDescription>
              Create your professional profile and account in one step.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="p-4 bg-muted/30 rounded-lg space-y-4 border">
                  <h3 className="font-semibold text-sm uppercase text-muted-foreground">Account Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required placeholder="contact@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Create Password</Label>
                        <Input id="password" name="password" type="password" required />
                      </div>
                  </div>
              </div>

              <div className="space-y-4">
                  <h3 className="font-semibold text-sm uppercase text-muted-foreground">Profile Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" required placeholder="e.g. Alex Rivera" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" name="category" required placeholder="e.g. Fat Loss" />
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" name="country" required placeholder="e.g. USA" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">City / Address</Label>
                        <Input id="location" name="location" required placeholder="e.g. Los Angeles, CA" />
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram Handle</Label>
                        <Input id="instagram" name="instagram" required placeholder="@handle" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website (Optional)</Label>
                        <Input id="website" name="website" placeholder="https://" />
                      </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                        id="bio" 
                        name="bio"
                        required
                        placeholder="Tell us about your trading..." 
                        className="min-h-[100px]"
                    />
                  </div>
              </div>

              <Button type="submit" className="w-full">Publish & Create Account</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
