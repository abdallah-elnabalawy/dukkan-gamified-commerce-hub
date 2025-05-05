import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, User, Bell, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { userGameProfile } from "@/lib/data";
import { useWishlist } from "@/contexts/WishlistContext";
import { useNotifications } from "@/contexts/NotificationContext";
import NotificationPanel from "./NotificationPanel";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const { unreadCount } = useNotifications();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isNotificationOpen && 
          !event.target ||
          !(event.target as Element).closest('.notification-container')) {
        setIsNotificationOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      // If on products page, use the filter function
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        // Otherwise navigate to products page with query param
        navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-dukkan-purple rounded-full p-2">
            <div className="text-white font-bold text-xl">D</div>
          </div>
          <span className="font-bold text-2xl text-dukkan-navy hidden md:inline-block">Dukkan</span>
        </Link>

        {/* Search bar - hidden on mobile */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative w-full">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-dukkan-purple focus:border-transparent"
              />
              <button type="submit" className="absolute left-3 top-2.5">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </form>
        </div>

        {/* Navigation icons */}
        <div className="hidden md:flex items-center gap-4">
          <div className="badge-container notification-container relative">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full relative" 
              onClick={toggleNotifications}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <NotificationPanel 
              isOpen={isNotificationOpen} 
              onClose={() => setIsNotificationOpen(false)} 
            />
          </div>
          <div className="badge-container">
            <Link to="/wishlist" className="p-2 hover:bg-gray-100 rounded-full relative">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-dukkan-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </div>
          <div className="badge-container">
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <span className="badge">3</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login" className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-2">
              <User className="h-5 w-5" />
            </Link>
            <div className="border-l border-gray-300 pl-3 flex items-center">
              <Link to="/profile" className="flex items-center gap-1">
                <svg className="h-5 w-5 text-dukkan-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-semibold text-sm">Level {userGameProfile.level}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center md:hidden">
          <Link to="/cart" className="p-2 mr-2 relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="badge">3</span>
          </Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 right-0 left-0 bg-white shadow-lg z-50 py-4 px-6">
          <div className="space-y-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-dukkan-purple focus:border-transparent"
                />
                <button type="submit" className="absolute left-3 top-2.5">
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </form>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="flex items-center py-2" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="flex items-center py-2" onClick={() => setIsMenuOpen(false)}>
                  Products
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="flex items-center py-2" onClick={() => setIsMenuOpen(false)}>
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center py-2" onClick={() => setIsMenuOpen(false)}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/cart" className="flex items-center py-2" onClick={() => setIsMenuOpen(false)}>
                  My Cart
                </Link>
              </li>
              <li>
                <Link to="/login" className="flex items-center py-2" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
