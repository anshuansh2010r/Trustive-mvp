import { useState } from "react";
import { Search } from "lucide-react";
import { Layout } from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CoachCard } from "@/components/coach-card";
import { MOCK_COACHES } from "@/lib/mockData";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCoaches = MOCK_COACHES.filter(coach => 
    coach.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    coach.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-[#f5f5f5] py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1c1c1c] leading-[1.1]">
            Check real client experiences before paying an online fitness coach
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't get scammed by fake transformations. Search a coach, read verified reviews, and make the right choice for your health.
          </p>

          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
              <Search className="h-6 w-6" />
            </div>
            <Input 
              type="text" 
              placeholder="Search for a coach or category..." 
              className="h-16 pl-12 text-lg rounded-full shadow-lg border-0 bg-white ring-offset-0 focus-visible:ring-2 focus-visible:ring-primary/50 transition-shadow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="absolute right-2 top-2 h-12 rounded-full px-8 text-base font-semibold">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Coaches */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Recently Reviewed Coaches</h2>
            <p className="text-muted-foreground">See who's making waves (good or bad) in the fitness industry.</p>
          </div>
          <Button variant="outline">View All Categories</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-white border-y py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary text-2xl font-bold">1</div>
                <h3 className="text-xl font-bold">Search</h3>
                <p className="text-muted-foreground">Find your coach in our database of over 5,000 verified online trainers.</p>
            </div>
            <div className="space-y-4">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary text-2xl font-bold">2</div>
                <h3 className="text-xl font-bold">Read</h3>
                <p className="text-muted-foreground">See unedited reviews from real clients. We verify payments to prevent fake testimonials.</p>
            </div>
            <div className="space-y-4">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary text-2xl font-bold">3</div>
                <h3 className="text-xl font-bold">Decide</h3>
                <p className="text-muted-foreground">Hire with confidence knowing exactly what you're signing up for.</p>
            </div>
        </div>
      </section>
    </Layout>
  );
}
