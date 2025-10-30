// Advanced AI Engine for Equipment Recommendations and Smart Search

export interface Equipment {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  location: string;
  rating: number;
  availability: boolean;
  features: string[];
}

export class AIEngine {
  // Smart Search with NLP-like features
  static smartSearch(query: string, equipment: Equipment[]): Equipment[] {
    if (!query || query.trim() === '') return equipment;

    const normalizedQuery = query.toLowerCase().trim();
    const queryTerms = normalizedQuery.split(/\s+/);

    return equipment
      .map(item => {
        let score = 0;
        const searchableText = `${item.name} ${item.description} ${item.category} ${item.features.join(' ')}`.toLowerCase();

        // Exact match bonus
        if (searchableText.includes(normalizedQuery)) {
          score += 100;
        }

        // Term matching
        queryTerms.forEach(term => {
          if (searchableText.includes(term)) {
            score += 10;
          }
          // Fuzzy matching for typos
          if (this.fuzzyMatch(term, searchableText)) {
            score += 5;
          }
        });

        // Category match bonus
        if (item.category.toLowerCase().includes(normalizedQuery)) {
          score += 50;
        }

        // Rating factor
        score += item.rating * 2;

        // Availability bonus
        if (item.availability) {
          score += 20;
        }

        return { ...item, searchScore: score };
      })
      .filter(item => item.searchScore > 0)
      .sort((a, b) => b.searchScore - a.searchScore);
  }

  // Recommendation Engine based on user behavior
  static getRecommendations(
    userHistory: string[],
    currentItem: Equipment | null,
    allEquipment: Equipment[]
  ): Equipment[] {
    const recommendations = allEquipment.map(item => {
      let score = 0;

      // Similar category bonus
      if (currentItem && item.category === currentItem.category && item.id !== currentItem.id) {
        score += 50;
      }

      // User history matching
      userHistory.forEach(historyCategory => {
        if (item.category === historyCategory) {
          score += 30;
        }
      });

      // High rating bonus
      score += item.rating * 10;

      // Availability factor
      if (item.availability) {
        score += 25;
      }

      // Popular items (high rating with availability)
      if (item.rating >= 4.5 && item.availability) {
        score += 40;
      }

      return { ...item, recommendationScore: score };
    });

    return recommendations
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 6);
  }

  // Price prediction based on demand and seasonality
  static predictOptimalPrice(
    basePrice: number,
    demand: number,
    season: 'peak' | 'normal' | 'low'
  ): number {
    let multiplier = 1;

    // Demand factor (0-100)
    multiplier += demand / 200;

    // Seasonal adjustment
    switch (season) {
      case 'peak':
        multiplier *= 1.3;
        break;
      case 'low':
        multiplier *= 0.8;
        break;
      default:
        multiplier *= 1;
    }

    return Math.round(basePrice * multiplier * 100) / 100;
  }

  // Smart filtering with multiple criteria
  static smartFilter(
    equipment: Equipment[],
    filters: {
      categories?: string[];
      priceRange?: { min: number; max: number };
      minRating?: number;
      location?: string;
      availableOnly?: boolean;
    }
  ): Equipment[] {
    return equipment.filter(item => {
      if (filters.categories && filters.categories.length > 0) {
        if (!filters.categories.includes(item.category)) return false;
      }

      if (filters.priceRange) {
        if (item.price < filters.priceRange.min || item.price > filters.priceRange.max) {
          return false;
        }
      }

      if (filters.minRating && item.rating < filters.minRating) {
        return false;
      }

      if (filters.location && !item.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      if (filters.availableOnly && !item.availability) {
        return false;
      }

      return true;
    });
  }

  // Sentiment analysis for reviews (simple implementation)
  static analyzeReviewSentiment(review: string): {
    sentiment: 'positive' | 'neutral' | 'negative';
    score: number;
  } {
    const positiveWords = ['excellent', 'great', 'amazing', 'good', 'perfect', 'love', 'best', 'fantastic'];
    const negativeWords = ['bad', 'poor', 'terrible', 'worst', 'disappointing', 'broken', 'damaged'];

    const lowerReview = review.toLowerCase();
    let score = 0;

    positiveWords.forEach(word => {
      if (lowerReview.includes(word)) score += 1;
    });

    negativeWords.forEach(word => {
      if (lowerReview.includes(word)) score -= 1;
    });

    if (score > 0) return { sentiment: 'positive', score };
    if (score < 0) return { sentiment: 'negative', score };
    return { sentiment: 'neutral', score: 0 };
  }

  // Fuzzy matching for typo tolerance
  private static fuzzyMatch(term: string, text: string): boolean {
    const words = text.split(/\s+/);
    return words.some(word => {
      if (Math.abs(word.length - term.length) > 2) return false;
      
      let differences = 0;
      const maxLength = Math.max(word.length, term.length);
      
      for (let i = 0; i < maxLength; i++) {
        if (word[i] !== term[i]) differences++;
        if (differences > 2) return false;
      }
      
      return differences <= 2;
    });
  }

  // Demand prediction based on historical data
  static predictDemand(
    category: string,
    location: string,
    historicalData: { category: string; location: string; rentals: number }[]
  ): number {
    const relevantData = historicalData.filter(
      d => d.category === category && d.location === location
    );

    if (relevantData.length === 0) return 50; // Default medium demand

    const avgRentals = relevantData.reduce((sum, d) => sum + d.rentals, 0) / relevantData.length;
    return Math.min(100, Math.round((avgRentals / 10) * 100));
  }
}
