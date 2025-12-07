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
