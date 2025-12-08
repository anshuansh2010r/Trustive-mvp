import { Link, useLocation } from "wouter";
import { Star, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("userRole");
    setIsLoggedIn(loggedIn);
    setUserRole(role);

    if (loggedIn) {
        if (role === "user") {
            const user = JSON.parse(localStorage.getItem("trustive_current_user") || "{}");
            setUserInfo(user);
        } else if (role === "coach") {
            const coach = JSON.parse(localStorage.getItem("trustive_current_coach") || "{}");
            setUserInfo(coach);
        }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("trustive_current_user");
    localStorage.removeItem("trustive_current_coach");
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
              <div className="h-8 w-8 bg-[#00b67a] text-white flex items-center justify-center rounded-sm">
                <Star className="h-5 w-5 fill-current" />
              </div>
              <span>Trustive</span>
            </a>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/for-coaches">
              <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">For Coaches</a>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            
            <Link href="/create-profile">
               <Button variant="outline" size="sm" className="hidden md:flex mr-2">
                 Publish as a Coach
               </Button>
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                 {userRole === "coach" && (
                     <Link href="/manage-profile">
                        <Button variant="ghost" size="sm" className="hidden md:flex">
                            Coach Dashboard
                        </Button>
                    </Link>
                 )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8 border">
                        <AvatarFallback>{userInfo?.name ? userInfo.name[0].toUpperCase() : "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userInfo?.name || "User"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {userInfo?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {userRole === "coach" && (
                         <DropdownMenuItem asChild>
                             <Link href="/manage-profile" className="w-full cursor-pointer">
                                Coach Dashboard
                            </Link>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  <Link href="/create-profile">
                    <a onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary transition-colors">
                      Publish as a Coach
                    </a>
                  </Link>

                  {isLoggedIn ? (
                    <>
                      <div className="flex flex-col gap-1 py-2 border-y">
                        <p className="font-medium">{userInfo?.name || "User"}</p>
                        <p className="text-sm text-muted-foreground">{userInfo?.email}</p>
                      </div>

                      {userRole === "coach" && (
                        <Link href="/manage-profile">
                          <a onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary transition-colors">
                            Coach Dashboard
                          </a>
                        </Link>
                      )}
                      
                      <Link href="/for-coaches">
                        <a onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary transition-colors">
                          For Coaches
                        </a>
                      </Link>

                      <button
                        onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                        className="text-lg font-medium text-red-600 text-left hover:text-red-700 transition-colors flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/for-coaches">
                        <a onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary transition-colors">
                          For Coaches
                        </a>
                      </Link>
                      <Link href="/login">
                        <a onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary transition-colors">Log in</a>
                      </Link>
                      <Link href="/signup">
                        <a onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary transition-colors">Sign up</a>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
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
                 <div className="h-6 w-6 bg-[#00b67a] text-white flex items-center justify-center rounded-sm">
                  <Star className="h-3 w-3 fill-current" />
                </div>
                <span>Trustive</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Bringing transparency to the online fitness coaching industry. Read real reviews from real clients.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">About</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about"><a className="hover:underline">About Us</a></Link></li>
                <li><Link href="/trust-safety"><a className="hover:underline">Trust & Safety</a></Link></li>
                <li><Link href="/contact"><a className="hover:underline">Contact</a></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Community</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/trust-in-reviews"><a className="hover:underline">Trust in Reviews</a></Link></li>
              </ul>
            </div>

             {/* Removed For Coaches section per requirements */}
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 Trustive. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
