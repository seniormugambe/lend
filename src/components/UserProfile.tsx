import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ReputationBadge } from './ReputationBadge';
import { hederaService } from '@/utils/hedera';
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  Shield,
  Star,
  TrendingUp,
  Award
} from 'lucide-react';
import { Separator } from './ui/separator';

interface UserProfileProps {
  accountId?: string;
}

export const UserProfile = ({ accountId }: UserProfileProps) => {
  const [identity, setIdentity] = useState<any>(null);
  const [reputation, setReputation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, [accountId]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const [identityData, reputationData] = await Promise.all([
        hederaService.getIdentity(accountId),
        hederaService.getReputation(accountId)
      ]);
      
      setIdentity(identityData);
      setReputation(reputationData);
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-8 bg-muted rounded w-1/3"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!identity) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Not Found</CardTitle>
          <CardDescription>
            This user hasn't registered their on-chain identity yet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={loadUserData}>
            Refresh
          </Button>
        </CardContent>
      </Card>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="overflow-hidden">
      <div className="h-24 bg-gradient-warm"></div>
      <CardHeader className="relative pt-0">
        <div className="flex items-start gap-4 -mt-12">
          <Avatar className="h-24 w-24 border-4 border-background shadow-elegant">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${identity.accountId}`} />
            <AvatarFallback className="text-2xl font-bold">
              {getInitials(identity.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 pt-14">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{identity.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <User className="h-3 w-3" />
                  {identity.userType.charAt(0).toUpperCase() + identity.userType.slice(1)}
                </CardDescription>
              </div>
              
              {identity.isVerified && (
                <Badge variant="default" className="gap-1">
                  <Shield className="h-3 w-3" />
                  Verified Identity
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Reputation Section */}
        {reputation && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                On-Chain Reputation
              </h3>
              <ReputationBadge
                score={reputation.reputationScore}
                totalRatings={reputation.totalRatings}
                averageRating={reputation.averageRating}
                isVerified={identity.isVerified}
                size="md"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-secondary/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{reputation.reputationScore}</div>
                <div className="text-xs text-muted-foreground">Reputation Score</div>
              </div>
              <div className="text-center p-3 bg-secondary/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{reputation.totalRentals}</div>
                <div className="text-xs text-muted-foreground">Total Rentals</div>
              </div>
              <div className="text-center p-3 bg-secondary/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{reputation.averageRating.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">Avg Rating</div>
              </div>
            </div>

            {reputation.badges.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Achievement Badges
                </h4>
                <div className="flex flex-wrap gap-2">
                  {reputation.badges.map((badge: string, index: number) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <Separator />

        {/* Contact Information */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{identity.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{identity.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{identity.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined {new Date(identity.registeredAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Recent Reviews */}
        {reputation && reputation.reviews.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Recent Reviews</h3>
            <div className="space-y-3">
              {reputation.reviews.map((review: any, index: number) => (
                <div key={index} className="p-3 bg-secondary/50 rounded-lg space-y-1">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  {review.review && (
                    <p className="text-sm text-muted-foreground">{review.review}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blockchain Info */}
        <div className="p-3 bg-primary/5 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Hedera Account ID</div>
          <code className="text-xs font-mono">{identity.accountId}</code>
        </div>
      </CardContent>
    </Card>
  );
};
