
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
  sendPhoneVerification,
  verifyPhoneCode,
  register,
} from "@/services/authService";

import { LiaUsersSolid } from "react-icons/lia";
import { LiaUserSolid } from "react-icons/lia";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";


const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPhone = (phone: string) => {
  const cleanedPhone = phone.replace(/\s/g, '');
  return /^(\+61\d{9}|\+92\d{10})$/.test(cleanedPhone);
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
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingEmailCode, setIsSendingEmailCode] = useState(false);
  const [isVerifyingEmailCode, setIsVerifyingEmailCode] = useState(false);
  const [emailResendTimer, setEmailResendTimer] = useState(0);

  const [phoneVerificationSent, setPhoneVerificationSent] = useState(false);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isSendingPhoneCode, setIsSendingPhoneCode] = useState(false);
  const [isVerifyingPhoneCode, setIsVerifyingPhoneCode] = useState(false);
  const [phoneResendTimer, setPhoneResendTimer] = useState(0);

  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (emailResendTimer > 0) {
      interval = setInterval(() => {
        setEmailResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [emailResendTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phoneResendTimer > 0) {
      interval = setInterval(() => {
        setPhoneResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phoneResendTimer]);

  const startEmailResendTimer = () => setEmailResendTimer(60);
  const startPhoneResendTimer = () => setPhoneResendTimer(60);

  const accountTypes = [
    { id: "job_seeker", name: "Jobseeker", icon: LiaUserSolid },
    { id: "individual", name: "Individual", icon: HiOutlineBuildingOffice2 },
    { id: "recruiter", name: "Recruiter", icon: LiaUsersSolid },
  ];

  const handleSendEmailCode = async () => {
    if (!selectedType) {
      toast({ title: "Select Account Type", description: "Please select an account type first.", variant: "destructive" });
      return;
    }
    if (!isValidEmail(formData.email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setIsSendingEmailCode(true);
    try {
      await sendEmailVerification(formData.email, selectedType);
      setEmailVerificationSent(true);
      startEmailResendTimer();
      toast({ title: "Verification Code Sent", description: "A code has been sent to your email address." });
    } catch (error: any) {
      toast({ title: "Error", description: error.response?.data?.message || "Failed to send email verification code.", variant: "destructive" });
    } finally {
      setIsSendingEmailCode(false);
    }
  };

  const handleVerifyEmailCode = async () => {
    if (!emailVerificationCode) {
      toast({ title: "Invalid Code", description: "Please enter the email verification code.", variant: "destructive" });
      return;
    }
    setIsVerifyingEmailCode(true);
    try {
      await verifyEmailCode(formData.email, emailVerificationCode);
      setIsEmailVerified(true);
      toast({ title: "Email Verified", description: "Your email has been successfully verified.", variant: "default" });
    } catch (error: any) {
      toast({ title: "Error", description: error.response?.data?.message || "Invalid email verification code.", variant: "destructive" });
    } finally {
      setIsVerifyingEmailCode(false);
    }
  };

  const handleSendPhoneCode = async () => {
    const cleanedPhone = formData.contactNumber.replace(/\s/g, '');
    if (!isValidPhone(cleanedPhone)) {
      toast({ title: "Invalid Phone Number", description: "Please use a valid AU (+61) or PK (+92) number.", variant: "destructive" });
      return;
    }
    setIsSendingPhoneCode(true);
    try {
      await sendPhoneVerification(cleanedPhone);
      setPhoneVerificationSent(true);
      startPhoneResendTimer();
      toast({ title: "Verification Code Sent", description: "A code has been sent to your phone number." });
    } catch (error: any) {
      toast({ title: "Error", description: error.response?.data?.message || "Failed to send phone verification code.", variant: "destructive" });
    } finally {
      setIsSendingPhoneCode(false);
    }
  };

  const handleVerifyPhoneCode = async () => {
    const cleanedPhone = formData.contactNumber.replace(/\s/g, '');
    if (!phoneVerificationCode) {
      toast({ title: "Invalid Code", description: "Please enter the phone verification code.", variant: "destructive" });
      return;
    }
    setIsVerifyingPhoneCode(true);
    try {
      await verifyPhoneCode(cleanedPhone, phoneVerificationCode);
      setIsPhoneVerified(true);
      toast({ title: "Phone Verified", description: "Your phone number has been successfully verified.", variant: "default" });
    } catch (error: any) {
      toast({ title: "Error", description: error.response?.data?.message || "Invalid phone verification code.", variant: "destructive" });
    } finally {
      setIsVerifyingPhoneCode(false);
    }
  };


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      toast({ title: "Password Too Short", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }

    if (formData.password !== formData.passwordConfirmation) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    if (!isEmailVerified || !isPhoneVerified) {
      toast({ title: "Verification Required", description: "Please verify both your email and phone number before registering.", variant: "destructive" });
      return;
    }

    const registrationData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      role: selectedType,
      phone: formData.contactNumber.replace(/\s/g, ''),
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.passwordConfirmation,
      referral_code: formData.referralCode || null,
      agreed: formData.agreeTerms,
      phone_verified: isPhoneVerified,
      email_verified: isEmailVerified,
    };

    setIsRegistering(true);
    try {
      await register(registrationData);
      toast({ title: "Registration Successful", description: "Welcome! You can now log in.", variant: "default" });
      navigate("/login");
    } catch (error: any) {
      const errors = error.response?.data?.errors;
      let errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      if (errors) errorMessage = Object.values(errors).flat().join("\n");
      toast({ title: "Registration Failed", description: errorMessage, variant: "destructive" });
      if (errors?.email) {
        setIsEmailVerified(false);
        setEmailVerificationSent(false);
        setEmailVerificationCode("");
      }
      if (errors?.phone) {
        setIsPhoneVerified(false);
        setPhoneVerificationSent(false);
        setPhoneVerificationCode("");
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/assets/images/login-background.jpeg)", backgroundAttachment: "fixed" }}>
        <div className="relative z-10 w-full max-w-sm sm:max-w-md my-8">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="flex flex-col items-center justify-center mb-4">
                <img src="/assets/images/icon.jpeg" alt="Modern Workplace Logo" className="w-16 mb-3" />
                <span className="text-xs font-semibold text-orange-500 tracking-widest">MODERN WORKPLACE</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Create your account</h1>
              <p className="text-sm text-muted-foreground">Please enter your details to register</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Name Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <div className="relative"><User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input id="firstName" placeholder="Enter first name" value={formData.firstName} onChange={(e) => setFormData(p => ({ ...p, firstName: e.target.value }))} className="pl-10 bg-gray-50" required /></div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <div className="relative"><User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input id="lastName" placeholder="Enter last name" value={formData.lastName} onChange={(e) => setFormData(p => ({ ...p, lastName: e.target.value }))} className="pl-10 bg-gray-50" required /></div>
                  </div>
                </div>

                {/* Phone Number Input and Verification */}
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="contactNumber" type="tel" placeholder="+61... or +92..." value={formData.contactNumber} onChange={(e) => setFormData(p => ({ ...p, contactNumber: e.target.value }))} className="pl-10 bg-gray-50 pr-12" required disabled={phoneVerificationSent} />
                    <AnimatePresence>
                      {isValidPhone(formData.contactNumber) && !phoneVerificationSent && !isPhoneVerified && (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="absolute right-1 top-1 transform -translate-y-1/2">
                          <Tooltip><TooltipTrigger asChild><Button type="button" size="icon" variant="ghost" onClick={handleSendPhoneCode} disabled={isSendingPhoneCode} className="h-8 w-8 text-orange-600 hover:bg-orange-100 hover:text-orange-700">{isSendingPhoneCode ? <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div> : <Send className="h-4 w-4" />}</Button></TooltipTrigger><TooltipContent><p>Send verification code</p></TooltipContent></Tooltip>
                        </motion.div>
                      )}
                      {isPhoneVerified && (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="absolute right-2 top-2 transform -translate-y-1/2">
                          <Tooltip><TooltipTrigger asChild><CheckCircle2 className="h-5 w-5 text-green-500" /></TooltipTrigger><TooltipContent><p>Phone Verified</p></TooltipContent></Tooltip>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {!phoneVerificationSent && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Accepted format: +61xxxxxxxxx
                    </p>
                  )}
                </div>
                <AnimatePresence>
                  {phoneVerificationSent && !isPhoneVerified && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-2 overflow-hidden">
                      <Label htmlFor="phoneVerificationCode">Phone Verification Code</Label>
                      <div className="relative">
                        <Input id="phoneVerificationCode" placeholder="Enter 6-digit code" value={phoneVerificationCode} onChange={(e) => setPhoneVerificationCode(e.target.value)} className="bg-gray-50" />
                        <Button type="button" onClick={handleVerifyPhoneCode} className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8" variant="orange" disabled={isVerifyingPhoneCode}>{isVerifyingPhoneCode ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Verify"}</Button>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs">
                        <p className="text-muted-foreground">Didn't receive it?</p>
                        <Button type="button" variant="link" className="p-0 h-auto font-semibold text-orange-600 hover:text-orange-500" onClick={handleSendPhoneCode} disabled={phoneResendTimer > 0 || isSendingPhoneCode}>{isSendingPhoneCode ? "Sending..." : phoneResendTimer > 0 ? `Resend in ${phoneResendTimer}s` : "Resend Code"}</Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email Input and Verification */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="Enter email address" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} className="pl-10 bg-gray-50 pr-12" required disabled={emailVerificationSent} />
                    <AnimatePresence>
                      {isValidEmail(formData.email) && !emailVerificationSent && !isEmailVerified && (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="absolute right-1 top-1 transform -translate-y-1/2">
                          <Tooltip><TooltipTrigger asChild><Button type="button" size="icon" variant="ghost" onClick={handleSendEmailCode} disabled={isSendingEmailCode} className="h-8 w-8 text-orange-600 hover:bg-orange-100 hover:text-orange-700">{isSendingEmailCode ? <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div> : <Send className="h-4 w-4" />}</Button></TooltipTrigger><TooltipContent><p>Send verification code</p></TooltipContent></Tooltip>
                        </motion.div>
                      )}
                      {isEmailVerified && (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="absolute right-2 top-2 transform -translate-y-1/2">
                          <Tooltip><TooltipTrigger asChild><CheckCircle2 className="h-5 w-5 text-green-500" /></TooltipTrigger><TooltipContent><p>Email Verified</p></TooltipContent></Tooltip>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <AnimatePresence>
                  {emailVerificationSent && !isEmailVerified && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-2 overflow-hidden">
                      <Label htmlFor="emailVerificationCode">Email Verification Code</Label>
                      <div className="relative">
                        <Input id="emailVerificationCode" placeholder="Enter 6-digit code" value={emailVerificationCode} onChange={(e) => setEmailVerificationCode(e.target.value)} className="bg-gray-50" />
                        <Button type="button" onClick={handleVerifyEmailCode} className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8" variant="orange" disabled={isVerifyingEmailCode}>{isVerifyingEmailCode ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Verify"}</Button>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs">
                        <p className="text-muted-foreground">Didn't get the code?</p>
                        <Button type="button" variant="link" className="p-0 h-auto font-semibold text-orange-600 hover:text-orange-500" onClick={handleSendEmailCode} disabled={emailResendTimer > 0 || isSendingEmailCode}>{isSendingEmailCode ? "Sending..." : emailResendTimer > 0 ? `Resend in ${emailResendTimer}s` : "Resend Code"}</Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Password and Other Inputs */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={formData.password} onChange={(e) => setFormData(p => ({ ...p, password: e.target.value }))} className="pl-10 pr-10 bg-gray-50" required />
                    <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Must be at least 6 characters.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordConfirmation">Confirm Password</Label>
                  <div className="relative"><Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input id="passwordConfirmation" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" value={formData.passwordConfirmation} onChange={(e) => setFormData(p => ({ ...p, passwordConfirmation: e.target.value }))} className="pl-10 pr-10 bg-ray-50" required /><Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3 hover:bg-transparent" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}</Button></div>
                </div>
                <div className="space-y-2"><Label htmlFor="referralCode">Referral Code (Optional)</Label><Input id="referralCode" placeholder="Enter referral code" value={formData.referralCode} onChange={(e) => setFormData(p => ({ ...p, referralCode: e.target.value }))} className="bg-gray-50" /></div>

                {/* Account Type Selection */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {accountTypes.map((type) => { const IconComponent = type.icon; return <button key={type.id} type="button" onClick={() => setSelectedType(type.id as any)} className={cn("flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 h-24", selectedType === type.id ? "border-[#6F4479] bg-[#6F4479] text-white shadow-lg" : "border-gray-200 bg-white hover:border-gray-300 text-muted-foreground hover:text-foreground")}><div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-2", selectedType === type.id ? "bg-white" : "bg-[#6F4479] text-white")}><IconComponent className={cn("h-5 w-5", selectedType === type.id ? "text-[#6F4479]" : "text-white")} /></div><span className="text-xs font-medium text-center">{type.name}</span></button>; })}
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox id="agreeTerms" checked={formData.agreeTerms} onCheckedChange={(checked) => setFormData((p) => ({ ...p, agreeTerms: !!checked }))} className="mt-1" />
                  <div className="grid gap-1.5 leading-none"><Label htmlFor="agreeTerms" className="text-sm font-normal leading-relaxed cursor-pointer">I agree to the <a href="#" className="text-orange-600 hover:underline">Terms and Conditions</a>, <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>, and other legal documents.</Label></div>
                </div>

                <Button type="submit" variant="orange" className="w-full" size="lg" disabled={!formData.agreeTerms || !isEmailVerified || !isPhoneVerified || isRegistering}>{isRegistering ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Register"}</Button>
              </form>

              <div className="relative"><div className="absolute inset-0 flex items-center"><Separator /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-white/95 px-2 text-muted-foreground">Or continue with</span></div></div>
              <Button type="button" variant="outline" className="w-full" size="lg"><img src="https://www.google.com/favicon.ico" alt="Google icon" className="w-5 h-5 mr-2" />Sign in with Google</Button>
              <p className="text-center text-sm text-muted-foreground pt-4">Already a member? <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500 transition-colors">Login</Link></p>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Register;
