import { Hammer, Tractor, Wrench, HardHat } from "lucide-react";
import { Card } from "@/components/ui/card";

const categories = [
  {
    icon: Hammer,
    title: "Construction Tools",
    description: "Power tools, hand tools, and construction equipment",
    count: "1,200+ items",
  },
  {
    icon: Tractor,
    title: "Agricultural Equipment",
    description: "Tractors, harvesters, and farming machinery",
    count: "850+ items",
  },
  {
    icon: HardHat,
    title: "Heavy Machinery",
    description: "Excavators, cranes, and industrial equipment",
    count: "650+ items",
  },
  {
    icon: Wrench,
    title: "Specialized Tools",
    description: "Professional and specialized equipment",
    count: "450+ items",
  },
];

export const Categories = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the right equipment for your project across multiple industries
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-glow transition-all duration-300 cursor-pointer group border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-warm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <category.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{category.description}</p>
              <p className="text-primary font-medium text-sm">{category.count}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
