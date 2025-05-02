
import { Badge as BadgeType } from "@/lib/data";
import { Progress } from "@/components/ui/progress";

interface BadgeDisplayProps {
  badge: BadgeType;
  size?: "sm" | "md" | "lg";
}

export default function BadgeDisplay({ badge, size = "md" }: BadgeDisplayProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  const iconSizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl"
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${sizeClasses[size]} relative mb-2`}>
        <div 
          className={`rounded-full flex items-center justify-center ${
            badge.achieved 
              ? 'bg-gradient-to-br from-dukkan-purple to-dukkan-navy' 
              : 'bg-gray-200'
          }`}
          style={{ width: '100%', height: '100%' }}
        >
          <span className={`${iconSizeClasses[size]} ${badge.achieved ? 'text-white' : 'text-gray-400'}`}>
            {badge.icon}
          </span>
        </div>
        {badge.achieved && (
          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
            <span className="text-white text-xs">✓</span>
          </div>
        )}
      </div>
      
      <span className={`font-medium ${textSizeClasses[size]} text-center`}>
        {badge.name}
      </span>
      
      {!badge.achieved && badge.progress !== undefined && badge.target !== undefined && (
        <div className="w-full mt-1">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{badge.progress}</span>
            <span>{badge.target}</span>
          </div>
          <Progress 
            value={(badge.progress / badge.target) * 100} 
            className="h-1"
          />
        </div>
      )}
    </div>
  );
}
