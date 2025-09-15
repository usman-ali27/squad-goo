
import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login Successful",
      description: "Welcome back to SquadGoo!",
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Google Login",
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
              <span className="text-xs font-bold text-orange-500 tracking-widest">MODERN WORKPLACE</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back!</h1>
            <p className="text-sm text-muted-foreground">Please enter your details to login</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Adress</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10 bg-gray-50"
                    required
                  />
                </div>
              </div>

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

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="font-medium text-muted-foreground">
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" variant="orange" className="w-full" size="lg">
                Login
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
              onClick={handleGoogleLogin}
            >
              <img src="https://www.google.com/favicon.ico" alt="Google icon" className="w-5 h-5 mr-2" />
              Sign in with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground pt-4">
              Not a member Yet?{" "}
              <Link
                to="/register"
                className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
              >
                Join Now
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
