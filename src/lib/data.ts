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

// Mock products data
export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "Immersive sound quality with noise cancellation and 20-hour battery life.",
    price: 249.99,
    image: "/headphones.jpg",
    category: "Electronics",
    rating: 4.8,
    reviewCount: 423,
    stock: 15,
    gamificationPoints: 250
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Track your health metrics and workouts with this water-resistant smart watch.",
    price: 199.99,
    image: "/smartwatch.jpg",
    category: "Electronics",
    rating: 4.5,
    reviewCount: 287,
    stock: 32,
    gamificationPoints: 200
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    description: "Comfortable design with lumbar support for long working hours.",
    price: 349.99,
    image: "/chair.jpg",
    category: "Furniture",
    rating: 4.7,
    reviewCount: 189,
    stock: 8,
    gamificationPoints: 350
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    description: "Waterproof speaker with 360° sound and 12-hour playtime.",
    price: 89.99,
    image: "/speaker.jpg",
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
    image: "/drone.jpg",
    category: "Electronics",
    rating: 4.9,
    reviewCount: 128,
    stock: 5,
    gamificationPoints: 900
  },
  {
    id: 6,
    name: "Designer Sunglasses",
    description: "UV protection with polarized lenses and durable titanium frame.",
    price: 159.99,
    image: "/sunglasses.jpg",
    category: "Fashion",
    rating: 4.4,
    reviewCount: 215,
    stock: 23,
    gamificationPoints: 160
  }
];

// Mock categories data
export const categories: Category[] = [
  { id: 1, name: "Electronics", image: "/electronics.jpg" },
  { id: 2, name: "Fashion", image: "/fashion.jpg" },
  { id: 3, name: "Home & Kitchen", image: "/home-kitchen.jpg" },
  { id: 4, name: "Sports & Outdoors", image: "/sports.jpg" },
  { id: 5, name: "Beauty", image: "/beauty.jpg" },
  { id: 6, name: "Furniture", image: "/furniture.jpg" }
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
