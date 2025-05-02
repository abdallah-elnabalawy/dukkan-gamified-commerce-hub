
import { Link } from "react-router-dom";
import { Category } from "@/lib/data";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to={`/category/${category.id}`} className="group">
      <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-border">
        <div className="h-40 bg-gray-100 relative overflow-hidden">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback image
              e.currentTarget.src = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=320";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <h3 className="absolute bottom-4 left-4 text-white font-bold text-lg">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
}
