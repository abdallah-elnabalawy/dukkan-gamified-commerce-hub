
import { Challenge } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Clock, Award } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const progressPercentage = (challenge.progress / challenge.target) * 100;

  const handleChallengeAction = () => {
    toast({
      title: challenge.completed ? "Challenge Completed" : "Challenge Progress Updated",
      description: challenge.completed ? 
        `You've earned ${challenge.reward} points!` : 
        `Progress updated: ${challenge.progress}/${challenge.target}`,
    });
  };

  return (
    <div className={`border rounded-xl p-4 ${challenge.completed ? 'bg-green-50 border-green-200' : 'border-border'}`}>
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold">{challenge.title}</h4>
        <div className="flex items-center gap-1 text-dukkan-purple">
          <Award className="h-4 w-4" />
          <span className="font-medium">+{challenge.reward}</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
      
      <div className="space-y-3">
        <div className="flex justify-between text-xs mb-1">
          <span>Progress: {challenge.progress}/{challenge.target}</span>
          <span>{progressPercentage.toFixed(0)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        
        {challenge.expiresIn && !challenge.completed && (
          <div className="flex items-center gap-1 text-xs text-amber-600">
            <Clock className="h-3 w-3" />
            <span>Expires in {challenge.expiresIn}</span>
          </div>
        )}
        
        <Button 
          onClick={handleChallengeAction}
          className={`w-full text-sm ${
            challenge.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-dukkan-purple hover:bg-dukkan-purple/90'
          }`}
          disabled={challenge.completed}
        >
          {challenge.completed ? 'Completed' : 'View Details'}
        </Button>
      </div>
    </div>
  );
}
