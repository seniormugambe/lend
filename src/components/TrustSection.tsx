import { Shield, Lock, Globe, Zap } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "All transactions verified on Hedera's secure distributed ledger",
  },
  {
    icon: Lock,
    title: "Smart Contracts",
    description: "Automated, trustless agreements protect both renters and owners",
  },
  {
    icon: Globe,
    title: "Pan-African Network",
    description: "Connect with equipment providers across the entire continent",
  },
  {
    icon: Zap,
    title: "Fast & Efficient",
    description: "Quick transactions with low fees powered by Hedera technology",
  },
];

export const TrustSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Built on Trust & Technology</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Leveraging Hedera blockchain to create a transparent, secure, and efficient equipment rental marketplace
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="opacity-80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
