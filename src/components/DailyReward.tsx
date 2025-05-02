
import { useState } from "react";
import { Gift, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function DailyReward() {
  const [claimed, setClaimed] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  
  const handleClaim = () => {
    toast({
      title: "Daily Reward Claimed!",
      description: "You've earned 25 points and a 10% discount coupon!",
    });
    setClaimed(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-xl shadow-lg border border-dukkan-purple w-64 overflow-hidden">
      <div className="bg-gradient-to-r from-dukkan-purple to-dukkan-navy p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 rounded-full p-1.5">
            <Gift className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-white font-semibold">Daily Reward</h3>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-white/70 hover:text-white"
        >
          <span className="sr-only">Close</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        {!claimed ? (
          <>
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center rounded-full bg-dukkan-purple/10 p-3 mb-2">
                <Gift className="h-6 w-6 text-dukkan-purple animate-pulse" />
              </div>
              <h4 className="font-semibold text-dukkan-navy">Your reward is ready!</h4>
              <p className="text-xs text-gray-500 mt-1">Login streak: 3 days</p>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 flex justify-between items-center">
                <span className="text-sm font-medium">Points</span>
                <Badge variant="secondary" className="bg-dukkan-purple text-white">+25</Badge>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 flex justify-between items-center">
                <span className="text-sm font-medium">Discount</span>
                <Badge variant="secondary" className="bg-dukkan-gold/20 text-dukkan-gold">10% OFF</Badge>
              </div>
            </div>
            
            <Button onClick={handleClaim} className="w-full bg-dukkan-purple hover:bg-dukkan-purple/90">
              Claim Reward
            </Button>
            
            <div className="flex items-center gap-1 justify-center mt-3 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>Resets in 23:45:12</span>
            </div>
          </>
        ) : (
          <div className="text-center py-2">
            <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h4 className="font-semibold text-dukkan-navy">Reward Claimed!</h4>
            <p className="text-xs text-gray-500 mt-1">Come back tomorrow for more rewards</p>
            
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Day 3 of 7</span>
                <span>Next: 50 Points</span>
              </div>
              <Progress value={3 / 7 * 100} className="h-1.5" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
