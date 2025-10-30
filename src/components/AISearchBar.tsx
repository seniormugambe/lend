import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { AIEngine, Equipment } from '@/utils/aiEngine';

interface AISearchBarProps {
  onSearch: (results: Equipment[]) => void;
  equipment: Equipment[];
}

export const AISearchBar = ({ onSearch, equipment }: AISearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const results = AIEngine.smartSearch(query, equipment);
      onSearch(results);
      setIsSearching(false);
    }, 300);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative flex items-center gap-2 w-full max-w-2xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="AI-powered search: Try 'construction tools in Lagos' or 'agricultural equipment'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-4 h-12 text-base"
        />
        <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary animate-pulse" />
      </div>
      <Button
        onClick={handleSearch}
        disabled={isSearching}
        variant="hero"
        className="h-12 px-6"
      >
        {isSearching ? 'Searching...' : 'Search'}
      </Button>
    </div>
  );
};
