import { Layout } from "@/components/layout";

export default function TrustInReviews() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Trust in Reviews</h1>
        <div className="prose prose-lg max-w-none text-muted-foreground">
          <p>
            Reviews are powerful tools, but only when they are honest. Here is how we maintain trust in our ecosystem.
          </p>
          <h3>How we moderate</h3>
          <p>
             We use a combination of automated systems and human moderation to detect fake reviews. If a review is flagged, it is hidden until verified.
          </p>
          <h3>For Users</h3>
          <p>
            Always look for the "Verified Client" badge. This means we have seen proof of payment for the service.
          </p>
           <h3>For Coaches</h3>
          <p>
            You cannot delete negative reviews, but you can report them if they violate our content guidelines (e.g., abusive language).
          </p>
        </div>
      </div>
    </Layout>
  );
}
