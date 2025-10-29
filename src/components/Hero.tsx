import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/95" />
      </div>
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 backdrop-blur-sm border border-primary/20">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">Powered by Hedera Blockchain</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Rent Tools & Equipment Across Africa
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access quality construction, agricultural, and industrial equipment when you need it. 
            Transparent, secure, and blockchain-verified.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="lg" className="w-full sm:w-auto">
              Browse Equipment
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              List Your Equipment
            </Button>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search for tools, equipment, or machinery..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
