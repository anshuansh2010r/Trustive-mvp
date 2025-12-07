import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { MOCK_COACHES } from "@/lib/mockData";
import { CoachCard } from "@/components/coach-card";
import { Button } from "@/components/ui/button";

export default function SearchResults() {
  const [location] = useLocation();
  
  // Parse query parameter manually since wouter doesn't have a built-in hook for it
  const getQueryParam = (name: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(name) || "";
  };

  const query = getQueryParam("q");

  const filteredCoaches = MOCK_COACHES.filter(coach => 
    coach.name.toLowerCase().includes(query.toLowerCase()) || 
    coach.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">
          Search results for: <span className="text-primary">"{query}"</span>
        </h1>
        <p className="text-muted-foreground mb-8">
          Found {filteredCoaches.length} {filteredCoaches.length === 1 ? 'coach' : 'coaches'}
        </p>

        {filteredCoaches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCoaches.map((coach) => (
              <CoachCard key={coach.id} coach={coach} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">No coaches found</h2>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or browse all coaches.
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Back to Home
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
