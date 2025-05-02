
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dukkan-navy text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and social links */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-white rounded-full p-2">
                <div className="text-dukkan-purple font-bold text-xl">D</div>
              </div>
              <span className="font-bold text-2xl">Dukkan</span>
            </Link>
            <p className="text-gray-300 max-w-xs">
              Your gamified shopping destination with rewards, challenges, and a fun shopping experience.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-dukkan-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-dukkan-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-dukkan-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-dukkan-purple transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-dukkan-purple transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-dukkan-purple transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-dukkan-purple transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-dukkan-purple transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/electronics" className="text-gray-300 hover:text-dukkan-purple transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/fashion" className="text-gray-300 hover:text-dukkan-purple transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/category/home" className="text-gray-300 hover:text-dukkan-purple transition-colors">
                  Home & Kitchen
                </Link>
              </li>
              <li>
                <Link to="/category/sports" className="text-gray-300 hover:text-dukkan-purple transition-colors">
                  Sports & Outdoors
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Join Our Community</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to get special offers, free giveaways, and earn extra points.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-md focus:outline-none text-gray-800"
              />
              <button className="bg-dukkan-purple text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition-colors">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Dukkan. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-dukkan-purple transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 text-sm hover:text-dukkan-purple transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
