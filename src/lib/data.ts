
// Products mock data
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  stock: number;
  gamificationPoints: number;
  isNew?: boolean;
  discountPercentage?: number;
}

// Categories mock data
export interface Category {
  id: number;
  name: string;
  image: string;
}

// User profile and gamification data
export interface UserGameProfile {
  level: number;
  points: number;
  xpToNextLevel: number;
  currentXP: number;
  tier: 'bronze' | 'silver' | 'gold';
  badges: Badge[];
  completedChallenges: number;
  totalChallenges: number;
  dailyStreak: number;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  achieved: boolean;
  progress?: number;
  target?: number;
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  reward: number;
  progress: number;
  target: number;
  completed: boolean;
  expiresIn?: string; // "2d 5h" format
}

// Mock categories data with improved images
export const categories: Category[] = [
  { id: 1, name: "Electronics", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=500&auto=format&fit=crop" },
  { id: 2, name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=500&auto=format&fit=crop" },
  { id: 3, name: "Home & Kitchen", image: "https://images.unsplash.com/photo-1556911220-bda9f7b07446?q=80&w=500&auto=format&fit=crop" },
  { id: 4, name: "Sports & Outdoors", image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=500&auto=format&fit=crop" },
  { id: 5, name: "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=500&auto=format&fit=crop" },
  { id: 6, name: "Furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=500&auto=format&fit=crop" }
];

// Mock products data with more products and better images
export const products: Product[] = [
  // Electronics Category
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "Immersive sound quality with noise cancellation and 20-hour battery life.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop",
    category: "Electronics",
    rating: 4.8,
    reviewCount: 423,
    stock: 15,
    gamificationPoints: 250,
    isNew: true
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Track your health metrics and workouts with this water-resistant smart watch.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=500&auto=format&fit=crop",
    category: "Electronics",
    rating: 4.5,
    reviewCount: 287,
    stock: 32,
    gamificationPoints: 200
  },
  {
    id: 3,
    name: "4K Ultra HD Smart TV",
    description: "Stunning 4K resolution with smart features for an immersive viewing experience.",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=500&auto=format&fit=crop",
    category: "Electronics",
    rating: 4.7,
    reviewCount: 189,
    stock: 8,
    gamificationPoints: 350,
    discountPercentage: 10
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    description: "Waterproof speaker with 360° sound and 12-hour playtime.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=500&auto=format&fit=crop",
    category: "Electronics",
    rating: 4.6,
    reviewCount: 352,
    stock: 41,
    gamificationPoints: 90
  },
  {
    id: 5,
    name: "Professional Camera Drone",
    description: "4K video recording with stabilized gimbal and 30-minute flight time.",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=500&auto=format&fit=crop",
    category: "Electronics",
    rating: 4.9,
    reviewCount: 128,
    stock: 5,
    gamificationPoints: 900,
    isNew: true
  },
  
  // Fashion Category
  {
    id: 6,
    name: "Designer Sunglasses",
    description: "UV protection with polarized lenses and durable titanium frame.",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=500&auto=format&fit=crop",
    category: "Fashion",
    rating: 4.4,
    reviewCount: 215,
    stock: 23,
    gamificationPoints: 160
  },
  {
    id: 7,
    name: "Classic Denim Jacket",
    description: "Timeless denim jacket with comfortable fit and durable construction.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=500&auto=format&fit=crop",
    category: "Fashion",
    rating: 4.3,
    reviewCount: 178,
    stock: 35,
    gamificationPoints: 80,
    discountPercentage: 15
  },
  {
    id: 8,
    name: "Leather Crossbody Bag",
    description: "Elegant leather bag with adjustable strap and multiple compartments.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=500&auto=format&fit=crop",
    category: "Fashion",
    rating: 4.6,
    reviewCount: 142,
    stock: 18,
    gamificationPoints: 130
  },
  
  // Home & Kitchen Category
  {
    id: 9,
    name: "Smart Coffee Maker",
    description: "App-controlled coffee machine with programmable brewing schedules.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=500&auto=format&fit=crop",
    category: "Home & Kitchen",
    rating: 4.7,
    reviewCount: 203,
    stock: 12,
    gamificationPoints: 150
  },
  {
    id: 10,
    name: "Premium Knife Set",
    description: "Professional-grade kitchen knives with ergonomic handles and storage block.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=500&auto=format&fit=crop",
    category: "Home & Kitchen",
    rating: 4.8,
    reviewCount: 167,
    stock: 9,
    gamificationPoints: 200,
    isNew: true
  },
  
  // Sports & Outdoors Category
  {
    id: 11,
    name: "Mountain Bike",
    description: "All-terrain bike with 21 speeds and durable aluminum frame.",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=500&auto=format&fit=crop",
    category: "Sports & Outdoors",
    rating: 4.5,
    reviewCount: 183,
    stock: 6,
    gamificationPoints: 500
  },
  {
    id: 12,
    name: "Yoga Mat Kit",
    description: "Non-slip yoga mat with carry strap, blocks, and towel.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop",
    category: "Sports & Outdoors",
    rating: 4.6,
    reviewCount: 215,
    stock: 24,
    gamificationPoints: 60
  },
  
  // Beauty Category
  {
    id: 13,
    name: "Premium Skincare Set",
    description: "Complete facial care routine with cleanser, toner, and moisturizer.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=500&auto=format&fit=crop",
    category: "Beauty",
    rating: 4.7,
    reviewCount: 196,
    stock: 20,
    gamificationPoints: 90,
    discountPercentage: 5
  },
  {
    id: 14,
    name: "Hair Styling Kit",
    description: "Professional-grade hair dryer, straightener, and curling iron set.",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?q=80&w=500&auto=format&fit=crop",
    category: "Beauty",
    rating: 4.4,
    reviewCount: 154,
    stock: 15,
    gamificationPoints: 180
  },
  
  // Furniture Category
  {
    id: 15,
    name: "Ergonomic Office Chair",
    description: "Comfortable design with lumbar support for long working hours.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=500&auto=format&fit=crop",
    category: "Furniture",
    rating: 4.7,
    reviewCount: 189,
    stock: 8,
    gamificationPoints: 350
  },
  {
    id: 16,
    name: "Modern Coffee Table",
    description: "Minimalist design with solid wood construction and metal accents.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=500&auto=format&fit=crop",
    category: "Furniture",
    rating: 4.5,
    reviewCount: 132,
    stock: 7,
    gamificationPoints: 250,
    isNew: true
  }
];

// Mock user gamification profile
export const userGameProfile: UserGameProfile = {
  level: 8,
  points: 1250,
  xpToNextLevel: 2000,
  currentXP: 1250,
  tier: 'silver',
  badges: [
    { id: 1, name: "First Purchase", description: "Completed your first purchase", icon: "🛍️", achieved: true },
    { id: 2, name: "Loyal Customer", description: "Made 5 purchases", icon: "🏆", achieved: true },
    { id: 3, name: "Big Spender", description: "Spent over $1000", icon: "💰", achieved: false, progress: 750, target: 1000 },
    { id: 4, name: "Early Bird", description: "Shop during early access sales", icon: "🐦", achieved: true },
    { id: 5, name: "Reviewer", description: "Leave 10 product reviews", icon: "✍️", achieved: false, progress: 7, target: 10 },
    { id: 6, name: "Trendsetter", description: "Purchase 3 products that are bestsellers", icon: "⭐", achieved: false, progress: 2, target: 3 }
  ],
  completedChallenges: 8,
  totalChallenges: 12,
  dailyStreak: 3
};

// Mock challenges
export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Daily Login",
    description: "Login to the app for 5 consecutive days",
    reward: 50,
    progress: 3,
    target: 5,
    completed: false,
    expiresIn: "2d 5h"
  },
  {
    id: 2,
    title: "Review Spree",
    description: "Write reviews for 3 recent purchases",
    reward: 100,
    progress: 1,
    target: 3,
    completed: false
  },
  {
    id: 3,
    title: "First Electronics Purchase",
    description: "Buy your first item from Electronics category",
    reward: 75,
    progress: 0,
    target: 1,
    completed: false
  },
  {
    id: 4,
    title: "Share on Social",
    description: "Share a product with friends",
    reward: 25,
    progress: 1,
    target: 1,
    completed: true
  }
];

// Mock cart items
export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  potentialPoints: number;
}

export const cart: Cart = {
  items: [
    {
      productId: 1,
      quantity: 1,
      product: products[0]
    },
    {
      productId: 4,
      quantity: 2,
      product: products[3]
    }
  ],
  subtotal: 429.97,
  tax: 34.40,
  shipping: 15,
  total: 479.37,
  potentialPoints: 430
};

// Mock recommended products based on user behavior
export const recommendations = [
  products[1],
  products[4],
  products[2]
];
