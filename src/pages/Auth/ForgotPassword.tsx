import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { toast } = useToast();

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Coming Soon!",
      description: "Forgot password will be available in a future update.",
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
      <div className="relative z-10 w-full max-w-sm">
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
              Forgot Password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to reset your password
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    className="pl-10 bg-gray-50"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="orange"
                className="w-full"
                size="lg"
              >
                Send Reset Link
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground pt-6">
              Remember your password?{" "}
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

export default ForgotPassword;
