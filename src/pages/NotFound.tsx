
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, ShoppingCart } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4 max-w-md">
        <div className="mb-6">
          <div className="inline-block rounded-full bg-gray-100 p-6">
            <div className="text-6xl font-bold text-dukkan-purple">404</div>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button asChild size="lg">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
          
          <Button variant="outline" asChild size="lg">
            <Link to="/products">
              <Search className="mr-2 h-5 w-5" />
              Browse Products
            </Link>
          </Button>
        </div>
        
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="font-medium mb-2">Popular Destinations</h2>
          <ul className="space-y-2 text-left">
            <li>
              <Link to="/" className="text-dukkan-purple hover:underline block">Home</Link>
            </li>
            <li>
              <Link to="/products" className="text-dukkan-purple hover:underline block">All Products</Link>
            </li>
            <li>
              <Link to="/rewards" className="text-dukkan-purple hover:underline block">Rewards Center</Link>
            </li>
            <li>
              <Link to="/cart" className="text-dukkan-purple hover:underline block">Shopping Cart</Link>
            </li>
            <li>
              <Link to="/contact" className="text-dukkan-purple hover:underline block">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
