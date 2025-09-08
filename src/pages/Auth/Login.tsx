import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, Chrome } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login Successful",
      description: "Welcome back to SquadGoo!",
    });
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Google Login",
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
      <div className="relative z-10 w-full max-w-md">
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

            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back!</h1>
            <p className="text-muted-foreground">Please enter your details to login</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="You@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
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

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm font-medium">
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <Button type="submit" variant="orange" className="w-full" size="lg">
                Login
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

            {/* Google Login */}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              size="lg"
              onClick={handleGoogleLogin}
            >
              <Chrome className="w-4 h-4 mr-2" />
              Sign in with Google
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-muted-foreground">
              Not a member yet?{" "}
              <Link
                to="/register"
                className="font-medium text-accent hover:text-accent-hover transition-colors"
              >
                Join Now
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

export default Login;