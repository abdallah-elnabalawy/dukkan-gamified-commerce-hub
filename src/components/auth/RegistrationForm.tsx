
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

export default function RegistrationForm({ onNextStep }: { onNextStep: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !name) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    onNextStep();
  };
  
  return (
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
  );
}
