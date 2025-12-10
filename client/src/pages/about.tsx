import { Layout } from "@/components/layout";

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-8">About Trustive</h1>
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            Trustive is a trust and review platform built to help people make better decisions before paying for trading courses.
          </p>
          <p>
            We provide a transparent space where users can read real experiences related to paid trading courses, understand patterns, and choose with confidence. Trustive focuses on fairness, clarity, and moderation — not promotion or judgment.
          </p>
          <p className="font-medium text-foreground text-2xl pt-4">
            Our goal is simple:
            <br />
            make trust easier, decisions safer, and transparency standard.
          </p>
        </div>
      </div>
    </Layout>
  );
}
