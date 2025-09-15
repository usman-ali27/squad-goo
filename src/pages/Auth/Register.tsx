
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, User, Briefcase, Building, Send, CheckCircle2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const isValidEmail = (email: string) => {
  // A simple regex for email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

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

  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

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

  const handleSendCode = async () => {
    setIsSendingCode(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSendingCode(false);
    setEmailVerificationSent(true);
    toast({
      title: "Verification Code Sent",
      description: "A code has been sent to your email address.",
    });
  };

  const handleVerifyCode = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (verificationCode === "123456") { // Dummy verification code
      setIsEmailVerified(true);
      toast({
        title: "Email Verified",
        description: "Your email has been successfully verified.",
        variant: "success",
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "The verification code is incorrect. Please try again.",
        variant: "destructive",
      });
    }
  };


  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailVerified) {
      toast({
        title: "Please Verify Email",
        description: "You must verify your email before registering.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Registration Successful",
      description: "Welcome to SquadGoo! You can now log in.",
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
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(/assets/images/login-background.jpeg)",
        backgroundAttachment: "fixed",
      }}
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
                    className="pl-10 bg-gray-50 pr-12"
                    required
                    disabled={emailVerificationSent}
                  />
                  <AnimatePresence>
                    {isValidEmail(formData.email) && !emailVerificationSent && !isEmailVerified && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute right-1 top-1 transform -translate-y-1/2"
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              onClick={handleSendCode}
                              disabled={isSendingCode}
                              className="h-8 w-8 text-orange-600 hover:bg-orange-100 hover:text-orange-700"
                            >
                              {isSendingCode ? <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div> : <Send className="h-4 w-4" />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Send verification code</p>
                          </TooltipContent>
                        </Tooltip>
                      </motion.div>
                    )}
                     {isEmailVerified && (
                       <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                         className="absolute right-2 top-2 transform -translate-y-1/2"
                       >
                         <Tooltip>
                         <TooltipTrigger asChild>
                         <CheckCircle2 className="h-5 w-5 text-green-500" />
                         </TooltipTrigger>
                          <TooltipContent>
                            <p>Email Verified</p>
                          </TooltipContent>
                        </Tooltip>
                       </motion.div>
                     )}
                  </AnimatePresence>
                </div>
                {!emailVerificationSent && <p className="text-xs text-muted-foreground">Immediate email code verification to continue</p>}
              </div>

               <AnimatePresence>
                {emailVerificationSent && !isEmailVerified && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-2 overflow-hidden"
                  >
                    <Label htmlFor="verificationCode">Verification Code</Label>
                    <div className="relative">
                      <Input
                        id="verificationCode"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="bg-gray-50"
                      />
                      <Button
                        type="button"
                        onClick={handleVerifyCode}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8"
                        variant="orange"
                      >
                        Verify
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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
                      )}>                      <IconComponent className={cn("h-5 w-5", selectedType === type.id ? "text-white" : "text-gray-500")} />
                      </div>
                      <span className="text-xs font-medium text-center">{type.name}</span>
                    </button>
                  );
                })}
              </div>

              <Button type="submit" variant="orange" className="w-full" size="lg" disabled={!formData.agreeTerms || !isEmailVerified}>               Register
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
            >             <img src="https://www.google.com/favicon.ico" alt="Google icon" className="w-5 h-5 mr-2" />
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
