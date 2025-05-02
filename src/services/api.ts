
import { supabase } from "@/integrations/supabase/client";
import { Product, Category, UserGameProfile, Challenge, Cart } from "@/lib/data";

// Product-related API functions
export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    // In a real app, this would fetch from Supabase
    // For now, we'll import from data.ts
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) {
      console.error("Error fetching products:", error);
      // Fall back to local data
      const { products } = await import('@/lib/data');
      return products;
    }
    
    return data as Product[];
  },
  
  getProductById: async (id: number): Promise<Product | null> => {
    // In a real app, this would fetch from Supabase
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      // Fall back to local data
      const { products } = await import('@/lib/data');
      return products.find(p => p.id === id) || null;
    }
    
    return data as Product;
  },
  
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    // In a real app, this would fetch from Supabase
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category);
    
    if (error) {
      console.error(`Error fetching products in category ${category}:`, error);
      // Fall back to local data
      const { products } = await import('@/lib/data');
      return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    
    return data as Product[];
  }
};

// Category-related API functions
export const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    // In a real app, this would fetch from Supabase
    const { data, error } = await supabase
      .from('categories')
      .select('*');
    
    if (error) {
      console.error("Error fetching categories:", error);
      // Fall back to local data
      const { categories } = await import('@/lib/data');
      return categories;
    }
    
    return data as Category[];
  }
};

// User profile and gamification-related API functions
export const userService = {
  getUserProfile: async (): Promise<UserGameProfile | null> => {
    // In a real app, this would fetch from Supabase based on authenticated user
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .single();
    
    if (error) {
      console.error("Error fetching user profile:", error);
      // Fall back to local data
      const { userGameProfile } = await import('@/lib/data');
      return userGameProfile;
    }
    
    return data as UserGameProfile;
  },
  
  getChallenges: async (): Promise<Challenge[]> => {
    // In a real app, this would fetch from Supabase based on authenticated user
    const { data, error } = await supabase
      .from('challenges')
      .select('*');
    
    if (error) {
      console.error("Error fetching challenges:", error);
      // Fall back to local data
      const { challenges } = await import('@/lib/data');
      return challenges;
    }
    
    return data as Challenge[];
  }
};

// Cart-related API functions
export const cartService = {
  getCart: async (): Promise<Cart | null> => {
    // In a real app, this would fetch from Supabase based on authenticated user
    const { data, error } = await supabase
      .from('carts')
      .select('*, items:cart_items(*, product:products(*))')
      .single();
    
    if (error) {
      console.error("Error fetching cart:", error);
      // Fall back to local data
      const { cart } = await import('@/lib/data');
      return cart;
    }
    
    return data as unknown as Cart;
  },
  
  addToCart: async (productId: number, quantity: number): Promise<void> => {
    // In a real app, this would update Supabase
    console.log(`Adding product ${productId} to cart with quantity ${quantity}`);
    // For now, we'll just log and not update the mock data
  }
};
