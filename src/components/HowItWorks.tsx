import { Search, Shield, Handshake, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: Search,
    title: "Browse & Search",
    description: "Find the perfect equipment for your needs from our verified marketplace across Africa.",
  },
  {
    icon: Shield,
    title: "Blockchain Verified",
    description: "Every transaction is secured and verified on Hedera blockchain for complete transparency.",
  },
  {
    icon: Handshake,
    title: "Connect & Rent",
    description: "Connect with equipment owners, agree on terms, and secure your rental with smart contracts.",
  },
  {
    icon: CheckCircle,
    title: "Complete & Review",
    description: "Return equipment, complete your transaction, and leave a review to build trust.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, secure, and transparent equipment rental powered by blockchain technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <Card className="p-6 h-full border-border/50 hover:shadow-card transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gradient-warm flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-glow">
                  {index + 1}
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-warm" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
