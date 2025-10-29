import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";
import constructionTools from "@/assets/construction-tools.jpg";
import heavyEquipment from "@/assets/heavy-equipment.jpg";
import agriculturalEquipment from "@/assets/agricultural-equipment.jpg";

const equipment = [
  {
    id: 1,
    title: "Professional Power Drill Set",
    image: constructionTools,
    price: "$45",
    period: "per day",
    location: "Lagos, Nigeria",
    rating: 4.9,
    reviews: 128,
    verified: true,
  },
  {
    id: 2,
    title: "Heavy Duty Excavator",
    image: heavyEquipment,
    price: "$850",
    period: "per day",
    location: "Nairobi, Kenya",
    rating: 5.0,
    reviews: 95,
    verified: true,
  },
  {
    id: 3,
    title: "Agricultural Tractor Package",
    image: agriculturalEquipment,
    price: "$320",
    period: "per day",
    location: "Accra, Ghana",
    rating: 4.8,
    reviews: 156,
    verified: true,
  },
];

export const FeaturedEquipment = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Featured Equipment</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Top-rated and verified equipment from trusted providers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipment.map((item, index) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-glow transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {item.verified && (
                  <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                    Hedera Verified
                  </Badge>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-medium">{item.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({item.reviews} reviews)
                  </span>
                </div>
                
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-3xl font-bold text-primary">{item.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">{item.period}</span>
                  </div>
                  <Button variant="hero">View Details</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Equipment
          </Button>
        </div>
      </div>
    </section>
  );
};
