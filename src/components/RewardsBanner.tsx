
import { Gift, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function RewardsBanner() {
  return (
    <div className="bg-gradient-to-r from-dukkan-purple to-dukkan-navy rounded-xl overflow-hidden shadow-lg">
      <div className="flex flex-col md:flex-row items-center">
        <div className="p-8 md:p-10 flex-1">
          <div className="bg-white/10 rounded-full w-10 h-10 flex items-center justify-center mb-4">
            <Gift className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-white text-2xl font-bold mb-2">Unlock Exclusive Rewards</h3>
          <p className="text-white/80 mb-6">
            Complete challenges, earn badges, and level up to access special discounts and limited-time offers.
          </p>
          <Button variant="secondary" asChild className="group">
            <Link to="/rewards">
              <span>View Rewards</span>
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        <div className="hidden md:block w-1/3 h-full relative">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=320"
            alt="Rewards program"
            className="object-cover w-full h-full min-h-[220px]"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-dukkan-purple/80 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
