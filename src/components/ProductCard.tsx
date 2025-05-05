
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAddToCart } from "@/hooks/useCart";
import { useWishlist } from "@/contexts/WishlistContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { mutate: addToCart } = useAddToCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = () => {
    addToCart({ productId: product.id, quantity: 1 }, {
      onSuccess: () => {
        toast({
          title: "Added to Cart",
          description: `${product.name} has been added to your cart. +${product.gamificationPoints} XP!`,
        });
      }
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id, product.name);
    }
  };

  return (
    <div className="group border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden">
        <div className="h-60 bg-gray-100 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover h-full w-full transition-transform group-hover:scale-105 duration-300"
            onError={(e) => {
              // Fallback image if the product image fails to load
              e.currentTarget.src = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=320";
            }}
          />
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button 
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full shadow-md transition-colors duration-200 ${
              isInWishlist(product.id) 
                ? "bg-dukkan-purple text-white" 
                : "bg-white hover:bg-dukkan-purple hover:text-white"
            }`}
          >
            <Heart className="h-4 w-4" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge variant="secondary" className="bg-dukkan-navy/80 text-white text-xs">
            {product.category}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`} className="group-hover:text-dukkan-purple transition-colors">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2">{product.name}</h3>
          </Link>
        </div>
        
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
              ★
            </span>
          ))}
          <span className="text-xs text-gray-600 ml-1">({product.reviewCount})</span>
        </div>
        
        <div className="flex items-start justify-between mt-3">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <div className="flex items-center gap-1 text-xs text-dukkan-purple">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>+{product.gamificationPoints} pts</span>
          </div>
        </div>
        
        <Button 
          onClick={handleAddToCart}
          className="w-full mt-4 bg-dukkan-purple hover:bg-dukkan-purple/90 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
