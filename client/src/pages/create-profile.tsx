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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const newCoach: Coach = {
        id: `coach-${Date.now()}`,
        name: formData.get("name") as string,
        handle: formData.get("instagram") as string,
        category: formData.get("category") as string,
        country: formData.get("country") as string,
        location: formData.get("location") as string,
        bio: formData.get("bio") as string,
        website: formData.get("website") as string || undefined,
        avatar: (formData.get("name") as string).substring(0, 2).toUpperCase(),
        rating: 0,
        reviewCount: 0,
        reviews: []
    };

    createCoach(newCoach);

    toast({
      title: "Profile Created",
      description: "Your coach profile is now live.",
    });
    
    setTimeout(() => {
        setLocation(`/coach/${newCoach.id}`);
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create Coach Profile</CardTitle>
            <CardDescription>
              Add your details to the Trustive directory.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Tell us about your coaching..." 
                    className="min-h-[100px]"
                />
              </div>

              <Button type="submit" className="w-full">Create Profile</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
