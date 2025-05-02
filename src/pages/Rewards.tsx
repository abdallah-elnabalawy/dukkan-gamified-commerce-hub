
import { useState } from "react";
import { User, Award, Gift, Star, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { userGameProfile } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GamificationBar from "@/components/GamificationBar";

const Rewards = () => {
  const [activeTab, setActiveTab] = useState<"challenges" | "badges" | "points">("challenges");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">Rewards Center</h1>
        
        <GamificationBar />
        
        <div className="flex flex-wrap gap-4 mb-6">
          <Button 
            variant={activeTab === "challenges" ? "default" : "outline"}
            onClick={() => setActiveTab("challenges")}
          >
            Daily Challenges
          </Button>
          <Button 
            variant={activeTab === "badges" ? "default" : "outline"}
            onClick={() => setActiveTab("badges")}
          >
            My Badges
          </Button>
          <Button 
            variant={activeTab === "points" ? "default" : "outline"}
            onClick={() => setActiveTab("points")}
          >
            Points History
          </Button>
        </div>
        
        {activeTab === "challenges" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ChallengeCard 
              title="Complete Your Profile"
              description="Add a profile picture and complete your bio."
              points={50}
              progress={60}
              isCompleted={false}
            />
            <ChallengeCard 
              title="Make Your First Purchase"
              description="Earn points by completing your first order."
              points={100}
              progress={0}
              isCompleted={false}
            />
            <ChallengeCard 
              title="Leave a Review"
              description="Share your thoughts on a product you purchased."
              points={25}
              progress={0}
              isCompleted={false}
            />
            <ChallengeCard 
              title="Daily Login Streak"
              description="Login 5 days in a row to earn bonus points."
              points={15}
              progress={80}
              isCompleted={false}
              streakCount={4}
              streakTarget={5}
            />
            <ChallengeCard 
              title="Share on Social Media"
              description="Share a product with your friends."
              points={30}
              progress={100}
              isCompleted={true}
            />
            <ChallengeCard 
              title="Join Newsletter"
              description="Stay updated with our latest offers."
              points={20}
              progress={100}
              isCompleted={true}
            />
          </div>
        )}
        
        {activeTab === "badges" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BadgeCard 
              title="Newcomer"
              description="Join the Dukkan community"
              icon={<User className="h-8 w-8 text-dukkan-purple" />}
              isUnlocked={true}
            />
            <BadgeCard 
              title="Smart Shopper"
              description="Complete 5 purchases"
              icon={<Star className="h-8 w-8 text-dukkan-purple" />}
              isUnlocked={false}
              progress={2}
              total={5}
            />
            <BadgeCard 
              title="Loyal Customer"
              description="Shop for 3 months in a row"
              icon={<Award className="h-8 w-8 text-dukkan-purple" />}
              isUnlocked={false}
              progress={1}
              total={3}
            />
            <BadgeCard 
              title="Gift Master"
              description="Send gifts to 3 friends"
              icon={<Gift className="h-8 w-8 text-dukkan-purple" />}
              isUnlocked={false}
              progress={0}
              total={3}
            />
          </div>
        )}
        
        {activeTab === "points" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Points Summary</CardTitle>
                <CardDescription>Your current points balance and stats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6 justify-between">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-sm mb-1">Available Points</p>
                    <p className="text-3xl font-bold text-dukkan-purple">{userGameProfile.points}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-sm mb-1">Points Earned</p>
                    <p className="text-3xl font-bold text-dukkan-purple">1,450</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-sm mb-1">Points Spent</p>
                    <p className="text-3xl font-bold text-dukkan-purple">850</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Points History</CardTitle>
                <CardDescription>Recent points activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <PointsHistoryItem 
                    title="Daily Login Bonus"
                    date="Today"
                    points={10}
                    isEarned={true}
                  />
                  <PointsHistoryItem 
                    title="Product Purchase"
                    date="Yesterday"
                    points={150}
                    isEarned={true}
                  />
                  <PointsHistoryItem 
                    title="Discount Redemption"
                    date="3 days ago"
                    points={200}
                    isEarned={false}
                  />
                  <PointsHistoryItem 
                    title="Review Submission"
                    date="Last week"
                    points={25}
                    isEarned={true}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All History</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

// Helper components for the Rewards page
interface ChallengeCardProps {
  title: string;
  description: string;
  points: number;
  progress: number;
  isCompleted: boolean;
  streakCount?: number;
  streakTarget?: number;
}

const ChallengeCard = ({ title, description, points, progress, isCompleted, streakCount, streakTarget }: ChallengeCardProps) => {
  return (
    <Card className={isCompleted ? "border-dukkan-purple bg-dukkan-purple/5" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant={isCompleted ? "secondary" : "outline"} className={isCompleted ? "bg-dukkan-purple text-white" : ""}>
            {isCompleted ? "Completed" : `+${points} pts`}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {streakCount !== undefined && streakTarget !== undefined && (
          <div className="flex justify-between text-sm mb-1">
            <span>Streak: {streakCount}/{streakTarget}</span>
          </div>
        )}
        <Progress value={progress} className="h-2" />
      </CardContent>
      <CardFooter>
        <Button variant={isCompleted ? "outline" : "default"} className="w-full" disabled={isCompleted}>
          {isCompleted ? "Completed" : "Start Challenge"}
        </Button>
      </CardFooter>
    </Card>
  );
};

interface BadgeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isUnlocked: boolean;
  progress?: number;
  total?: number;
}

const BadgeCard = ({ title, description, icon, isUnlocked, progress, total }: BadgeCardProps) => {
  return (
    <Card className={isUnlocked ? "border-dukkan-purple" : "opacity-70"}>
      <CardHeader className="text-center pb-2">
        <div className={`mx-auto p-4 rounded-full ${isUnlocked ? "bg-dukkan-purple/10" : "bg-gray-100"}`}>
          {icon}
        </div>
        <CardTitle className="mt-2 text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {!isUnlocked && progress !== undefined && total !== undefined && (
        <CardContent>
          <div className="flex justify-between text-sm mb-1">
            <span>Progress: {progress}/{total}</span>
          </div>
          <Progress value={(progress / total) * 100} className="h-2" />
        </CardContent>
      )}
      <CardFooter>
        <Badge variant={isUnlocked ? "default" : "outline"} className="mx-auto">
          {isUnlocked ? "Unlocked" : "Locked"}
        </Badge>
      </CardFooter>
    </Card>
  );
};

interface PointsHistoryItemProps {
  title: string;
  date: string;
  points: number;
  isEarned: boolean;
}

const PointsHistoryItem = ({ title, date, points, isEarned }: PointsHistoryItemProps) => {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <div className={`font-semibold ${isEarned ? "text-green-600" : "text-red-600"}`}>
        {isEarned ? `+${points}` : `-${points}`}
      </div>
    </div>
  );
};

export default Rewards;
