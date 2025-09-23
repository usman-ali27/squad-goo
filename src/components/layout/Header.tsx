
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsAuthenticated, useUser, useAuthActions } from "@/stores/authStore";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "/assets/images/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isAuthenticated = useIsAuthenticated();
  const user = useUser();
  const { logout } = useAuthActions();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleLogout = () => {
    logout();
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    navigate("/");
    setIsMenuOpen(false);
  };

  const getUserInitials = () => {
    // Handle job_seeker role specifically
    if (user?.role === 'job_seeker' && user?.job_seeker) {
      const { first_name, last_name } = user.job_seeker;
      if (first_name && last_name) {
        return `${first_name[0]}${last_name[0]}`.toUpperCase();
      }
      if (first_name) {
        return first_name.substring(0, 2).toUpperCase();
      }
    }

    // Fallback for other roles or if job_seeker object is missing
    if (user?.name) {
      return user.name.substring(0, 2).toUpperCase();
    }
    
    return "U";
  }
  
  const getDisplayName = () => {
    // Handle job_seeker role specifically
    if (user?.role === 'job_seeker' && user?.job_seeker) {
      const { first_name, last_name } = user.job_seeker;
      if (first_name && last_name) {
        return `${first_name} ${last_name}`;
      }
    }
    // Fallback for other roles
    return user?.name || 'Anonymous User';
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Modern Workplace Logo"
              
              width="70"
              height="40"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isActive(item.href)
                    ? "text-accent border-b-2 border-accent pb-1"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <Link to="/register?type=recruiter">
                <Button variant="orange" size="sm"> Recruiter </Button>
            </Link>
            <Link to="/register?type=jobseeker">
                <Button variant="orange-outline" size="sm"> Jobseeker </Button>
            </Link>

            {isAuthenticated ? (
                <>
                    <Link to="/dashboard">
                        <Button variant="outline" size="sm">Dashboard</Button>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={user?.profile_picture || ''} alt={getDisplayName()} />
                                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{getDisplayName()}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link to="/dashboard">Dashboard</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link to="/profile">Profile Settings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            ) : (
                <>
                    <Link to="/login">
                        <Button variant="outline" size="sm">
                            Login
                        </Button>
                    </Link>

                    {/* <Link to="/register">
                        <Button variant="outline" size="sm">
                            Register
                        </Button>
                    </Link> */}
                </>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-accent"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated && (
                 <Link
                    key="Dashboard"
                    to="/dashboard"
                    className={`text-sm font-medium transition-colors ${
                    isActive("/dashboard")
                        ? "text-accent"
                        : "text-muted-foreground"
                    }`}
                     onClick={() => setIsMenuOpen(false)}
                >
                    Dashboard
                </Link>
              )}
              <div className="flex flex-col space-y-2 pt-4 border-t">
                {!isAuthenticated ? (
                    <>
                        <Button asChild variant="outline" size="sm" onClick={() => setIsMenuOpen(false)}>
                           <Link to="/login">Login</Link>
                        </Button>
                        <Button asChild variant="orange" size="sm" onClick={() => setIsMenuOpen(false)}>
                           <Link to="/register">Register</Link>
                        </Button>
                    </>
                ) : (
                     <Button variant="ghost" size="sm" onClick={handleLogout}>
                        Sign Out
                     </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
