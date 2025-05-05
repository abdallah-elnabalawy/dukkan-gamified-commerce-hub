
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, Gift, Flame, Zap } from "lucide-react";
import { userGameProfile } from "@/lib/data";
import { useState, useEffect } from "react";

interface GamificationBarProps {
  level?: number;
  currentXP?: number;
  xpToNextLevel?: number;
  tier?: string;
}

export default function GamificationBar({ 
  level = userGameProfile.level, 
  currentXP = userGameProfile.currentXP, 
  xpToNextLevel = userGameProfile.xpToNextLevel,
  tier = userGameProfile.tier
}: GamificationBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressPercentage = (currentXP / xpToNextLevel) * 100;
    
    // Animate progress bar
    const timer = setTimeout(() => setProgress(progressPercentage), 300);
    return () => clearTimeout(timer);
  }, [currentXP, xpToNextLevel]);

  return (
    <div className="bg-gradient-to-r from-dukkan-navy to-dukkan-purple rounded-xl p-4 text-white mb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <Award className="h-5 w-5 text-dukkan-gold animate-pulse-gentle" />
            </div>
            <div>
              <span className="text-sm font-medium block">Player Level</span>
              <div className="flex items-center gap-1">
                <span className="font-bold text-xl">{level}</span>
                <Badge variant="outline" className={`tier-badge ${
                  tier === 'bronze' ? 'tier-bronze' : 
                  tier === 'silver' ? 'tier-silver' : 'tier-gold'
                }`}>
                  {tier}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex-1 max-w-md">
            <div className="flex justify-between text-xs mb-1">
              <span>XP: {currentXP}</span>
              <span>Next Level: {xpToNextLevel}</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" indicatorColor="bg-gradient-to-r from-dukkan-gold to-dukkan-purple" />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Gift className="h-4 w-4 text-white/80" />
              <span className="font-semibold">{userGameProfile.points}</span>
              <span className="text-xs text-white/80">points</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Flame className="h-4 w-4 text-orange-400" />
              <span className="font-semibold">{userGameProfile.dailyStreak}</span>
              <span className="text-xs text-white/80">day streak</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4 text-yellow-300" />
              <span className="font-semibold">{userGameProfile.completedChallenges}</span>
              <span className="text-xs text-white/80">/{userGameProfile.totalChallenges} tasks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
