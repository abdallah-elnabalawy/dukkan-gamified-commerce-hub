
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import GamificationBar from "@/components/GamificationBar";
import RewardsBanner from "@/components/RewardsBanner";
import ChallengeCard from "@/components/ChallengeCard";
import DailyReward from "@/components/DailyReward";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, TrendingUp, Gift, Star, ShoppingBag } from "lucide-react";
import { products, categories, challenges, recommendations } from "@/lib/data";

export default function Index() {
  const [featuredProducts, setFeaturedProducts] = useState(products.slice(0, 4));
  const [activeTab, setActiveTab] = useState("trending");

  useEffect(() => {
    // Simulating tab switching data fetch
    if (activeTab === "trending") {
      setFeaturedProducts(products.slice(0, 4));
    } else if (activeTab === "new") {
      setFeaturedProducts(products.slice(1, 5).reverse());
    } else if (activeTab === "discounted") {
      setFeaturedProducts([...products].sort(() => 0.5 - Math.random()).slice(0, 4));
    }
  }, [activeTab]);

  const activeChallenges = challenges.filter(c => !c.completed).slice(0, 2);
  const recommendedProducts = recommendations.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-dukkan-navy to-dukkan-purple py-16 mb-8">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <Badge className="bg-white/20 text-white mb-4 hover:bg-white/30">✨ Gamified Shopping Experience</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop. Play. Earn Rewards.</h1>
            <p className="text-white/80 text-lg mb-8">
              Discover a new way to shop online with Dukkan. Earn points, complete challenges, and unlock exclusive rewards as you shop!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/products">
                  Shop Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
                <Link to="/rewards">
                  View Rewards
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1470"
              alt="Shopping experience" 
              className="rounded-xl shadow-2xl max-h-[400px] object-cover"
            />
          </div>
        </div>
      </section>
      
      {/* Gamification Bar */}
      <div className="container mx-auto px-4">
        <GamificationBar />
      </div>
      
      {/* Categories Section */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Button variant="ghost" className="text-dukkan-purple" asChild>
              <Link to="/categories" className="flex items-center gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <div className="flex gap-2">
              <Button 
                variant={activeTab === "trending" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveTab("trending")}
                className={activeTab === "trending" ? "bg-dukkan-purple hover:bg-dukkan-purple/90" : ""}
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                Trending
              </Button>
              <Button 
                variant={activeTab === "new" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveTab("new")}
                className={activeTab === "new" ? "bg-dukkan-purple hover:bg-dukkan-purple/90" : ""}
              >
                <Star className="h-4 w-4 mr-1" />
                New
              </Button>
              <Button 
                variant={activeTab === "discounted" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveTab("discounted")}
                className={activeTab === "discounted" ? "bg-dukkan-purple hover:bg-dukkan-purple/90" : ""}
              >
                <Gift className="h-4 w-4 mr-1" />
                Discounted
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Rewards and Challenges Section */}
      <section className="mb-12 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <RewardsBanner />
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Active Challenges</h3>
                <Button variant="ghost" size="sm" className="text-dukkan-purple" asChild>
                  <Link to="/challenges">View All</Link>
                </Button>
              </div>
              <div className="space-y-4">
                {activeChallenges.map(challenge => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recommended Section */}
      <section className="mb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recommended For You</h2>
            <Button variant="ghost" className="text-dukkan-purple" asChild>
              <Link to="/recommendations" className="flex items-center gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Daily Reward Component */}
      <DailyReward />
      
      <Footer />
    </div>
  );
}
