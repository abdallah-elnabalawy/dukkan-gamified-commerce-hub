
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Product, products as allProducts } from "@/lib/data";

const Products = () => {
  const { category } = useParams();
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [sortBy, setSortBy] = useState("newest");
  const [filterNewOnly, setFilterNewOnly] = useState(false);
  
  // Filter products based on category
  const filteredProducts = allProducts.filter(product => {
    // If category is provided, filter by it
    if (category && product.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }
    
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Filter new items only if checked
    if (filterNewOnly && !product.isNew) {
      return false;
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price;
    } else if (sortBy === "price-high") {
      return b.price - a.price;
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    // Default: newest
    return b.id - a.id;
  });
  
  const getCategoryTitle = () => {
    if (!category) return "All Products";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <a href="/">Home</a>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-gray-700">{getCategoryTitle()}</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">{getCategoryTitle()}</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="md:w-1/4 space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="space-y-6">
                <Slider
                  value={priceRange}
                  min={0}
                  max={1500}
                  step={10}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-3">Sort By</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="newest"
                    name="sortBy"
                    value="newest"
                    checked={sortBy === "newest"}
                    onChange={() => setSortBy("newest")}
                  />
                  <Label htmlFor="newest">Newest First</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="price-low"
                    name="sortBy"
                    value="price-low"
                    checked={sortBy === "price-low"}
                    onChange={() => setSortBy("price-low")}
                  />
                  <Label htmlFor="price-low">Price: Low to High</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="price-high"
                    name="sortBy"
                    value="price-high"
                    checked={sortBy === "price-high"}
                    onChange={() => setSortBy("price-high")}
                  />
                  <Label htmlFor="price-high">Price: High to Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="rating"
                    name="sortBy"
                    value="rating"
                    checked={sortBy === "rating"}
                    onChange={() => setSortBy("rating")}
                  />
                  <Label htmlFor="rating">Best Rated</Label>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-3">Filters</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="new-only" 
                    checked={filterNewOnly}
                    onCheckedChange={(checked) => setFilterNewOnly(!!checked)}
                  />
                  <Label htmlFor="new-only">New Arrivals Only</Label>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button variant="outline" className="w-full" onClick={() => {
                setPriceRange([0, 1500]);
                setSortBy("newest");
                setFilterNewOnly(false);
              }}>
                Reset Filters
              </Button>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="md:w-3/4">
            <div className="mb-4 text-sm text-gray-500">
              Showing {sortedProducts.length} products
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
            
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or browse our other categories</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
