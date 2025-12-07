import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Profile from "@/pages/profile";
import SubmitReview from "@/pages/submit-review";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import ForCoaches from "@/pages/for-coaches";
import SearchResults from "@/pages/search";
import ClaimProfile from "@/pages/claim-profile";
import CreateProfile from "@/pages/create-profile";
import ManageProfile from "@/pages/manage-profile";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import TrustSafety from "@/pages/trust-safety";
import TrustInReviews from "@/pages/trust-in-reviews";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/for-coaches" component={ForCoaches} />
      <Route path="/search" component={SearchResults} />
      <Route path="/coach/:id" component={Profile} />
      <Route path="/review/:id" component={SubmitReview} />
      <Route path="/claim-profile" component={ClaimProfile} />
      <Route path="/create-profile" component={CreateProfile} />
      <Route path="/manage-profile" component={ManageProfile} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/trust-safety" component={TrustSafety} />
      <Route path="/trust-in-reviews" component={TrustInReviews} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
