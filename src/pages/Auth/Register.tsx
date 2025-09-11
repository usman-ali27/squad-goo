
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, User, Briefcase, Building } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Register = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedType, setSelectedType] = useState<"jobseeker" | "individual" | "recruiter">("individual");
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
    },
    {
      id: "individual",
      name: "Individual",
      icon: Briefcase,
    },
    {
      id: "recruiter",
      name: "Recruiter",
      icon: Building,
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
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: "url(/assets/images/login-background.jpeg)" }}
    >
      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="flex flex-col items-center justify-center mb-4">
              <img src="/assets/images/icon.jpeg" alt="Modern Workplace Logo" className="w-16 mb-3" />
              <span className="text-xs font-semibold text-orange-500 tracking-widest">MODERN WORKPLACE</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Create your account</h1>
            <p className="text-sm text-muted-foreground">Please enter Your details to login</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="pl-10 bg-gray-50"
                      required
                    />
                  </div>
                </div>
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
                      className="pl-10 bg-gray-50"
                    />
                  </div>
                </div>
              </div>

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
                    className="pl-10 bg-gray-50"
                    required
                  />
                </div>
              </div>

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
                    className="pl-10 bg-gray-50"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">Immediate mobile sms verification to continue</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10 bg-gray-50"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">Immediate email code verification to continue</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10 bg-gray-50"
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
                    className="pl-10 bg-gray-50"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-2">
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
                    <a href="#" className="text-orange-600 hover:underline">Terms and Conditions</a>,{" "}
                    <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>,{" "}
                    <a href="#" className="text-orange-600 hover:underline">User Agreement</a>, and{" "}
                    <a href="#" className="text-orange-600 hover:underline">Declarations</a>
                  </Label>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                {accountTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id as any)}
                      className={cn(
                        "flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 h-24",
                        selectedType === type.id
                          ? "border-purple-600 bg-purple-600 text-white shadow-lg"
                          : "border-gray-200 bg-white hover:border-gray-300 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                        selectedType === type.id ? "bg-white/20" : "bg-gray-100"
                      )}>
                        <IconComponent className={cn("h-5 w-5", selectedType === type.id ? "text-white" : "text-gray-500")} />
                      </div>
                      <span className="text-xs font-medium text-center">{type.name}</span>
                    </button>
                  );
                })}
              </div>

              <Button type="submit" variant="orange" className="w-full" size="lg" disabled={!formData.agreeTerms}>
                Register
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/95 px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              size="lg"
              onClick={handleGoogleRegister}
            >
              <img src="https://www.google.com/favicon.ico" alt="Google icon" className="w-5 h-5 mr-2" />
              Sign in with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground pt-4">
              Already a member?{" "}
              <Link
                to="/login"
                className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
              >
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
