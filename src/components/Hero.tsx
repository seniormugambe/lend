import { useState } from "react";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import { AISearchBar } from "./AISearchBar";
import { Equipment } from "@/utils/aiEngine";

// Mock equipment data for AI search
const mockEquipment: Equipment[] = [
  {
    id: "1",
    name: "Power Drill Set",
    category: "Construction",
    description: "Professional power drill with multiple bits",
    price: 25,
    location: "Lagos, Nigeria",
    rating: 4.8,
    availability: true,
    features: ["cordless", "lithium battery", "variable speed"]
  },
  {
    id: "2",
    name: "Excavator",
    category: "Heavy Equipment",
    description: "20-ton hydraulic excavator",
    price: 500,
    location: "Nairobi, Kenya",
    rating: 4.9,
    availability: true,
    features: ["hydraulic", "GPS tracking", "air conditioned"]
  },
];

export const Hero = () => {
  const [searchResults, setSearchResults] = useState<Equipment[]>([]);

  const handleSearch = (results: Equipment[]) => {
    setSearchResults(results);
    console.log("AI Search Results:", results);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/95" />
      </div>
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 backdrop-blur-sm border border-primary/20 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">AI-Powered • Hedera Blockchain</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Rent Equipment,
            <br />
            <span className="bg-gradient-warm bg-clip-text text-transparent">
              Build Africa
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-foreground/90 animate-fade-in">
            AI-powered equipment rental with Hedera blockchain security
          </p>
          
          <div className="animate-slide-in mb-8">
            <AISearchBar onSearch={handleSearch} equipment={mockEquipment} />
          </div>
          
          {searchResults.length > 0 && (
            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 animate-fade-in max-w-md mx-auto">
              <p className="text-sm text-muted-foreground mb-2">
                <Sparkles className="inline w-4 h-4 mr-1" />
                AI found {searchResults.length} results
              </p>
              <div className="space-y-2">
                {searchResults.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm bg-card/50 p-2 rounded">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-primary font-semibold">${item.price}/day</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
