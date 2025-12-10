import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "coach">("user");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Login attempt as ${role}:`, { email, password });
    
    // Simulate multi-user login
    if (role === "user") {
        const users = JSON.parse(localStorage.getItem("trustive_users") || "[]");
        const user = users.find((u: any) => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem("trustive_current_user", JSON.stringify(user));
            // Ensure old generic flag is cleared or updated if used elsewhere, but we switch to explicit current objects
            localStorage.setItem("isLoggedIn", "true"); 
            localStorage.setItem("userRole", "user");
            setLocation("/");
            toast({ title: "Welcome back!", description: `Logged in as ${user.name}` });
        } else {
             toast({ title: "Login Failed", description: "Invalid email or password.", variant: "destructive" });
        }

    } else {
        const coaches = JSON.parse(localStorage.getItem("trustive_coach_accounts") || "[]");
        const coach = coaches.find((c: any) => c.email === email && c.password === password);
        
        if (coach) {
            localStorage.setItem("trustive_current_coach", JSON.stringify(coach));
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userRole", "coach");
            setLocation("/manage-profile");
            toast({ title: "Welcome Guru!", description: `Logged in as ${coach.name}` });
        } else {
             toast({ title: "Login Failed", description: "Invalid guru credentials.", variant: "destructive" });
        }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[60vh]">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Log in to Trustive</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="user" onValueChange={(v) => setRole(v as "user" | "coach")} className="w-full mb-6">
                <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="user">Login as User</TabsTrigger>
                    <TabsTrigger value="coach">Login as Guru</TabsTrigger>
                </TabsList>
            </Tabs>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder={role === "user" ? "user@example.com" : "guru@example.com"}
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
                  {role === "user" ? "Log in as User" : "Log in as Guru"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <div className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup">
                <a className="text-primary hover:underline font-medium">Create an account</a>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
