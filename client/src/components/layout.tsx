import { Link, useLocation } from "wouter";
import { Star, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-[#fcfcfc]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 font-heading font-bold text-2xl tracking-tight hover:opacity-90 transition-opacity">
              <div className="bg-primary text-primary-foreground p-1 rounded">
                <Star className="h-5 w-5 fill-current" />
              </div>
              <span>FitTrust</span>
            </a>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {/* Removed unused nav items (Categories, Blog) */}
            <Link href="/for-coaches">
              <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">For Coaches</a>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <Button onClick={handleLogout} variant="ghost" size="sm" className="hidden md:flex">
                Log out
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="hidden md:flex">Log in</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="hidden md:flex font-medium">Sign up</Button>
                </Link>
              </>
            )}
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-heading font-bold text-xl">
                <div className="bg-primary text-primary-foreground p-1 rounded-sm">
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span>FitTrust</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Bringing transparency to the online fitness coaching industry. Read real reviews from real clients.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">About</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Trust & Safety</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Community</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Trust in Reviews</a></li>
                <li><a href="#" className="hover:underline">Help Center</a></li>
                {/* Updated footer link */}
                <li><Link href="/login"><a className="hover:underline">Log In</a></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">For Coaches</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Coach Login</a></li>
                <li><a href="#" className="hover:underline">Claim Profile</a></li>
                <li><a href="#" className="hover:underline">Business Support</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 FitTrust. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
