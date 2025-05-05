
import { createContext, useState, useContext, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";

interface WishlistContextType {
  wishlist: number[];
  addToWishlist: (productId: number, productName: string) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const addToWishlist = (productId: number, productName: string) => {
    if (!wishlist.includes(productId)) {
      setWishlist([...wishlist, productId]);
      toast({
        title: "Added to Wishlist",
        description: `${productName} has been added to your wishlist. +10 XP!`,
      });
    }
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(wishlist.filter(id => id !== productId));
  };

  const isInWishlist = (productId: number) => {
    return wishlist.includes(productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist,
      clearWishlist 
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
