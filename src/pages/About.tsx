
import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, ShieldCheck, Award, Gift, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-dukkan-navy to-dukkan-purple py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white mb-4 hover:bg-white/30">Our Story</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Dukkan</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Discover how we're revolutionizing online shopping with gamification, rewards, and a community-focused experience.
          </p>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At Dukkan, we believe shopping should be more than just a transaction. Our mission is to transform e-commerce into an engaging, rewarding experience that builds community and loyalty through gamification.
              </p>
              <p className="text-gray-600 mb-8">
                We're committed to providing high-quality products while making every interaction with our platform fun, rewarding, and memorable. By combining shopping with game elements, we create an experience that keeps you coming back.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-dukkan-purple hover:bg-dukkan-purple/90" asChild>
                  <Link to="/products">
                    Explore Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/rewards">
                    View Rewards Program
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=640"
                  alt="Our mission"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-dukkan-purple rounded-full flex items-center justify-center animate-float">
                <Gift className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2">Our Values</Badge>
            <h2 className="text-3xl font-bold">What We Stand For</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full w-14 h-14 bg-dukkan-purple/10 flex items-center justify-center mb-4">
                  <Star className="h-7 w-7 text-dukkan-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality & Excellence</h3>
                <p className="text-gray-600">
                  We curate only the highest quality products, ensuring every purchase meets our standards of excellence.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full w-14 h-14 bg-dukkan-purple/10 flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-dukkan-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Building</h3>
                <p className="text-gray-600">
                  We foster a vibrant community of shoppers who share experiences and recommendations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full w-14 h-14 bg-dukkan-purple/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-7 w-7 text-dukkan-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Trust & Security</h3>
                <p className="text-gray-600">
                  We prioritize the security of your data and maintain transparency in all our operations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Gamification Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2">Gamification</Badge>
            <h2 className="text-3xl font-bold mb-4">How Our Gamified Shopping Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've incorporated 12 essential elements of gamification to make your shopping experience engaging, rewarding, and fun.
            </p>
          </div>
          
          <Tabs defaultValue="points" className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="points">Points & Rewards</TabsTrigger>
                <TabsTrigger value="challenges">Challenges & Badges</TabsTrigger>
                <TabsTrigger value="levels">Levels & Tiers</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="points" className="gamer-card">
              <div className="flex flex-col md:flex-row gap-6 items-center text-white">
                <div className="md:w-1/3 flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-dukkan-purple border-4 border-white/20 flex items-center justify-center">
                      <Award className="h-16 w-16 text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-dukkan-gold rounded-full w-12 h-12 flex items-center justify-center border-2 border-white/20">
                      <Gift className="h-6 w-6 text-dukkan-navy" />
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4">Points & Rewards System</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-white/20 p-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Earn points with every purchase based on product value</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-white/20 p-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Additional points for reviews, referrals, and daily check-ins</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-white/20 p-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Redeem points for discounts, free shipping, or exclusive products</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="challenges" className="gamer-card">
              <div className="flex flex-col md:flex-row gap-6 items-center text-white">
                <div className="md:w-1/3 flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-dukkan-purple border-4 border-white/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-dukkan-gold rounded-full w-12 h-12 flex items-center justify-center border-2 border-white/20">
                      <Star className="h-6 w-6 text-dukkan-navy" />
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4">Challenges & Badges</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-white/20 p-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Complete daily and weekly challenges to earn bonus rewards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-white/20 p-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Collect badges for achievements like first purchase or category mastery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-white/20 p-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Track your progress with visual indicators and progress bars</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="levels" className="gamer-card">
              <div className="flex flex-col md:flex-row gap-6 items-center text-white">
                <div className="md:w-1/3 flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-dukkan-purple border-4 border-white/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-dukkan-gold rounded-full w-12 h-12 flex items-center justify-center border-2 border-white/20">
                      <Heart className="h-6 w-6 text-dukkan-navy" />
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4">Levels & Tiers</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-white/20 p-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Progress through levels by earning XP from various activities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-white/20 p-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Unlock Bronze, Silver, and Gold tier membership benefits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-white/20 p-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Higher tiers get early access to sales, exclusive products, and better rewards</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2">Our Journey</Badge>
            <h2 className="text-3xl font-bold">Dukkan Timeline</h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {/* Timeline Item 1 */}
            <div className="flex gap-4 mb-8">
              <div className="w-16 shrink-0 flex flex-col items-center">
                <div className="text-dukkan-purple font-bold">2022</div>
                <div className="h-full w-0.5 bg-dukkan-purple/30"></div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                <div className="font-semibold text-lg mb-1">Founding of Dukkan</div>
                <p className="text-gray-600">
                  Dukkan was founded with a vision to transform e-commerce through gamification principles.
                </p>
              </div>
            </div>
            
            {/* Timeline Item 2 */}
            <div className="flex gap-4 mb-8">
              <div className="w-16 shrink-0 flex flex-col items-center">
                <div className="text-dukkan-purple font-bold">2023</div>
                <div className="h-full w-0.5 bg-dukkan-purple/30"></div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                <div className="font-semibold text-lg mb-1">Beta Launch</div>
                <p className="text-gray-600">
                  We launched our beta platform with core gamification features and received overwhelmingly positive feedback.
                </p>
              </div>
            </div>
            
            {/* Timeline Item 3 */}
            <div className="flex gap-4 mb-8">
              <div className="w-16 shrink-0 flex flex-col items-center">
                <div className="text-dukkan-purple font-bold">2024</div>
                <div className="h-full w-0.5 bg-dukkan-purple/30"></div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                <div className="font-semibold text-lg mb-1">Mobile App Launch</div>
                <p className="text-gray-600">
                  We expanded with a mobile app featuring augmented reality product previews and enhanced gamification.
                </p>
              </div>
            </div>
            
            {/* Timeline Item 4 */}
            <div className="flex gap-4">
              <div className="w-16 shrink-0 flex flex-col items-center">
                <div className="text-dukkan-purple font-bold">2025</div>
                <div className="h-8 w-0.5 bg-dukkan-purple/30"></div>
                <div className="h-4 w-4 rounded-full bg-dukkan-purple animate-pulse"></div>
              </div>
              <div className="bg-gradient-to-br from-dukkan-purple to-dukkan-navy rounded-lg p-4 shadow-md text-white">
                <div className="font-semibold text-lg mb-1">Global Expansion</div>
                <p className="text-white/80">
                  We're currently expanding globally and adding new interactive features to enhance the shopping experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Gamified Shopping?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who have transformed their shopping experience with Dukkan's unique gamification system.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-dukkan-purple hover:bg-dukkan-purple/90" asChild>
              <Link to="/login">
                Create an Account
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/products">
                Browse Products
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
