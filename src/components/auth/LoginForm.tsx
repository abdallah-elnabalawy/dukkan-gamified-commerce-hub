
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Facebook, Github, Twitter } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
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
  
  return (
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
  );
}
