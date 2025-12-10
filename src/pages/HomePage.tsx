import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Our Chatbot POC</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Experience seamless cross-origin communication with our embedded
          chatbot assistant
        </p>

        <div className="flex gap-4 justify-center mb-16">
          <Link to="/pricing">
            <Button size="lg">View Pricing</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">🤖 Smart Assistant</h3>
            <p className="text-muted-foreground">
              Our chatbot can navigate pages and fill forms automatically
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">
              🔒 Secure Communication
            </h3>
            <p className="text-muted-foreground">
              Using postMessage API for safe cross-origin messaging
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">⚡ Real-time Actions</h3>
            <p className="text-muted-foreground">
              Instant page navigation and form filling capabilities
            </p>
          </Card>
        </div>

        <div className="mt-16 p-6 bg-muted rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Try the Chatbot</h2>
          <p className="text-muted-foreground mb-4">
            Look at the bottom-right corner of your screen. Try these commands:
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <code className="bg-background p-2 rounded">go to pricing</code>
            <code className="bg-background p-2 rounded">go to contact</code>
            <code className="bg-background p-2 rounded">fill form</code>
          </div>
        </div>
      </div>
    </div>
  );
};
