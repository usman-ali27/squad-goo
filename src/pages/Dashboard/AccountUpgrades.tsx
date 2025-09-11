import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Star, 
  Zap, 
  Shield, 
  Check, 
  Sparkles,
  Users,
  TrendingUp,
  Globe,
  Award
} from "lucide-react";

const AccountUpgrades = () => {
  const plans = [
    {
      id: "basic",
      name: "Basic",
      current: true,
      price: "Free",
      period: "Forever",
      description: "Perfect for getting started",
      icon: Star,
      color: "text-gray-500",
      bgColor: "bg-gray-100",
      features: [
        "5 Job Applications per month",
        "Basic Profile",
        "Standard Support",
        "Mobile App Access"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      current: false,
      price: "$29",
      period: "per month",
      description: "Most popular for active job seekers",
      icon: Crown,
      color: "text-accent",
      bgColor: "bg-accent/10",
      popular: true,
      features: [
        "Unlimited Job Applications",
        "Premium Profile Badge",
        "Priority Support",
        "Advanced Analytics",
        "Resume Builder Pro",
        "Interview Preparation Tools"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      current: false,
      price: "$99",
      period: "per month",
      description: "For teams and organizations",
      icon: Sparkles,
      color: "text-primary",
      bgColor: "bg-primary/10",
      features: [
        "Everything in Premium",
        "Team Management",
        "Custom Branding",
        "API Access",
        "Dedicated Account Manager",
        "Advanced Reporting",
        "SSO Integration"
      ]
    }
  ];

  const addOns = [
    {
      name: "Profile Boost",
      description: "Increase your profile visibility by 5x",
      price: "$19",
      period: "one-time",
      icon: TrendingUp,
      popular: false
    },
    {
      name: "Resume Review",
      description: "Professional resume review by experts",
      price: "$49",
      period: "one-time",
      icon: Award,
      popular: true
    },
    {
      name: "Interview Coaching",
      description: "1-on-1 interview coaching session",
      price: "$99",
      period: "per session",
      icon: Users,
      popular: false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Account Upgrades</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Unlock premium features and boost your career prospects with our professional plans
        </p>
      </div>

      {/* Current Plan Status */}
      <Card className="border-accent/20 bg-accent/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Star className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Current Plan: Basic</h3>
                <p className="text-sm text-muted-foreground">You're on the free plan</p>
              </div>
            </div>
            <Badge variant="secondary">Active</Badge>
          </div>
          <div className="mt-4 pt-4 border-t border-accent/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-accent">5</p>
                <p className="text-xs text-muted-foreground">Applications Used</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">2</p>
                <p className="text-xs text-muted-foreground">Profile Views</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">0</p>
                <p className="text-xs text-muted-foreground">Premium Features</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">Basic</p>
                <p className="text-xs text-muted-foreground">Support Level</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Plans */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-center">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={plan.id} 
                className={`relative ${plan.popular ? 'border-accent shadow-lg scale-105' : ''} ${plan.current ? 'border-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-white">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center space-y-4">
                  <div className={`h-16 w-16 mx-auto rounded-full ${plan.bgColor} flex items-center justify-center`}>
                    <IconComponent className={`h-8 w-8 ${plan.color}`} />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.period !== "Forever" && (
                        <span className="text-sm text-muted-foreground">/{plan.period.split(' ')[1]}</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{plan.period}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${
                      plan.current 
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                        : plan.popular 
                        ? 'bg-accent hover:bg-accent-hover' 
                        : 'bg-primary hover:bg-primary/90'
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? 'Current Plan' : 'Upgrade Now'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Add-ons */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-center">Premium Add-ons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {addOns.map((addon, index) => {
            const IconComponent = addon.icon;
            return (
              <Card key={index} className={addon.popular ? 'border-accent' : ''}>
                <CardHeader className="text-center space-y-4">
                  <div className="h-12 w-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">{addon.name}</h3>
                    <p className="text-sm text-muted-foreground">{addon.description}</p>
                  </div>
                  
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-xl font-bold">{addon.price}</span>
                    <span className="text-sm text-muted-foreground">/{addon.period.split(' ')[1] || addon.period}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <Button variant="outline" className="w-full">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Features Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Feature Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 font-medium">Features</th>
                  <th className="text-center py-4 font-medium">Basic</th>
                  <th className="text-center py-4 font-medium">Premium</th>
                  <th className="text-center py-4 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-gray-100">
                  <td className="py-3">Job Applications</td>
                  <td className="text-center py-3">5/month</td>
                  <td className="text-center py-3">Unlimited</td>
                  <td className="text-center py-3">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3">Resume Builder</td>
                  <td className="text-center py-3">Basic</td>
                  <td className="text-center py-3">Pro</td>
                  <td className="text-center py-3">Enterprise</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3">Support</td>
                  <td className="text-center py-3">Standard</td>
                  <td className="text-center py-3">Priority</td>
                  <td className="text-center py-3">Dedicated</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3">Analytics</td>
                  <td className="text-center py-3">-</td>
                  <td className="text-center py-3"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-3"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-primary to-primary-light text-white">
        <CardContent className="p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Ready to boost your career?</h3>
          <p className="text-white/90">Join thousands of professionals who've upgraded their job search experience</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button variant="outline" className="bg-white text-primary hover:bg-white/90">
              Start Free Trial
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Contact Sales
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountUpgrades;