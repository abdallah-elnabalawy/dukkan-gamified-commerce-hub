
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, Gift, CreditCard, Award } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart, useAddToCart } from "@/hooks/useCart";
import { cartService } from "@/services/api";

export default function Cart() {
  const navigate = useNavigate();
  const { data: cartData, isLoading } = useCart();
  const { mutate: addToCart } = useAddToCart();
  
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  
  // Calculate cart totals
  const subtotal = cartData?.subtotal || 0;
  const tax = cartData?.tax || 0;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + tax + shipping;
  
  // Calculate potential points to earn
  const potentialPoints = cartData?.potentialPoints || 0;
  
  // Progress to free shipping
  const progressToFreeShipping = subtotal >= 100 ? 100 : (subtotal / 100) * 100;
  
  // Update quantity
  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      await cartService.updateCartItem(productId, newQuantity);
      // In a real app, we'd invalidate the cart query here
      toast({
        title: "Cart Updated",
        description: "Your cart has been updated."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update cart.",
        variant: "destructive"
      });
    }
  };
  
  // Remove item from cart
  const removeItem = async (productId: number) => {
    try {
      await cartService.removeFromCart(productId);
      // In a real app, we'd invalidate the cart query here
      toast({
        title: "Item Removed",
        description: "The item has been removed from your cart."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item from cart.",
        variant: "destructive"
      });
    }
  };
  
  // Apply coupon code
  const applyCoupon = () => {
    setIsApplyingCoupon(true);
    
    setTimeout(() => {
      setIsApplyingCoupon(false);
      
      if (couponCode.toLowerCase() === "welcome10") {
        toast({
          title: "Coupon Applied!",
          description: "10% discount has been applied to your order. +25 points for using a coupon!",
        });
      } else {
        toast({
          title: "Invalid Coupon",
          description: "The coupon code is invalid or has expired.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  // Proceed to checkout
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  // If cart is loading, show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-dukkan-purple border-r-dukkan-purple border-b-transparent border-l-transparent mb-4"></div>
            <p>Loading your cart...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const cartItems = cartData?.items || [];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-gray-500 mt-1 mb-6">Add items to get started</p>
              <Button asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-semibold text-lg">Shopping Cart ({cartItems.length} items)</h2>
                      <Link to="/products" className="text-dukkan-purple text-sm hover:underline">
                        Continue Shopping
                      </Link>
                    </div>
                    
                    {/* Free shipping progress */}
                    {progressToFreeShipping < 100 && (
                      <div className="bg-dukkan-purple/5 rounded-lg p-3 mb-6">
                        <div className="flex justify-between text-sm mb-1.5">
                          <span>Progress to free shipping</span>
                          <span>${(100 - subtotal).toFixed(2)} away</span>
                        </div>
                        <Progress value={progressToFreeShipping} className="h-2" />
                      </div>
                    )}
                    
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <div key={item.productId} className="flex gap-4">
                          <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=120";
                              }}
                            />
                          </div>
                          
                          <div className="flex-1 flex flex-col">
                            <div className="flex justify-between">
                              <Link to={`/product/${item.productId}`} className="font-medium text-lg hover:text-dukkan-purple transition-colors">
                                {item.product.name}
                              </Link>
                              <button
                                onClick={() => removeItem(item.productId)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                            
                            <div className="text-sm text-gray-500 mb-2">
                              {item.product.category}
                            </div>
                            
                            <div className="flex items-center gap-1 mb-1 text-dukkan-purple text-sm">
                              <Award className="h-4 w-4" />
                              <span>+{item.product.gamificationPoints * item.quantity} points</span>
                            </div>
                            
                            <div className="mt-auto flex justify-between items-center">
                              <div className="flex items-center border rounded-md">
                                <button
                                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                  className="px-2 py-1 hover:bg-gray-100"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-1 border-x">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                  className="px-2 py-1 hover:bg-gray-100"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              
                              <div className="font-semibold">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Related Products */}
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">You might also like</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {cartData?.items[0]?.product && [1, 2, 3].map((i) => {
                      // Recommend products from the same category
                      const recommendedProduct = {
                        ...cartData.items[0].product,
                        id: 1000 + i,
                        name: `Recommended Product ${i}`,
                        price: Math.floor(Math.random() * 200) + 50
                      };
                      
                      return (
                        <div key={i} className="border rounded-lg overflow-hidden group">
                          <div className="h-36 bg-gray-100 overflow-hidden">
                            <img
                              src={recommendedProduct.image}
                              alt={recommendedProduct.name}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                              onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=120";
                              }}
                            />
                          </div>
                          <div className="p-3">
                            <h4 className="font-medium text-sm line-clamp-1">{recommendedProduct.name}</h4>
                            <div className="flex justify-between items-center mt-2">
                              <span className="font-semibold">${recommendedProduct.price.toFixed(2)}</span>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-xs h-8"
                                onClick={() => {
                                  addToCart({ productId: recommendedProduct.id, quantity: 1 });
                                  toast({
                                    title: "Added to Cart",
                                    description: `${recommendedProduct.name} has been added to your cart.`
                                  });
                                }}
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg border shadow-sm p-6">
                  <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-semibold text-lg mb-6">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                    <div className="flex items-center gap-2 text-green-800">
                      <Award className="h-5 w-5" />
                      <div>
                        <span className="font-semibold">You'll earn {potentialPoints} points</span>
                        <p className="text-xs text-green-700">Complete this purchase to level up faster!</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Coupon Code */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Apply Coupon</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button 
                        variant="outline" 
                        onClick={applyCoupon} 
                        disabled={!couponCode || isApplyingCoupon}
                      >
                        {isApplyingCoupon ? "Applying..." : "Apply"}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Try "WELCOME10" for 10% off</p>
                  </div>
                  
                  {/* Checkout Buttons */}
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-dukkan-purple hover:bg-dukkan-purple/90"
                      onClick={handleCheckout}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Proceed to Checkout
                    </Button>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">Or</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Gift className="h-4 w-4 mr-2" />
                      Add Gift Options
                    </Button>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium text-sm mb-3">We Accept</h3>
                    <div className="flex gap-2">
                      <div className="flex items-center justify-center w-10 h-6 bg-blue-600 rounded text-white text-xs">Visa</div>
                      <div className="flex items-center justify-center w-10 h-6 bg-red-500 rounded text-white text-xs">MC</div>
                      <div className="flex items-center justify-center w-10 h-6 bg-blue-700 rounded text-white text-xs">Amex</div>
                      <div className="flex items-center justify-center w-10 h-6 bg-yellow-400 rounded text-white text-xs">PP</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
