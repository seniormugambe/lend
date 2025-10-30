import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { UserProfile } from '@/components/UserProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { hederaService } from '@/utils/hedera';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Shield } from 'lucide-react';

const Profile = () => {
  const [searchParams] = useSearchParams();
  const accountId = searchParams.get('account');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [hasIdentity, setHasIdentity] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: 'renter' as 'renter' | 'owner' | 'both',
    location: ''
  });

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    const connected = hederaService.isConnected();
    setIsConnected(connected);
    
    if (connected && !accountId) {
      const identity = await hederaService.getIdentity();
      setHasIdentity(!!identity);
    }
  };

  const handleRegisterIdentity = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your Hedera wallet first",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsRegistering(true);
      const result = await hederaService.registerIdentity(
        '0.0.123456', // Demo contract ID
        formData
      );

      if (result.success) {
        toast({
          title: "Identity Registered",
          description: "Your on-chain identity has been created successfully",
        });
        setHasIdentity(true);
        
        // Reload to show the profile
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 gap-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        {accountId || hasIdentity ? (
          <UserProfile accountId={accountId || undefined} />
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Register Your On-Chain Identity
              </CardTitle>
              <CardDescription>
                Create your verified identity on the Hedera blockchain to start renting or listing equipment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isConnected ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Please connect your Hedera wallet to register your identity
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Use the "Connect Wallet" button in the navigation bar
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegisterIdentity} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userType">User Type *</Label>
                    <Select
                      value={formData.userType}
                      onValueChange={(value: any) => setFormData({ ...formData, userType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="renter">Renter - I want to rent equipment</SelectItem>
                        <SelectItem value="owner">Owner - I want to list my equipment</SelectItem>
                        <SelectItem value="both">Both - I want to rent and list</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      variant="hero"
                      disabled={isRegistering}
                    >
                      {isRegistering ? 'Registering...' : 'Register Identity on Hedera'}
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    Your identity will be securely stored on the Hedera blockchain and can be verified by other users
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
