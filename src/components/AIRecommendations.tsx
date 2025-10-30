import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { AIEngine, Equipment } from '@/utils/aiEngine';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface AIRecommendationsProps {
  currentItem?: Equipment;
  userHistory: string[];
  allEquipment: Equipment[];
}

export const AIRecommendations = ({ currentItem, userHistory, allEquipment }: AIRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<Equipment[]>([]);

  useEffect(() => {
    const recs = AIEngine.getRecommendations(userHistory, currentItem || null, allEquipment);
    setRecommendations(recs);
  }, [currentItem, userHistory, allEquipment]);

  if (recommendations.length === 0) return null;

  return (
    <section className="py-12 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          <h2 className="text-3xl font-bold">AI Recommended For You</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((item) => (
            <Card key={item.id} className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <Badge variant="secondary" className="ml-2">
                    AI Pick
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">${item.price}/day</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm">{item.rating}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <Badge variant="outline">{item.category}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
