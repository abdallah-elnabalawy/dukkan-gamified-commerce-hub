
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ShoppingCart, Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/lib/data";
import { useAddToCart } from "@/hooks/useCart";
import { toast } from "@/components/ui/use-toast";

export default function Wishlist() {
  const [searchQuery, setSearchQuery] = useState("");
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { mutate: addToCart } = useAddToCart();
  
  // Get wishlist products
  const wishlistProducts = products.filter(product => wishlist.includes(product.id));
  
  // Filter by search query
  const filteredProducts = wishlistProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddToCart = (productId: number, productName: string, gamificationPoints: number) => {
    addToCart({ productId, quantity: 1 }, {
      onSuccess: () => {
        toast({
          title: "Added to Cart",
          description: `${productName} has been added to your cart. +${gamificationPoints} XP!`,
        });
      }
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={setSearchQuery} />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link to="/">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-gray-700">Wishlist</span>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          {wishlistProducts.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearWishlist}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all">
                <div className="flex h-40 md:h-56">
                  <div className="w-1/3 bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=320";
                      }}
                    />
                  </div>
                  <div className="w-2/3 p-4 flex flex-col justify-between">
                    <div>
                      <Link to={`/product/${product.id}`} className="hover:text-dukkan-purple">
                        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      </Link>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-2">{product.description}</p>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                        <span className="text-xs text-gray-600 ml-1">({product.reviewCount})</span>
                      </div>
                      <div className="font-bold text-lg">${product.price.toFixed(2)}</div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <Button 
                        onClick={() => handleAddToCart(product.id, product.name, product.gamificationPoints)}
                        className="flex-1 bg-dukkan-purple hover:bg-dukkan-purple/90 flex items-center justify-center gap-1"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => removeFromWishlist(product.id)}
                        variant="outline"
                        size="icon"
                        className="h-9 w-9"
                      >
                        <Heart className="h-4 w-4 fill-dukkan-purple text-dukkan-purple" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Browse our products and add your favorite items to your wishlist
            </p>
            <Link to="/products">
              <Button>
                Browse Products
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
