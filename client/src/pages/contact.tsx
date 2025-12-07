import { Layout } from "@/components/layout";

export default function Contact() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
        <div className="bg-white p-8 rounded-lg border shadow-sm space-y-6">
            <p className="text-lg">
                Have questions or need support? Reach out to us directly.
            </p>
            
            <div className="space-y-4">
                <div>
                    <h3 className="font-bold text-sm uppercase text-muted-foreground">Email</h3>
                    <p className="text-xl">trustive.com@gmail.com</p>
                </div>
                
                <div>
                    <h3 className="font-bold text-sm uppercase text-muted-foreground">Instagram</h3>
                    <p className="text-xl">@trustive_</p>
                </div>
            </div>
        </div>
      </div>
    </Layout>
  );
}
