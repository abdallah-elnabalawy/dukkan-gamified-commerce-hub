
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, Share2, Award, Check, ChevronRight, Package, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import BadgeDisplay from "@/components/BadgeDisplay";
import { products, userGameProfile } from "@/lib/data";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = parseInt(id || "1");
  
  // Find product by ID, default to first product if not found
  const product = products.find(p => p.id === productId) || products[0];
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Similar products based on category (excluding current product)
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  // Simulate multiple product images
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=320",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=320",
  ];
  
  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart. +${product.gamificationPoints * quantity} XP!`,
    });
  };
  
  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist. +10 XP!`,
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Product Shared",
      description: "Share link copied to clipboard. +15 social points!",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm">
          <Link to="/" className="text-gray-500 hover:text-dukkan-purple">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-gray-400 mt-0.5" />
          <Link to="/products" className="text-gray-500 hover:text-dukkan-purple">Products</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-gray-400 mt-0.5" />
          <Link to={`/category/${product.category}`} className="text-gray-500 hover:text-dukkan-purple">{product.category}</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-gray-400 mt-0.5" />
          <span className="text-gray-900 font-medium truncate max-w-[150px]">{product.name}</span>
        </nav>
        
        {/* Product Detail */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-80 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=320";
                }}
              />
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  className={`border-2 rounded-md overflow-hidden w-16 h-16 flex-shrink-0 ${
                    selectedImage === index ? "border-dukkan-purple" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=320";
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-4">
              <Badge variant="outline" className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
              
              <div className="text-3xl font-bold mb-4">${product.price.toFixed(2)}</div>
              
              <div className="bg-dukkan-purple/5 border border-dukkan-purple/20 rounded-lg p-3 mb-6 flex items-center gap-3">
                <Award className="h-5 w-5 text-dukkan-purple" />
                <div>
                  <p className="font-medium text-dukkan-purple">Earn {product.gamificationPoints} points per item</p>
                  <p className="text-xs text-gray-600">Points help you level up and unlock exclusive rewards</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center border rounded-md w-32">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <div className="px-4 py-2 border-x text-center flex-1">{quantity}</div>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {product.stock} items available
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-dukkan-purple hover:bg-dukkan-purple/90"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              
              <Button
                variant="outline"
                onClick={handleAddToWishlist}
                className="p-3"
              >
                <Heart className="h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                onClick={handleShare}
                className="p-3"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Shipping Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-green-600" />
                <span className="text-sm">Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                <span className="text-sm">In stock, ready to ship</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-amber-600" />
                <span className="text-sm">30-day returns</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <span className="text-sm">Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="details">
            <TabsList className="grid grid-cols-4 mb-8 w-full md:w-1/2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4">
              <h3 className="text-xl font-semibold">Product Details</h3>
              <p className="text-gray-600">
                {product.description} This premium product is designed to meet all your needs with high-quality materials and excellent craftsmanship.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Premium quality materials</li>
                <li>Designed for durability and performance</li>
                <li>Modern design that fits any setting</li>
                <li>Environmentally friendly manufacturing process</li>
              </ul>
            </TabsContent>
            
            <TabsContent value="specs" className="space-y-4">
              <h3 className="text-xl font-semibold">Technical Specifications</h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="font-medium">Model</div>
                <div className="text-gray-600">PRO-{product.id}234</div>
                
                <div className="font-medium">Materials</div>
                <div className="text-gray-600">Premium grade components</div>
                
                <div className="font-medium">Dimensions</div>
                <div className="text-gray-600">12.5" x 8.3" x 2.4"</div>
                
                <div className="font-medium">Weight</div>
                <div className="text-gray-600">1.2 lbs</div>
                
                <div className="font-medium">Warranty</div>
                <div className="text-gray-600">2 years limited warranty</div>
                
                <div className="font-medium">Country of Origin</div>
                <div className="text-gray-600">United States</div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-6">
              <h3 className="text-xl font-semibold">Customer Reviews</h3>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  <span className="text-3xl font-bold mr-1">{product.rating.toFixed(1)}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-gray-600">Based on {product.reviewCount} reviews</span>
              </div>
              
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">John D.</span>
                    <span className="text-gray-500 text-sm">2 days ago</span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">
                    Absolutely love this product! It exceeded all my expectations in terms of quality and performance.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Sarah M.</span>
                    <span className="text-gray-500 text-sm">1 week ago</span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">
                    Great value for the price. The only minor issue was the shipping took a bit longer than expected.
                  </p>
                </div>
                
                <div>
                  <Button variant="outline" className="w-full">Load More Reviews</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="badges" className="space-y-4">
              <h3 className="text-xl font-semibold">Unlock These Badges</h3>
              <p className="text-gray-600">Purchase this product to progress towards these special badges!</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
                <BadgeDisplay badge={{
                  id: 10,
                  name: "Tech Enthusiast",
                  description: "Purchase 3 electronics products",
                  icon: "🔌",
                  achieved: false,
                  progress: product.category === "Electronics" ? 2 : 1,
                  target: 3
                }} />
                
                <BadgeDisplay badge={{
                  id: 11,
                  name: "Big Spender",
                  description: "Spend over $1000",
                  icon: "💰",
                  achieved: false,
                  progress: 750,
                  target: 1000
                }} />
                
                <BadgeDisplay badge={{
                  id: 12,
                  name: "Collector",
                  description: "Own items from 5 different categories",
                  icon: "🏆",
                  achieved: false,
                  progress: 3,
                  target: 5
                }} />
                
                <BadgeDisplay badge={{
                  id: 13,
                  name: "Premium Shopper",
                  description: "Purchase 3 items over $200 each",
                  icon: "⭐",
                  achieved: product.price > 200,
                  progress: product.price > 200 ? 1 : 0,
                  target: 3
                }} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Similar Products */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Similar Products</h2>
            <Button variant="ghost" className="text-dukkan-purple" asChild>
              <Link to={`/category/${product.category}`} className="flex items-center gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
