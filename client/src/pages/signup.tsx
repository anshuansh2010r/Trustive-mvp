import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "coach">("user");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (role === "user") {
        // Create User Account
        const users = JSON.parse(localStorage.getItem("trustive_users") || "[]");
        // Check if email exists
        if (users.some((u: any) => u.email === email)) {
            toast({ title: "Error", description: "Email already exists.", variant: "destructive" });
            return;
        }

        const newUser = {
            id: `u-${Date.now()}`,
            name,
            email,
            password,
            profileImage: "" // Default empty
        };
        users.push(newUser);
        localStorage.setItem("trustive_users", JSON.stringify(users));
        
        // Auto login
        localStorage.setItem("trustive_current_user", JSON.stringify(newUser));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "user");
        
        toast({ title: "Account Created", description: "Welcome to Trustive!" });
        setLocation("/");

    } else {
        // Coach Signup logic is actually usually via "Create Profile" or specialized flow.
        // But per requirements "Multiple coaches can sign up and log in".
        // Let's create a coach account that is NOT linked to a profile yet (or empty link).
        
        const coaches = JSON.parse(localStorage.getItem("trustive_coach_accounts") || "[]");
        if (coaches.some((c: any) => c.email === email)) {
             toast({ title: "Error", description: "Email already exists.", variant: "destructive" });
             return;
        }

        const newCoachAccount = {
            id: `ca-${Date.now()}`,
            name,
            email,
            password,
            profileImage: "",
            linkedCoachProfileId: null // No profile yet
        };

        coaches.push(newCoachAccount);
        localStorage.setItem("trustive_coach_accounts", JSON.stringify(coaches));

        // Auto login
        localStorage.setItem("trustive_current_coach", JSON.stringify(newCoachAccount));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "coach");
        
        toast({ title: "Guru Account Created", description: "You can now create or claim a profile." });
        setLocation("/manage-profile"); // Will likely prompt to create profile there
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[60vh]">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Join Trustive today
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Tabs defaultValue="user" onValueChange={(v) => setRole(v as "user" | "coach")} className="w-full mb-6">
                <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="user">I'm a User</TabsTrigger>
                    <TabsTrigger value="coach">I'm a Guru</TabsTrigger>
                </TabsList>
            </Tabs>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <Button type="submit" className="w-full mt-2">
                  {role === "user" ? "Sign up as User" : "Sign up as Guru"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login">
                <a className="text-primary hover:underline font-medium">Log in</a>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
