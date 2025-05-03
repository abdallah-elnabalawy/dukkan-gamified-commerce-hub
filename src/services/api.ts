
import { supabase } from "@/integrations/supabase/client";
import { Product, Category, UserGameProfile, Challenge, Cart } from "@/lib/data";

// Product-related API functions
export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    try {
      // Instead of querying a non-existent table, we'll just import from data.ts for now
      const { products } = await import('@/lib/data');
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      const { products } = await import('@/lib/data');
      return products;
    }
  },
  
  getProductById: async (id: number): Promise<Product | null> => {
    try {
      // For now, we'll use the local data
      const { products } = await import('@/lib/data');
      return products.find(p => p.id === id) || null;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      const { products } = await import('@/lib/data');
      return products.find(p => p.id === id) || null;
    }
  },
  
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      // For now, we'll use the local data
      const { products } = await import('@/lib/data');
      return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    } catch (error) {
      console.error(`Error fetching products in category ${category}:`, error);
      const { products } = await import('@/lib/data');
      return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
  }
};

// Category-related API functions
export const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    try {
      // For now, we'll use the local data
      const { categories } = await import('@/lib/data');
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      const { categories } = await import('@/lib/data');
      return categories;
    }
  }
};

// User profile and gamification-related API functions
export const userService = {
  getUserProfile: async (): Promise<UserGameProfile | null> => {
    try {
      // For now, we'll use the local data
      const { userGameProfile } = await import('@/lib/data');
      return userGameProfile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      const { userGameProfile } = await import('@/lib/data');
      return userGameProfile;
    }
  },
  
  getChallenges: async (): Promise<Challenge[]> => {
    try {
      // For now, we'll use the local data
      const { challenges } = await import('@/lib/data');
      return challenges;
    } catch (error) {
      console.error("Error fetching challenges:", error);
      const { challenges } = await import('@/lib/data');
      return challenges;
    }
  }
};

// Cart-related API functions
export const cartService = {
  getCart: async (): Promise<Cart | null> => {
    try {
      // For now, we'll use the local data
      const { cart } = await import('@/lib/data');
      return cart;
    } catch (error) {
      console.error("Error fetching cart:", error);
      const { cart } = await import('@/lib/data');
      return cart;
    }
  },
  
  addToCart: async (productId: number, quantity: number): Promise<void> => {
    // In a real app, this would update Supabase
    console.log(`Adding product ${productId} to cart with quantity ${quantity}`);
    // For now, we'll just log and not update the mock data
  },
  
  updateCartItem: async (productId: number, quantity: number): Promise<void> => {
    console.log(`Updating cart item ${productId} with quantity ${quantity}`);
    // For now, we'll just log and not update the mock data
  },
  
  removeFromCart: async (productId: number): Promise<void> => {
    console.log(`Removing product ${productId} from cart`);
    // For now, we'll just log and not update the mock data
  }
};

// Order-related functions
export const orderService = {
  placeOrder: async (cartItems: Cart): Promise<{ orderId: string }> => {
    // Simulate placing an order
    console.log('Placing order for: ', cartItems);
    
    // In a real app, this would create an order in Supabase and clear the cart
    return {
      orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
  }
};

// Payment-related functions
export const paymentService = {
  processPayment: async (
    amount: number, 
    paymentMethod: string, 
    cardDetails?: {
      cardNumber: string;
      expiryDate: string;
      cvv: string;
      cardholderName: string;
    }
  ): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
    // Simulate payment processing
    console.log(`Processing payment of $${amount} via ${paymentMethod}`);
    
    // Simulate a successful payment
    if (paymentMethod === 'credit-card' && cardDetails) {
      console.log('Processing credit card payment with details:', 
        { ...cardDetails, cardNumber: cardDetails.cardNumber.slice(-4).padStart(16, '*') });
    }
    
    // In a real app, this would integrate with a payment gateway
    return {
      success: true,
      transactionId: `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
  }
};
