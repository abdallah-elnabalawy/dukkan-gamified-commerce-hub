
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, User, Award, Heart, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { userGameProfile } from "@/lib/data";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-dukkan-purple focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Navigation icons */}
        <div className="hidden md:flex items-center gap-4">
          <div className="badge-container">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-5 w-5" />
            </button>
            <span className="badge">3</span>
          </div>
          <div className="badge-container">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="h-5 w-5" />
            </button>
            <span className="badge">2</span>
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
                <Award className="h-5 w-5 text-dukkan-purple" />
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
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-dukkan-purple focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
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
