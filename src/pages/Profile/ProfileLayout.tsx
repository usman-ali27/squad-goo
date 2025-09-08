import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Mail, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const ProfileLayout = () => {
  const location = useLocation();
  
  const profileTabs = [
    { name: "Basic Details", href: "/profile", exact: true },
    { name: "Job Experience", href: "/profile/experience" },
    { name: "Job Preferences", href: "/profile/preferences" },
    { name: "Qualification & Education", href: "/profile/education" },
    { name: "Tax Information", href: "/profile/tax" },
    { name: "Social Media Links", href: "/profile/social" },
    { name: "KYC Verification", href: "/profile/kyc" },
    { name: "Documents & Certificates", href: "/profile/documents" },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-primary">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Profile Avatar */}
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                <AvatarImage src="/placeholder.svg" alt="Profile" />
                <AvatarFallback className="text-2xl bg-white text-primary">PG</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-accent hover:bg-accent-hover"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Pusparaj Giri</h1>
                <p className="text-white/80 mb-4">ABC - email@gmail.com</p>
                <div className="flex items-center space-x-4 text-sm text-white/80">
                  <div className="flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span>+61 234 234 233</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Sydney, Australia</span>
                  </div>
                </div>
              </div>

              {/* Rating and Account Type */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="h-4 w-4 text-white/50" />
                    <span className="ml-2 text-sm">4 Review</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Main Account
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Squad Account
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <nav className="p-2">
                {profileTabs.map((tab) => (
                  <Link
                    key={tab.name}
                    to={tab.href}
                    className={cn(
                      "block w-full text-left px-4 py-3 text-sm font-medium rounded-lg mb-1 transition-all duration-200",
                      isActive(tab.href, tab.exact)
                        ? "bg-accent text-white shadow-md"
                        : "text-muted-foreground hover:bg-gray-50 hover:text-foreground"
                    )}
                  >
                    {tab.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg min-h-[600px]">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;