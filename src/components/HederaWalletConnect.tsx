import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Wallet, LogOut } from 'lucide-react';
import { hederaService } from '@/utils/hedera';
import { useToast } from './ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const HederaWalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [accountId, setAccountId] = useState<string>('');
  const [showPairingDialog, setShowPairingDialog] = useState(false);
  const [pairingString, setPairingString] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    initializeHedera();
  }, []);

  const initializeHedera = async () => {
    try {
      await hederaService.init();
      console.log('Hedera service initialized');
    } catch (error) {
      console.error('Failed to initialize Hedera:', error);
    }
  };

  const handleConnect = async () => {
    try {
      await hederaService.connectWallet();
      
      // Wait for pairing event
      setTimeout(() => {
        const pairingData = hederaService.getPairingData();
        if (pairingData && pairingData.accountIds && pairingData.accountIds.length > 0) {
          setAccountId(pairingData.accountIds[0]);
          setIsConnected(true);
          toast({
            title: "Wallet Connected",
            description: `Connected to ${pairingData.accountIds[0]}`,
          });
        }
      }, 1000);
    } catch (error) {
      console.error('Connection failed:', error);
      toast({
        title: "Connection Failed",
        description: "Please make sure you have HashPack wallet installed",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = async () => {
    try {
      await hederaService.disconnect();
      setIsConnected(false);
      setAccountId('');
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected",
      });
    } catch (error) {
      console.error('Disconnect failed:', error);
    }
  };

  return (
    <>
      {!isConnected ? (
        <Button onClick={handleConnect} variant="hero" className="gap-2">
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden md:inline">
            {accountId.slice(0, 8)}...{accountId.slice(-6)}
          </span>
          <Button onClick={handleDisconnect} variant="outline" size="sm" className="gap-2">
            <LogOut className="h-4 w-4" />
            Disconnect
          </Button>
        </div>
      )}

      <Dialog open={showPairingDialog} onOpenChange={setShowPairingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pair with Mobile Wallet</DialogTitle>
            <DialogDescription>
              Scan this pairing string with your HashPack mobile app
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-secondary rounded-lg break-all text-sm">
            {pairingString}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
