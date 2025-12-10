import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    features: [
      "100 conversations/month",
      "Basic chatbot integration",
      "Email support",
      "Standard analytics",
    ],
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited conversations",
      "Advanced AI features",
      "Priority support",
      "Advanced analytics",
      "Custom branding",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "White-label solution",
    ],
  },
];

export const PricingPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-8 ${
                plan.popular ? "border-primary border-2 relative" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/contact">
            <Button variant="link">Need a custom plan? Contact us →</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
