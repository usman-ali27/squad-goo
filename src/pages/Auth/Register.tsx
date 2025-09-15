import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Briefcase,
  Building,
  Send,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  sendEmailVerification,
  verifyEmailCode,
  register,
} from "@/services/authService";

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedType, setSelectedType] = useState<
    "job_seeker" | "individual" | "recruiter" | null
  >(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "+61",
    email: "",
    password: "",
    passwordConfirmation: "",
    referralCode: "",
    agreeTerms: false,
  });

  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const startResendTimer = () => {
    setResendTimer(60);
  };

  const accountTypes = [
    { id: "job_seeker", name: "Jobseeker", icon: User },
    { id: "individual", name: "Individual", icon: Briefcase },
    { id: "recruiter", name: "Recruiter", icon: Building },
  ];

  const handleSendCode = async () => {
    if (!selectedType) {
      toast({
        title: "Select Account Type",
        description: "Please select an account type before sending the code.",
        variant: "destructive",
      });
      return;
    }
    if (!isValidEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    setIsSendingCode(true);
    try {
      await sendEmailVerification(formData.email, selectedType);
      setEmailVerificationSent(true);
      startResendTimer();
      toast({
        title: "Verification Code Sent",
        description: "A code has been sent to your email address.",
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send verification code. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      toast({
        title: "Invalid Code",
        description: "Please enter the verification code.",
        variant: "destructive",
      });
      return;
    }
    setIsVerifyingCode(true);
    try {
      await verifyEmailCode(formData.email, verificationCode);
      setIsEmailVerified(true);
      toast({
        title: "Email Verified",
        description: "Your email has been successfully verified.",
        variant: "success",
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Invalid verification code. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirmation) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }

    if (!isEmailVerified) {
      toast({
        title: "Please Verify Email",
        description: "You must verify your email before registering.",
        variant: "destructive",
      });
      return;
    }

    const registrationData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      role: selectedType,
      phone: formData.contactNumber,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.passwordConfirmation,
      referral_code: formData.referralCode || null,
      agreed: formData.agreeTerms,
      phone_verified: true,
      email_verified: isEmailVerified,
    };

    setIsRegistering(true);
    try {
      await register(registrationData);
      toast({
        title: "Registration Successful",
        description: "Welcome! You can now log in.",
        variant: "success",
      });
      navigate("/login");
    } catch (error: any) {
      const errors = error.response?.data?.errors;
      const message =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";

      let errorMessage = message;
      if (errors) {
        errorMessage = Object.values(errors).flat().join("\n");
      }

      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });

      // If the email has been taken, reset the email verification UI to allow editing.
      if (errors && errors.email) {
        setIsEmailVerified(false);
        setEmailVerificationSent(false);
        setVerificationCode("");
        setResendTimer(0);
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <TooltipProvider>
      <div
        className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/assets/images/login-background.jpeg)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="relative z-10 w-full max-w-sm sm:max-w-md my-8">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="flex flex-col items-center justify-center mb-4">
                <img
                  src="/assets/images/icon.jpeg"
                  alt="Modern Workplace Logo"
                  className="w-16 mb-3"
                />
                <span className="text-xs font-semibold text-orange-500 tracking-widest">
                  MODERN WORKPLACE
                </span>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Create your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Please enter Your details to login
              </p>
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
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            firstName: e.target.value,
                          }))
                        }
                        className="pl-10 bg-gray-50"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="lastName"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            lastName: e.target.value,
                          }))
                        }
                        className="pl-10 bg-gray-50"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="contactNumber"
                      type="tel"
                      placeholder="Enter contact number"
                      value={formData.contactNumber}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          contactNumber: e.target.value,
                        }))
                      }
                      className="pl-10 bg-gray-50"
                      required
                    />
                  </div>
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
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                      className="pl-10 bg-gray-50 pr-12"
                      required
                      disabled={emailVerificationSent}
                    />
                    <AnimatePresence>
                      {isValidEmail(formData.email) &&
                        !emailVerificationSent &&
                        !isEmailVerified && (
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
                                  {isSendingCode ? (
                                    <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                  ) : (
                                    <Send className="h-4 w-4" />
                                  )}
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
                          className="absolute right-2 top-1 transform -translate-y-1/2"
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
                  {!emailVerificationSent && (
                    <p className="text-xs text-muted-foreground">
                      A verification code will be sent to this email.
                    </p>
                  )}
                </div>

                <AnimatePresence>
                  {emailVerificationSent && !isEmailVerified && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      <Label htmlFor="verificationCode">
                        Verification Code
                      </Label>
                      <div className="relative">
                        <Input
                          id="verificationCode"
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
                          disabled={isVerifyingCode}
                        >
                          {isVerifyingCode ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            "Verify"
                          )}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs">
                        <p className="text-muted-foreground">
                          Didn't receive the code?
                        </p>
                        <Button
                          type="button"
                          variant="link"
                          className="p-0 h-auto font-semibold text-orange-600 hover:text-orange-500"
                          onClick={handleSendCode}
                          disabled={resendTimer > 0 || isSendingCode}
                        >
                          {isSendingCode
                            ? "Sending..."
                            : resendTimer > 0
                            ? `Resend in ${resendTimer}s`
                            : "Resend Code"}
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
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, password: e.target.value }))
                      }
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
                  <Label htmlFor="passwordConfirmation">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="passwordConfirmation"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.passwordConfirmation}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          passwordConfirmation: e.target.value,
                        }))
                      }
                      className="pl-10 pr-10 bg-gray-50"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                                      <Input id="referralCode" placeholder="Enter referral code" value={formData.referralCode} onChange={(e) => setFormData(p => ({ ...p, referralCode: e.target.value }))} className="bg-gray-50" />

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
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                            selectedType === type.id
                              ? "bg-white/20"
                              : "bg-gray-100"
                          )}
                        >
                          <IconComponent
                            className={cn(
                              "h-5 w-5",
                              selectedType === type.id
                                ? "text-white"
                                : "text-gray-500"
                            )}
                          />
                        </div>
                        <span className="text-xs font-medium text-center">
                          {type.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) =>
                      setFormData((p) => ({ ...p, agreeTerms: !!checked }))
                    }
                    className="mt-1"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="agreeTerms"
                      className="text-sm font-normal leading-relaxed cursor-pointer"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-orange-600 hover:underline">
                        Terms and Conditions
                      </a>
                      ,{" "}
                      <a href="#" className="text-orange-600 hover:underline">
                        Privacy Policy
                      </a>
                      , and other legal documents.
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="orange"
                  className="w-full"
                  size="lg"
                  disabled={
                    !formData.agreeTerms || !isEmailVerified || isRegistering
                  }
                >
                  {isRegistering ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Register"
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white/95 px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                size="lg"
              >
                {" "}
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google icon"
                  className="w-5 h-5 mr-2"
                />
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
    </TooltipProvider>
  );
};

export default Register;
