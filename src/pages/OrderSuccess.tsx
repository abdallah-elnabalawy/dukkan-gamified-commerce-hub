
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, ChevronRight, MapPin, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GamificationBar from "@/components/GamificationBar";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const orderId = query.get("orderId");
  const [countdown, setCountdown] = useState(10);
  const { data: userProfile } = useUserProfile();
  
  // Redirect to home if no orderId found
  useEffect(() => {
    if (!orderId) {
      navigate("/");
    }
  }, [orderId, navigate]);
  
  // Start countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Redirect after countdown
  useEffect(() => {
    if (countdown === 0) {
      navigate("/");
    }
  }, [countdown, navigate]);
  
  if (!orderId) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <a href="/" className="hover:text-gray-700">Home</a>
            <ChevronRight className="h-4 w-4" />
            <a href="/checkout" className="hover:text-gray-700">Checkout</a>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-gray-700">Order Confirmation</span>
          </div>
          
          <div className="bg-white rounded-lg border shadow-sm p-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center justify-center text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
              <p className="text-gray-600 mb-2">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>
              <p className="font-semibold">Order ID: #{orderId}</p>
            </div>
            
            {userProfile && (
              <div className="mb-8">
                <h3 className="font-semibold text-center mb-3">You just earned points!</h3>
                <GamificationBar 
                  level={userProfile.level}
                  currentXP={userProfile.currentXP} 
                  xpToNextLevel={userProfile.xpToNextLevel}
                />
              </div>
            )}
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-md p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-dukkan-purple mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Estimated Delivery</h3>
                    <p className="text-gray-600">May 8th - May 12th, 2025</p>
                    <p className="text-sm text-gray-500 mt-1">
                      You will receive a shipping confirmation email with tracking details soon.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-md p-4">
                <div className="flex items-start gap-3">
                  <ShoppingBag className="h-5 w-5 text-dukkan-purple mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Order Details</h3>
                    <p className="text-gray-600">
                      You can view your order details in your account dashboard under "Order History".
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild>
                <a href="/">Continue Shopping</a>
              </Button>
              
              <Button variant="outline">
                View Order Details
              </Button>
            </div>
            
            <div className="text-center mt-8 text-sm text-gray-500">
              Redirecting to home in {countdown} seconds...
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
