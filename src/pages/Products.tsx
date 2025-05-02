
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

// Sample product data - in a real app this would come from an API
const productsData = [
  {
    id: "1",
    name: "Wireless Earbuds Pro",
    price: 129.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D",
    category: "electronics",
    discountPercentage: 15,
    isNew: true
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    price: 249.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1617043983671-adaadcaa2460?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    category: "electronics",
    discountPercentage: 0,
    isNew: false
  },
  {
    id: "3",
    name: "4K Ultra HD Smart TV",
    price: 799.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnQlMjB0dnxlbnwwfHwwfHx8MA%3D%3D",
    category: "electronics",
    discountPercentage: 10,
    isNew: false
  },
  {
    id: "4",
    name: "Gaming Laptop Pro",
    price: 1299.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    category: "electronics",
    discountPercentage: 5,
    isNew: true
  },
  {
    id: "5",
    name: "Bluetooth Wireless Speaker",
    price: 89.99,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
    category: "electronics",
    discountPercentage: 0,
    isNew: false
  },
  {
    id: "6",
    name: "Digital Camera 4K",
    price: 649.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhfGVufDB8fDB8fHww",
    category: "electronics",
    discountPercentage: 8,
    isNew: false
  }
];

// More sample data for other categories
const fashionProducts = [
  {
    id: "7",
    name: "Classic Denim Jacket",
    price: 79.99,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVuaW0lMjBqYWNrZXR8ZW58MHx8MHx8fDA%3D",
    category: "fashion",
    discountPercentage: 0,
    isNew: false
  },
  {
    id: "8",
    name: "Premium Leather Sneakers",
    price: 129.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D",
    category: "fashion",
    discountPercentage: 15,
    isNew: true
  }
];

const homeProducts = [
  {
    id: "9",
    name: "Smart Home Security System",
    price: 299.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1558002038-1055907dc842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VjdXJpdHklMjBjYW1lcmF8ZW58MHx8MHx8fDA%3D",
    category: "home",
    discountPercentage: 10,
    isNew: true
  },
  {
    id: "10",
    name: "Stainless Steel Cookware Set",
    price: 199.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1584990347449-656ad391f295?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29va3dhcmV8ZW58MHx8MHx8fDA%3D",
    category: "home",
    discountPercentage: 5,
    isNew: false
  }
];

const sportsProducts = [
  {
    id: "11",
    name: "Professional Yoga Mat",
    price: 49.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D",
    category: "sports",
    discountPercentage: 0,
    isNew: false
  },
  {
    id: "12",
    name: "Mountain Bike Pro",
    price: 599.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBiaWtlfGVufDB8fDB8fHww",
    category: "sports",
    discountPercentage: 12,
    isNew: true
  }
];

// Combine all products
const allProducts = [
  ...productsData,
  ...fashionProducts,
  ...homeProducts,
  ...sportsProducts
];

const Products = () => {
  const { category } = useParams();
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [sortBy, setSortBy] = useState("newest");
  const [filterNewOnly, setFilterNewOnly] = useState(false);
  
  // Filter products based on category
  const filteredProducts = allProducts.filter(product => {
    // If category is provided, filter by it
    if (category && product.category !== category) {
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
    return a.id < b.id ? 1 : -1;
  });
  
  const getCategoryTitle = () => {
    if (!category) return "All Products";
    
    switch(category) {
      case "electronics": return "Electronics";
      case "fashion": return "Fashion";
      case "home": return "Home & Kitchen";
      case "sports": return "Sports & Outdoors";
      default: return "Products";
    }
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
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  image={product.image}
                  discountPercentage={product.discountPercentage}
                  isNew={product.isNew}
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
