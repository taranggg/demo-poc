import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form submitted:", { name, email, message });

    // Reset form after 3 seconds
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            Get in touch with our team. We'd love to hear from you!
          </p>
        </div>

        <Card className="p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
              <p className="text-muted-foreground">
                We've received your message and will get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name-input"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <Input
                  id="name-input"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email-input"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <Input
                  id="email-input"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message-input"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message-input"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tell us about your project..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Send Message
              </Button>
            </form>
          )}
        </Card>

        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl mb-2">📧</div>
            <h3 className="font-semibold mb-1">Email</h3>
            <p className="text-sm text-muted-foreground">hello@example.com</p>
          </div>
          <div>
            <div className="text-3xl mb-2">📞</div>
            <h3 className="font-semibold mb-1">Phone</h3>
            <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
          </div>
          <div>
            <div className="text-3xl mb-2">📍</div>
            <h3 className="font-semibold mb-1">Office</h3>
            <p className="text-sm text-muted-foreground">San Francisco, CA</p>
          </div>
        </div>
      </div>
    </div>
  );
};
