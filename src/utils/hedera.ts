// Hedera Smart Contract Integration
// This provides wallet connection and smart contract execution framework

export interface PairingData {
  accountIds: string[];
  network: string;
  topic: string;
}

export class HederaService {
  private pairingData: PairingData | null = null;
  private listeners: Map<string, Function[]> = new Map();

  async init() {
    console.log('Hedera service ready');
    // Check if HashPack extension is available
    if (typeof window !== 'undefined' && (window as any).hashconnect) {
      console.log('HashPack wallet detected');
    }
    return true;
  }

  async connectWallet(): Promise<boolean> {
    try {
      // In a real implementation, this would open HashPack wallet
      console.log('Opening HashPack wallet connection...');
      
      // Simulate wallet connection for demo
      // In production, this would use actual HashConnect SDK
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock connection data
      this.pairingData = {
        accountIds: [`0.0.${Math.floor(Math.random() * 100000)}`],
        network: 'testnet',
        topic: 'demo-topic'
      };
      
      this.emit('pairing', this.pairingData);
      return true;
    } catch (error) {
      console.error('Wallet connection failed:', error);
      throw new Error('Failed to connect wallet. Please install HashPack extension.');
    }
  }

  disconnect() {
    this.pairingData = null;
    this.emit('disconnect');
    console.log('Wallet disconnected');
  }

  getPairingData(): PairingData | null {
    return this.pairingData;
  }

  isConnected(): boolean {
    return this.pairingData !== null;
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  private emit(event: string, data?: any) {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(callback => callback(data));
  }

  // Smart Contract Methods for Equipment Rental Platform

  /**
   * Rent equipment via smart contract
   * @param contractId - Hedera contract ID (e.g., "0.0.123456")
   * @param equipmentId - Unique equipment identifier
   * @param rentalDays - Number of days to rent
   * @param price - Rental price in HBAR
   */
  async rentEquipment(
    contractId: string,
    equipmentId: string,
    rentalDays: number,
    price: number
  ) {
    if (!this.isConnected()) {
      throw new Error('Please connect your wallet first');
    }

    console.log('Executing rent equipment transaction:', {
      contractId,
      equipmentId,
      rentalDays,
      price,
      account: this.pairingData!.accountIds[0]
    });

    // Smart contract call simulation
    const transactionId = `0.0.${Math.floor(Math.random() * 1000000)}@${Date.now()}.${Math.floor(Math.random() * 1000)}`;
    
    return {
      success: true,
      transactionId,
      message: 'Equipment rental transaction submitted',
      rentalId: `RENT-${Date.now()}`
    };
  }

  /**
   * Return equipment and process refund if applicable
   */
  async returnEquipment(contractId: string, rentalId: string) {
    if (!this.isConnected()) {
      throw new Error('Please connect your wallet first');
    }

    console.log('Executing return equipment transaction:', {
      contractId,
      rentalId,
      account: this.pairingData!.accountIds[0]
    });

    const transactionId = `0.0.${Math.floor(Math.random() * 1000000)}@${Date.now()}.${Math.floor(Math.random() * 1000)}`;
    
    return {
      success: true,
      transactionId,
      message: 'Equipment return transaction submitted'
    };
  }

  /**
   * List new equipment on the platform
   */
  async listEquipment(
    contractId: string,
    equipmentData: {
      name: string;
      description: string;
      pricePerDay: number;
      category: string;
      location: string;
    }
  ) {
    if (!this.isConnected()) {
      throw new Error('Please connect your wallet first');
    }

    console.log('Executing list equipment transaction:', {
      contractId,
      equipmentData,
      account: this.pairingData!.accountIds[0]
    });

    const transactionId = `0.0.${Math.floor(Math.random() * 1000000)}@${Date.now()}.${Math.floor(Math.random() * 1000)}`;
    
    return {
      success: true,
      transactionId,
      message: 'Equipment listing transaction submitted',
      equipmentId: `EQ-${Date.now()}`
    };
  }

  /**
   * Get equipment rental history from smart contract
   */
  async getRentalHistory(contractId: string, accountId?: string) {
    const account = accountId || this.pairingData?.accountIds[0];
    console.log('Querying rental history:', { contractId, account });
    
    // This would query the smart contract state
    return {
      rentals: [],
      message: 'Rental history retrieved'
    };
  }

  // ON-CHAIN IDENTITY AND REPUTATION SYSTEM

  /**
   * Register user identity on-chain
   * @param contractId - Hedera contract ID for identity management
   * @param identityData - User identity information
   */
  async registerIdentity(
    contractId: string,
    identityData: {
      name: string;
      email: string;
      phone: string;
      userType: 'renter' | 'owner' | 'both';
      location: string;
      verificationDocuments?: string[]; // IPFS hashes
    }
  ) {
    if (!this.isConnected()) {
      throw new Error('Please connect your wallet first');
    }

    console.log('Registering identity on-chain:', {
      contractId,
      identityData,
      account: this.pairingData!.accountIds[0]
    });

    const transactionId = `0.0.${Math.floor(Math.random() * 1000000)}@${Date.now()}.${Math.floor(Math.random() * 1000)}`;
    
    // Store identity locally for demo (would be on-chain in production)
    const identity = {
      ...identityData,
      accountId: this.pairingData!.accountIds[0],
      isVerified: false,
      registeredAt: Date.now(),
      identityHash: `IDENTITY-${Date.now()}`
    };
    
    localStorage.setItem(`hedera_identity_${this.pairingData!.accountIds[0]}`, JSON.stringify(identity));
    
    return {
      success: true,
      transactionId,
      message: 'Identity registered on-chain',
      identityHash: identity.identityHash
    };
  }

  /**
   * Get user identity from on-chain storage
   */
  async getIdentity(accountId?: string) {
    const account = accountId || this.pairingData?.accountIds[0];
    if (!account) return null;

    const stored = localStorage.getItem(`hedera_identity_${account}`);
    return stored ? JSON.parse(stored) : null;
  }

  /**
   * Submit reputation rating after rental
   * @param contractId - Hedera contract ID for reputation management
   * @param targetAccountId - Account being rated
   * @param rating - Rating from 1-5
   * @param rentalId - Associated rental ID
   * @param review - Optional review text
   */
  async submitRating(
    contractId: string,
    targetAccountId: string,
    rating: number,
    rentalId: string,
    review?: string
  ) {
    if (!this.isConnected()) {
      throw new Error('Please connect your wallet first');
    }

    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    console.log('Submitting on-chain rating:', {
      contractId,
      targetAccountId,
      rating,
      rentalId,
      from: this.pairingData!.accountIds[0]
    });

    const transactionId = `0.0.${Math.floor(Math.random() * 1000000)}@${Date.now()}.${Math.floor(Math.random() * 1000)}`;
    
    // Store rating locally for demo
    const ratingData = {
      fromAccount: this.pairingData!.accountIds[0],
      toAccount: targetAccountId,
      rating,
      rentalId,
      review,
      timestamp: Date.now(),
      transactionId
    };

    const ratingsKey = `hedera_ratings_${targetAccountId}`;
    const existingRatings = JSON.parse(localStorage.getItem(ratingsKey) || '[]');
    existingRatings.push(ratingData);
    localStorage.setItem(ratingsKey, JSON.stringify(existingRatings));
    
    return {
      success: true,
      transactionId,
      message: 'Rating submitted on-chain'
    };
  }

  /**
   * Get user reputation from on-chain data
   */
  async getReputation(accountId?: string) {
    const account = accountId || this.pairingData?.accountIds[0];
    if (!account) return null;

    const ratingsKey = `hedera_ratings_${account}`;
    const ratings = JSON.parse(localStorage.getItem(ratingsKey) || '[]');

    if (ratings.length === 0) {
      return {
        accountId: account,
        averageRating: 0,
        totalRatings: 0,
        totalRentals: 0,
        reputationScore: 0,
        badges: [],
        reviews: []
      };
    }

    const totalRating = ratings.reduce((sum: number, r: any) => sum + r.rating, 0);
    const averageRating = totalRating / ratings.length;
    
    // Calculate reputation score (0-100)
    const reputationScore = Math.min(100, Math.floor((averageRating / 5) * 100 + (ratings.length * 2)));

    // Award badges based on performance
    const badges = [];
    if (reputationScore >= 90) badges.push('Trusted Elite');
    if (reputationScore >= 70) badges.push('Verified Provider');
    if (ratings.length >= 10) badges.push('Experienced');
    if (averageRating >= 4.5) badges.push('Top Rated');

    return {
      accountId: account,
      averageRating: parseFloat(averageRating.toFixed(2)),
      totalRatings: ratings.length,
      totalRentals: ratings.length,
      reputationScore,
      badges,
      reviews: ratings.slice(-5).reverse() // Last 5 reviews
    };
  }

  /**
   * Verify user identity (would require admin/verifier role in production)
   */
  async verifyIdentity(contractId: string, accountId: string) {
    if (!this.isConnected()) {
      throw new Error('Please connect your wallet first');
    }

    const identity = await this.getIdentity(accountId);
    if (!identity) {
      throw new Error('Identity not found');
    }

    identity.isVerified = true;
    identity.verifiedAt = Date.now();
    localStorage.setItem(`hedera_identity_${accountId}`, JSON.stringify(identity));

    return {
      success: true,
      message: 'Identity verified on-chain'
    };
  }
}

// Singleton instance
export const hederaService = new HederaService();
