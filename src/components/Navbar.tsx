import { Button } from "./ui/button";
import { Menu, User } from "lucide-react";
import { HederaWalletConnect } from "./HederaWalletConnect";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-warm flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">E</span>
            </div>
            <span className="font-bold text-xl bg-gradient-warm bg-clip-text text-transparent">
              EquipRent Africa
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Browse</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Categories</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">How It Works</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">About</a>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2"
              onClick={() => navigate('/profile')}
            >
              <User className="h-4 w-4" />
              Profile
            </Button>
            <HederaWalletConnect />
            <Button variant="hero">List Equipment</Button>
          </div>
          
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};
