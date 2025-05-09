
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the form schema with Zod
const formSchema = z.object({
  interest: z.string().min(1, "Please select an interest"),
  referralSource: z.string().min(1, "Please tell us how you heard about us"),
});

type FormValues = z.infer<typeof formSchema>;

export default function OnboardingForm() {
  const [selectedInterest, setSelectedInterest] = useState<string>("");
  
  // Initialize the form with React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interest: "",
      referralSource: "",
    },
  });

  const handleRegister = (values: FormValues) => {
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
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
          <FormField
            control={form.control}
            name="interest"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>What are you most interested in?</FormLabel>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    type="button" 
                    variant={selectedInterest === "Electronics" ? "default" : "outline"} 
                    className="justify-start"
                    onClick={() => {
                      setSelectedInterest("Electronics");
                      field.onChange("Electronics");
                    }}
                  >
                    Electronics
                  </Button>
                  <Button 
                    type="button" 
                    variant={selectedInterest === "Fashion" ? "default" : "outline"} 
                    className="justify-start"
                    onClick={() => {
                      setSelectedInterest("Fashion");
                      field.onChange("Fashion");
                    }}
                  >
                    Fashion
                  </Button>
                  <Button 
                    type="button" 
                    variant={selectedInterest === "Home & Kitchen" ? "default" : "outline"} 
                    className="justify-start"
                    onClick={() => {
                      setSelectedInterest("Home & Kitchen");
                      field.onChange("Home & Kitchen");
                    }}
                  >
                    Home & Kitchen
                  </Button>
                  <Button 
                    type="button" 
                    variant={selectedInterest === "Sports" ? "default" : "outline"} 
                    className="justify-start"
                    onClick={() => {
                      setSelectedInterest("Sports");
                      field.onChange("Sports");
                    }}
                  >
                    Sports
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="referralSource"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>How did you hear about us?</FormLabel>
                <FormControl>
                  <Input placeholder="Select an option" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full bg-dukkan-purple hover:bg-dukkan-purple/90">
            Complete Registration
          </Button>
        </form>
      </Form>
    </div>
  );
}
