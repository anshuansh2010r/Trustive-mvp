import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getCoaches, updateCoach } from "@/lib/mockData";

export default function ClaimProfile() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app we would send this to backend.
    // For MVP we just simulate the pending state but DO NOT update the coach object ownership yet.
    // The requirement is: Set claim_status = "pending", do NOT set claimed = true.
    
    const formData = new FormData(e.target as HTMLFormElement);
    const nameToCheck = formData.get("name") as string;
    
    // Find matching coach by name (naive match for MVP)
    const coaches = getCoaches();
    const coach = coaches.find(c => c.name.toLowerCase() === nameToCheck.toLowerCase());

    if (coach) {
        if (coach.claimed) {
             toast({ title: "Error", description: "This profile is already claimed.", variant: "destructive" });
             return;
        }
        
        // Update mock data to pending
        const updated = { ...coach, claim_status: "pending" as const };
        updateCoach(updated);
    }
    
    setSubmitted(true);
    toast({
      title: "Claim Request Sent",
      description: "We will review your request and contact you shortly.",
    });
  };

  if (submitted) {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-20 flex justify-center text-center">
                <Card className="max-w-md w-full p-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">Request Received</h2>
                    <p className="text-muted-foreground mb-6">Thank you for submitting your claim. Our team will verify your identity via the provided Instagram handle or email within 48 hours.</p>
                    <Button onClick={() => window.location.href = '/'}>Back to Home</Button>
                </Card>
            </div>
        </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Claim Your Profile</CardTitle>
            <CardDescription>
              To prevent fraud, we manually verify all coach profiles. Please provide your details below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Coach Name (on Trustive)</Label>
                <Input id="name" name="name" required placeholder="e.g. Alex Rivera" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Professional Email</Label>
                <Input id="email" type="email" required placeholder="contact@example.com" />
              </div>

               <div className="space-y-2">
                <Label htmlFor="instagram">Instagram Handle</Label>
                <Input id="instagram" required placeholder="@handle" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message / Additional Info</Label>
                <Textarea 
                    id="message" 
                    placeholder="Tell us which profile you are claiming..." 
                    className="min-h-[100px]"
                />
              </div>

              <div className="bg-muted/50 p-4 rounded text-sm text-muted-foreground">
                <p className="font-semibold mb-1">Verification Note:</p>
                Please contact us from your official Instagram or professional email if you don't hear back within 2 days.
              </div>

              <Button type="submit" className="w-full">Submit Claim</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
