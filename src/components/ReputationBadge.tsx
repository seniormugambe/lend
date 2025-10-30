import { Shield, Star, Award, CheckCircle2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

interface ReputationBadgeProps {
  score: number;
  totalRatings: number;
  averageRating: number;
  isVerified?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const ReputationBadge = ({
  score,
  totalRatings,
  averageRating,
  isVerified = false,
  size = 'md',
  showDetails = true
}: ReputationBadgeProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-muted-foreground';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { label: 'Elite', variant: 'default' as const };
    if (score >= 70) return { label: 'Trusted', variant: 'secondary' as const };
    if (score >= 50) return { label: 'Verified', variant: 'outline' as const };
    return { label: 'New', variant: 'outline' as const };
  };

  const scoreBadge = getScoreBadge(score);
  
  const iconSize = size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5';
  const textSize = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base';

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {isVerified && (
        <div className="flex items-center gap-1 text-green-600">
          <CheckCircle2 className={iconSize} />
          <span className={cn('font-medium', textSize)}>Verified</span>
        </div>
      )}
      
      <div className="flex items-center gap-1">
        <Shield className={cn(iconSize, getScoreColor(score))} />
        <span className={cn('font-bold', textSize, getScoreColor(score))}>
          {score}
        </span>
      </div>

      {totalRatings > 0 && (
        <div className="flex items-center gap-1">
          <Star className={cn(iconSize, 'fill-amber-400 text-amber-400')} />
          <span className={cn('font-medium', textSize)}>
            {averageRating.toFixed(1)}
          </span>
          {showDetails && (
            <span className={cn('text-muted-foreground', textSize)}>
              ({totalRatings})
            </span>
          )}
        </div>
      )}

      <Badge variant={scoreBadge.variant} className="gap-1">
        <Award className={cn(iconSize)} />
        {scoreBadge.label}
      </Badge>
    </div>
  );
};
