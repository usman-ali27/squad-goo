import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, Chrome, User, Calendar, Settings } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Register = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedType, setSelectedType] = useState<"jobseeker" | "individual" | "recruiter">("jobseeker");
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    password: "",
    referralCode: "",
    agreeTerms: false,
  });

  const accountTypes = [
    {
      id: "jobseeker",
      name: "Jobseeker",
      icon: User,
      description: "Looking for opportunities"
    },
    {
      id: "individual",
      name: "Individual",
      icon: Calendar,
      description: "Freelance work"
    },
    {
      id: "recruiter",
      name: "Recruiter",
      icon: Settings,
      description: "Hiring talent"
    }
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Successful",
      description: "Welcome to SquadGoo! Please verify your email.",
    });
  };

  const handleGoogleRegister = () => {
    toast({
      title: "Google Registration",
      description: "Redirecting to Google authentication...",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Objects */}
      <div className="absolute top-10 right-10 w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center transform rotate-12">
        <div className="w-8 h-8 bg-primary rounded"></div>
      </div>
      <div className="absolute bottom-32 left-16 w-12 h-12 bg-accent rounded-lg shadow-lg transform -rotate-12"></div>
      <div className="absolute top-1/2 left-8 w-8 h-8 bg-yellow-400 rounded-full shadow-lg"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-md">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-hover">
                  <span className="text-xl font-bold text-white">SG</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight">SquadGoo</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Modern Workplace</span>
                </div>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-foreground mb-2">Create your account</h1>
            <p className="text-muted-foreground">Please enter your details to login</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name Fields Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Middle Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="middleName">Middle Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="middleName"
                      type="text"
                      placeholder="Enter middle name"
                      value={formData.middleName}
                      onChange={(e) => setFormData(prev => ({ ...prev, middleName: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Last Name Field */}
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Contact Number Field */}
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">📱</span>
                  <Input
                    id="contactNumber"
                    type="tel"
                    placeholder="Enter contact number"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">SMS verification required to continue</p>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">Email verification required to continue</p>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Referral Code Field */}
              <div className="space-y-2">
                <Label htmlFor="referralCode">Referral Code</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">🎁</span>
                  <Input
                    id="referralCode"
                    type="text"
                    placeholder="Enter referral code (optional)"
                    value={formData.referralCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, referralCode: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeTerms: !!checked }))}
                  className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <Label 
                    htmlFor="agreeTerms" 
                    className="text-sm font-normal leading-relaxed cursor-pointer"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline">Terms and Conditions</a>,{" "}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>,{" "}
                    <a href="#" className="text-primary hover:underline">User Agreement</a>, and{" "}
                    <a href="#" className="text-primary hover:underline">Declarations</a>
                  </Label>
                </div>
              </div>

              {/* Account Type Selection */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {accountTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(type.id as any)}
                        className={cn(
                          "flex flex-col sm:flex-col items-center p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 min-h-[80px] sm:min-h-[100px]",
                          selectedType === type.id
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 hover:border-gray-300 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <div className={cn(
                          "w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-1 sm:mb-2",
                          selectedType === type.id ? "bg-primary text-white" : "bg-gray-100"
                        )}>
                          <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-center">{type.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Register Button */}
              <Button 
                type="submit" 
                variant="orange" 
                className="w-full" 
                size="lg"
                disabled={!formData.agreeTerms}
              >
                Register
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Google Register */}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              size="lg"
              onClick={handleGoogleRegister}
            >
              <Chrome className="w-4 h-4 mr-2" />
              Sign in with Google
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground">
              Already a member?{" "}
              <Link
                to="/login"
                className="font-medium text-accent hover:text-accent-hover transition-colors"
              >
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Background Objects */}
      <div className="absolute top-1/4 right-16 opacity-20">
        <div className="w-20 h-20 border-4 border-dashed border-gray-300 rounded-lg transform rotate-45"></div>
      </div>
      <div className="absolute bottom-1/4 left-12 opacity-10">
        <div className="w-16 h-16 bg-primary rounded-full"></div>
      </div>
    </div>
  );
};

export default Register;