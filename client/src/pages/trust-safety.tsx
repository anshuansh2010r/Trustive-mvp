import { Layout } from "@/components/layout";

export default function TrustSafety() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Trust & Safety</h1>
        <div className="prose prose-lg max-w-none text-muted-foreground">
          <p>
            At Trustive, the integrity of our reviews is our top priority. We employ strict measures to ensure that the feedback you read is authentic and helpful.
          </p>
          <h3>Our Standards</h3>
          <ul>
            <li><strong>Verification:</strong> We prioritize verified reviews where proof of purchase has been submitted.</li>
            <li><strong>Moderation:</strong> All reviews are scanned for spam, hate speech, and conflict of interest.</li>
            <li><strong>Fairness:</strong> We give coaches the right to reply to reviews, ensuring both sides of the story are heard.</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
