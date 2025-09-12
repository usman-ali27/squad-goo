
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, User, Briefcase, FileText, Share2, Shield, Award, Building, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Star, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const recruiterNavItems = [
  { name: "Basic Details", href: "/profile" },
  { name: "Company Details", href: "/profile/company" },
  { name: "Tax Information", href: "/profile/tax" },
  { name: "Social Media Links", href: "/profile/social" },
  { name: "KYC & KYB Verification", href: "/profile/kyc" },
  { name: "Documents & Certificates", href: "/profile/documents" },
];

const jobSeekerNavItems = [
  { name: "Basic Details", href: "/profile", exact: true },
  { name: "Company Details", href: "/profile/company" },
  { name: "Job Experience", href: "/profile/experience" },
  { name: "Job Preferences", href: "/profile/preferences" },
  { name: "Qualification & Education", href: "/profile/education" },
  { name: "Tax Information", href: "/profile/tax" },
  { name: "Social Media Links", href: "/profile/social" },
  { name: "KYC Verification", href: "/profile/kyc" },
  { name: "Documents & Certificates", href: "/profile/documents" },
];

const ExampleCard = () => (
    <Card className="mt-6">
        <CardHeader>
            <CardTitle className="text-base font-semibold">Example</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="bg-white border rounded-lg p-4 space-y-2 shadow-sm">
                <p className="font-semibold text-blue-800 text-sm">DRIVER LICENSE</p>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                        <UserCheck className="w-8 h-8 text-gray-400"/>
                    </div>
                    <div className="text-xs space-y-1 text-gray-600">
                        <p>ID: 123456789-005</p>
                        <p>NAME SURNAME</p>
                        <p>DOB: 23.09.1997</p>
                        <p>EXP: 12.01.2030</p>
                    </div>
                </div>
                <div className="h-6 bg-gray-200 rounded-md mt-2"></div>
            </div>
            <div className="bg-white border rounded-lg p-4 space-y-2 shadow-sm">
                <p className="font-semibold text-blue-800 text-sm">IDENTIFICATION CARD</p>
                <div className="h-16 bg-gray-200 rounded-md flex items-center justify-center">
                    <FileText className="w-8 h-8 text-gray-400"/>
                </div>
                <div className="h-6 bg-gray-200 rounded-md mt-2"></div>
            </div>
        </CardContent>
    </Card>
);

const ProfileLayout = () => {
  const location = useLocation();
  const isRecruiter = false; // This would be dynamically determined
  const user = {
    name: 'Pusparaj Giri',
    email: 'ABC - email@gmail.com',
    phone: '+01 234 234 233',
    initials: 'PG',
    rating: 4,
    isMainAccount: true,
    isSquadAccount: false,
  };

  const headerBgClass = isRecruiter ? 'bg-orange-600' : 'bg-purple-700';
  const isKycPage = location.pathname === '/profile/kyc';
  const navItems = isRecruiter ? recruiterNavItems : jobSeekerNavItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className={cn("text-white pb-24", headerBgClass)}>
        <div className="w-[85%] mx-auto pt-8 sm:pt-12">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 sm:gap-8">
            {/* Profile Avatar */}
            <div className="relative">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white shadow-xl">
                <AvatarImage src="/placeholder.svg" alt="Profile" />
                <AvatarFallback className="text-xl sm:text-2xl bg-white text-orange-600 font-bold">{user.initials}</AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute bottom-1 right-1 h-8 w-8 rounded-full bg-white text-primary hover:bg-gray-100">
                <Home className="h-4 w-4" />
              </Button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-2 text-center lg:text-left">
              {/* Name */}
              <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>

              {/* Info Row */}
              <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

                {/* Left Side: Email + Phone */}
                <div className="flex flex-row lg:flex-col items-center lg:items-start text-sm text-white/80 gap-2 lg:gap-1">
                  <p className="text-white/80">{user.email}</p>
                  <div className="flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span>{user.phone}</span>
                  </div>
                </div>

                {/* Right Side: Review + Badges */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end gap-4 lg:gap-2">
                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    {/* Stars */}
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="h-4 w-4 text-white/50" />
                    </div>

                    {/* Divider + Review Count */}
                    <span className="border-l border-white/40 pl-2 text-sm font-medium">
                      4 Review
                    </span>
                  </div>


                  {/* Badges */}
                  <div className="flex flex-row items-center gap-2">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      Main Account
                    </Badge>

                    <Switch className="data-[state=checked]:bg-green-500" />

                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      Squad Account
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-[85%] mx-auto mt-[-64px]">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Left Sidebar Navigation */}
          <div className="lg:col-span-1">
             <div className="sticky top-20">
                <div className="bg-white rounded-xl shadow-lg p-4">
                <nav className="flex flex-col gap-1">
                    {navItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                            isActive
                            ? "bg-orange-500 text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        )}
                        >
                        <span>{item.name}</span>
                        </Link>
                    );
                    })}
                </nav>
                </div>
                 {isKycPage && <ExampleCard />}
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3 mt-6 mb-6 lg:mt-0">
            <div className="bg-white rounded-xl shadow-lg min-h-[600px] p-4 sm:p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
