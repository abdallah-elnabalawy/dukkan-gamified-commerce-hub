
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Facebook, Github, Twitter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Login() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    
    // Simple password strength calculator
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/)) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    
    setPasswordStrength(strength);
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate login
    toast({
      title: "Welcome back!",
      description: "You have successfully logged in. +10 login points!",
    });
    
    // Redirect to home
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onboardingStep === 1) {
      if (!email || !password || !name) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }
      
      setOnboardingStep(2);
      return;
    }
    
    // Simulate registration
    toast({
      title: "Account created!",
      description: "Your account has been created successfully. +100 welcome bonus points!",
    });
    
    // Redirect to home
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <div className="bg-dukkan-purple mx-auto rounded-full h-12 w-12 flex items-center justify-center mb-4">
              <div className="text-white font-bold text-xl">D</div>
            </div>
            <h2 className="text-2xl font-bold">Welcome to Dukkan</h2>
            <p className="text-gray-500 mt-1">The gamified shopping experience</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <div className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-xs text-dukkan-purple hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm">Remember me</Label>
                  </div>
                  
                  <Button type="submit" className="w-full bg-dukkan-purple hover:bg-dukkan-purple/90">
                    Login
                  </Button>
                </form>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="w-full">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="register">
              <div>
                {onboardingStep === 1 ? (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Your Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input 
                        id="register-email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input 
                        id="register-password" 
                        type="password" 
                        placeholder="••••••••" 
                        value={password} 
                        onChange={handlePasswordChange}
                      />
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Password strength</span>
                          <span>{passwordStrength >= 75 ? "Strong" : passwordStrength >= 50 ? "Medium" : "Weak"}</span>
                        </div>
                        <Progress 
                          value={passwordStrength} 
                          className="h-1"
                          indicatorColor={
                            passwordStrength >= 75 ? "bg-green-500" : 
                            passwordStrength >= 50 ? "bg-amber-500" : 
                            "bg-red-500"
                          }
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link to="/terms" className="text-dukkan-purple hover:underline">
                          Terms of Service
                        </Link>
                        {" "}and{" "}
                        <Link to="/privacy" className="text-dukkan-purple hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    
                    <Button type="submit" className="w-full bg-dukkan-purple hover:bg-dukkan-purple/90">
                      Continue
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="bg-green-100 rounded-full mx-auto w-12 h-12 flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold">Unlock Your Rewards</h3>
                      <p className="text-gray-500 mt-1">Complete your profile to start earning points</p>
                    </div>
                    
                    <div className="space-y-3 border-2 border-dashed border-dukkan-purple/30 rounded-lg p-4 bg-dukkan-purple/5">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Create an account</span>
                        <span className="text-dukkan-purple font-medium">+100 points</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Complete profile</span>
                        <span className="text-dukkan-purple font-medium">+50 points</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">First purchase bonus</span>
                        <span className="text-dukkan-purple font-medium">+200 points</span>
                      </div>
                    </div>
                    
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label>What are you most interested in?</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button type="button" variant="outline" className="justify-start">Electronics</Button>
                          <Button type="button" variant="outline" className="justify-start">Fashion</Button>
                          <Button type="button" variant="outline" className="justify-start">Home & Kitchen</Button>
                          <Button type="button" variant="outline" className="justify-start">Sports</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>How did you hear about us?</Label>
                        <Input placeholder="Select an option" />
                      </div>
                      
                      <Button type="submit" className="w-full bg-dukkan-purple hover:bg-dukkan-purple/90">
                        Complete Registration
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
