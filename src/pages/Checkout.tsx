
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CreditCard, 
  Lock, 
  ChevronRight, 
  ChevronsRight, 
  AlertCircle, 
  Check, 
  ShieldCheck,
  Wallet 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { orderService, paymentService } from "@/services/api";

type DeliveryMethod = "standard" | "express" | "same-day";
type PaymentMethod = "credit-card" | "paypal" | "google-pay" | "apple-pay";

export default function Checkout() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: cartData, isLoading: cartLoading } = useCart();

  // Form states
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("standard");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"shipping" | "payment" | "review">("shipping");

  // Form data
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Functions to update form data
  const updateShippingInfo = (field: string, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const updatePaymentInfo = (field: string, value: string) => {
    setPaymentInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Delivery costs
  const deliveryCosts = {
    standard: 0,
    express: 9.99,
    "same-day": 19.99,
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === "shipping") {
      setStep("payment");
      return;
    }
    
    if (step === "payment") {
      setStep("review");
      return;
    }
    
    // If we're on the review step, process the payment
    try {
      setIsProcessing(true);
      
      // Process payment
      const paymentResult = await paymentService.processPayment(
        cartData?.total || 0,
        paymentMethod,
        paymentMethod === "credit-card" ? paymentInfo : undefined
      );
      
      if (!paymentResult.success) {
        throw new Error(paymentResult.error || "Payment failed");
      }
      
      // Place order
      const orderResult = await orderService.placeOrder(cartData!);
      
      // Show success toast
      toast({
        title: "Order placed successfully!",
        description: `Your order #${orderResult.orderId} has been placed. You earned ${cartData?.potentialPoints} points!`,
      });
      
      // Navigate to success page
      navigate(`/order-success?orderId=${orderResult.orderId}`);
    } catch (error) {
      console.error("Error processing order:", error);
      toast({
        title: "Error processing order",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // If cart is loading, show loading state
  if (cartLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-dukkan-purple border-r-dukkan-purple border-b-transparent border-l-transparent mb-4"></div>
            <p>Loading checkout...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // If cart is empty, redirect to cart page
  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-gray-50 rounded-lg p-8 max-w-lg mx-auto">
              <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add items to your cart before proceeding to checkout.</p>
              <Button asChild>
                <a href="/products">Continue Shopping</a>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate totals
  const subtotal = cartData.subtotal;
  const tax = cartData.tax;
  const deliveryCost = deliveryCosts[deliveryMethod];
  const total = subtotal + tax + deliveryCost;

  // Prepare order summary component
  const OrderSummary = () => (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>
          {cartData.items.length} {cartData.items.length === 1 ? "item" : "items"} in cart
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {cartData.items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm">
              <span className="line-clamp-1">
                {item.quantity} x {item.product.name}
              </span>
              <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <Separator />
        
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery</span>
            <span>{deliveryCost === 0 ? "Free" : `$${deliveryCost.toFixed(2)}`}</span>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <div className="flex items-center gap-2 text-green-700 text-sm">
            <Check className="h-4 w-4" />
            <span>You will earn <strong>{cartData.potentialPoints} points</strong> with this purchase!</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <a href="/" className="hover:text-gray-700">Home</a>
            <ChevronRight className="h-4 w-4" />
            <a href="/cart" className="hover:text-gray-700">Cart</a>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-gray-700">Checkout</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          {/* Checkout Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center w-full max-w-3xl">
              <div className={`flex flex-col items-center flex-1 ${step === "shipping" ? "text-dukkan-purple" : "text-gray-500"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step === "shipping" ? "bg-dukkan-purple text-white" : "bg-gray-200 text-gray-700"}`}>
                  1
                </div>
                <span className="text-xs font-medium">Shipping</span>
              </div>
              
              <div className="flex-1 h-0.5 bg-gray-200 relative">
                {step !== "shipping" && <div className="absolute inset-0 bg-dukkan-purple" style={{ width: "100%" }}></div>}
              </div>
              
              <div className={`flex flex-col items-center flex-1 ${step === "payment" ? "text-dukkan-purple" : step === "shipping" ? "text-gray-500" : "text-gray-500"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step === "payment" ? "bg-dukkan-purple text-white" : step === "review" ? "bg-dukkan-purple text-white" : "bg-gray-200 text-gray-700"}`}>
                  2
                </div>
                <span className="text-xs font-medium">Payment</span>
              </div>
              
              <div className="flex-1 h-0.5 bg-gray-200 relative">
                {step === "review" && <div className="absolute inset-0 bg-dukkan-purple" style={{ width: "100%" }}></div>}
              </div>
              
              <div className={`flex flex-col items-center flex-1 ${step === "review" ? "text-dukkan-purple" : "text-gray-500"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step === "review" ? "bg-dukkan-purple text-white" : "bg-gray-200 text-gray-700"}`}>
                  3
                </div>
                <span className="text-xs font-medium">Review</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {/* Shipping Step */}
              {step === "shipping" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                    <CardDescription>Enter your shipping details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={shippingInfo.fullName}
                          onChange={(e) => updateShippingInfo("fullName", e.target.value)}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={shippingInfo.address}
                          onChange={(e) => updateShippingInfo("address", e.target.value)}
                          placeholder="123 Main St"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={shippingInfo.city}
                            onChange={(e) => updateShippingInfo("city", e.target.value)}
                            placeholder="City"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={shippingInfo.state}
                            onChange={(e) => updateShippingInfo("state", e.target.value)}
                            placeholder="State"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input
                          id="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={(e) => updateShippingInfo("zipCode", e.target.value)}
                          placeholder="12345"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) => updateShippingInfo("phone", e.target.value)}
                          placeholder="(555) 123-4567"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => updateShippingInfo("email", e.target.value)}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                      <h3 className="font-semibold">Delivery Method</h3>
                      <RadioGroup
                        value={deliveryMethod}
                        onValueChange={(value) => setDeliveryMethod(value as DeliveryMethod)}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard" className="cursor-pointer">
                              <div>
                                <p className="font-medium">Standard Delivery</p>
                                <p className="text-sm text-gray-500">5-7 business days</p>
                              </div>
                            </Label>
                          </div>
                          <div className="font-semibold">Free</div>
                        </div>
                        
                        <div className="flex items-center justify-between space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="express" id="express" />
                            <Label htmlFor="express" className="cursor-pointer">
                              <div>
                                <p className="font-medium">Express Delivery</p>
                                <p className="text-sm text-gray-500">2-3 business days</p>
                              </div>
                            </Label>
                          </div>
                          <div className="font-semibold">$9.99</div>
                        </div>
                        
                        <div className="flex items-center justify-between space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="same-day" id="same-day" />
                            <Label htmlFor="same-day" className="cursor-pointer">
                              <div>
                                <p className="font-medium">Same Day Delivery</p>
                                <p className="text-sm text-gray-500">Today (order before 2pm)</p>
                              </div>
                            </Label>
                          </div>
                          <div className="font-semibold">$19.99</div>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button type="submit">
                      Continue to Payment <ChevronsRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              {/* Payment Step */}
              {step === "payment" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Select your preferred payment method</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="credit-card">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Card
                        </TabsTrigger>
                        <TabsTrigger value="paypal">
                          <span className="text-blue-500 font-semibold">Pay</span>
                          <span className="text-blue-700 font-semibold">Pal</span>
                        </TabsTrigger>
                        <TabsTrigger value="google-pay">
                          <span className="flex items-center gap-1">
                            <span className="text-blue-500 font-semibold">G</span>
                            Pay
                          </span>
                        </TabsTrigger>
                        <TabsTrigger value="apple-pay">
                          <span className="flex items-center gap-1">
                            <span>Apple</span>
                            Pay
                          </span>
                        </TabsTrigger>
                      </TabsList>
                      
                      {/* Credit Card Form */}
                      <TabsContent value="credit-card" className="space-y-4 pt-4">
                        <div>
                          <Label htmlFor="cardholderName">Cardholder Name</Label>
                          <Input
                            id="cardholderName"
                            value={paymentInfo.cardholderName}
                            onChange={(e) => updatePaymentInfo("cardholderName", e.target.value)}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="relative">
                            <Input
                              id="cardNumber"
                              value={paymentInfo.cardNumber}
                              onChange={(e) => {
                                // Only allow digits and limit to 16
                                const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                                updatePaymentInfo("cardNumber", value);
                              }}
                              placeholder="1234 5678 9012 3456"
                              required
                              className="pr-12"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <CreditCard className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              value={paymentInfo.expiryDate}
                              onChange={(e) => {
                                // Format as MM/YY
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length > 2) {
                                  value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                                }
                                updatePaymentInfo("expiryDate", value);
                              }}
                              placeholder="MM/YY"
                              maxLength={5}
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              type="password"
                              value={paymentInfo.cvv}
                              onChange={(e) => {
                                // Only allow digits and limit to 4
                                const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                                updatePaymentInfo("cvv", value);
                              }}
                              placeholder="123"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                          <Lock className="h-4 w-4" />
                          <span>Your payment information is encrypted and secure.</span>
                        </div>
                      </TabsContent>
                      
                      {/* PayPal */}
                      <TabsContent value="paypal" className="pt-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                          <div className="text-2xl font-bold mb-2">
                            <span className="text-blue-500">Pay</span>
                            <span className="text-blue-700">Pal</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">
                            You will be redirected to PayPal to complete the payment.
                          </p>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">
                            Continue with PayPal
                          </Button>
                        </div>
                      </TabsContent>
                      
                      {/* Google Pay */}
                      <TabsContent value="google-pay" className="pt-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                          <div className="flex items-center justify-center gap-1 text-2xl font-bold mb-2">
                            <span className="text-blue-500">G</span>
                            <span>Pay</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">
                            Pay quickly and securely with Google Pay.
                          </p>
                          <Button className="w-full bg-white text-black border border-gray-300 hover:bg-gray-50">
                            <svg className="w-6 h-6 mr-2" viewBox="0 0 48 48">
                              <path fill="#4285F4" d="M24 10v8.6h11.8c-.5 2.8-2 5.2-4.3 6.8v5.7h7c4.1-3.8 6.5-9.5 6.5-16.1 0-1.6-.1-3.1-.4-4.6H24z" />
                              <path fill="#34A853" d="M24 44c5.8 0 10.7-1.9 14.3-5.2l-7-5.4c-1.9 1.3-4.4 2.1-7.3 2.1-5.6 0-10.4-3.8-12.1-8.9h-7.2v5.5C8.7 39.1 15.8 44 24 44z" />
                              <path fill="#FBBC05" d="M11.9 26.6c-.4-1.3-.7-2.7-.7-4.1 0-1.4.3-2.8.7-4.1v-5.5H4.7C3.1 15.8 2 19.8 2 24s1.1 8.2 2.7 11.1l7.2-5.5z" />
                              <path fill="#EA4335" d="M24 10.4c3.2 0 6 1.1 8.2 3.2l6.2-6.2C34.6 3.9 29.7 2 24 2 15.8 2 8.7 6.9 4.7 14l7.2 5.5c1.7-5.1 6.5-8.9 12.1-8.9z" />
                            </svg>
                            Pay with Google
                          </Button>
                        </div>
                      </TabsContent>
                      
                      {/* Apple Pay */}
                      <TabsContent value="apple-pay" className="pt-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                          <div className="flex items-center justify-center text-2xl font-bold mb-2">
                            <span>Apple Pay</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">
                            Pay quickly and securely with Apple Pay.
                          </p>
                          <Button className="w-full bg-black text-white hover:bg-gray-900">
                            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none">
                              <path d="M17.5 12.5C17.5 10.7 19 9.2 21 8.5C20.3 6.6 18.8 6 17.5 6C16 6 15 6.8 14.2 6.8C13.3 6.8 12.2 6 11 6C9 6 7 7.5 7 10.5C7 12 7.5 13.6 8.2 14.8C8.8 15.8 9.3 16.5 10 16.5C10.7 16.5 11.1 16 12 16C12.9 16 13.3 16.5 14.1 16.5C14.8 16.5 15.4 15.7 16 14.7C16.5 13.9 16.7 13.2 16.7 13.1M13 4.8C13.5 4.2 14 3.5 14 2.5C13.1 2.6 12 3.2 11.5 3.8C11 4.4 10.5 5.1 10.5 6C11.5 6 12.5 5.4 13 4.8Z" fill="currentColor" />
                            </svg>
                            Pay with Apple
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setStep("shipping")}
                    >
                      Back
                    </Button>
                    <Button type="submit">
                      Review Order <ChevronsRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              {/* Review Step */}
              {step === "review" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Review Order</CardTitle>
                    <CardDescription>Please review your order before confirming</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Shipping Information</h3>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="font-medium">{shippingInfo.fullName}</p>
                        <p>{shippingInfo.address}</p>
                        <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                        <p>{shippingInfo.phone}</p>
                        <p>{shippingInfo.email}</p>
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Delivery Method: </span>
                          {deliveryMethod === "standard" && "Standard (5-7 business days)"}
                          {deliveryMethod === "express" && "Express (2-3 business days)"}
                          {deliveryMethod === "same-day" && "Same Day (Today)"}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Payment Method</h3>
                      <div className="bg-gray-50 p-3 rounded-md">
                        {paymentMethod === "credit-card" && (
                          <div>
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-5 w-5" />
                              <span className="font-medium">Credit Card</span>
                            </div>
                            <p>{paymentInfo.cardholderName}</p>
                            <p>**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                            <p>Expires: {paymentInfo.expiryDate}</p>
                          </div>
                        )}
                        
                        {paymentMethod === "paypal" && (
                          <div className="flex items-center gap-2">
                            <span className="text-blue-500 font-bold">Pay</span>
                            <span className="text-blue-700 font-bold">Pal</span>
                            <span>Account</span>
                          </div>
                        )}
                        
                        {paymentMethod === "google-pay" && (
                          <div className="flex items-center gap-2">
                            <span className="text-blue-500 font-bold">G</span>
                            <span className="font-bold">Pay</span>
                          </div>
                        )}
                        
                        {paymentMethod === "apple-pay" && (
                          <div className="flex items-center gap-2">
                            <span className="font-bold">Apple Pay</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Order Items ({cartData.items.length})</h3>
                      <div className="bg-gray-50 p-3 rounded-md space-y-3">
                        {cartData.items.map((item) => (
                          <div key={item.productId} className="flex gap-3 items-center">
                            <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium line-clamp-1">{item.product.name}</p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                            <div className="font-medium">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-dukkan-purple/5 p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Tax:</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Delivery:</span>
                        <span>{deliveryCost === 0 ? "Free" : `$${deliveryCost.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg mt-2">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-md p-3">
                      <div className="flex items-center gap-2 text-green-700 text-sm">
                        <ShieldCheck className="h-4 w-4" />
                        <span>
                          Your payment and personal information are protected by secure encryption.
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep("payment")}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="bg-dukkan-purple hover:bg-dukkan-purple/90"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Place Order <Wallet className="h-4 w-4 ml-1" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
            
            {/* Order Summary (Right Side) */}
            <div className="md:col-span-1">
              <OrderSummary />
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
