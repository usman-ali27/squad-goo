
import { Link } from "react-router-dom";
import { Bell, Search, MessageSquare, HelpCircle, User, Menu as MenuIcon } from "lucide-react";
import { LuLayoutDashboard } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "/assets/images/logo.png";
import { useUser } from "@/stores/authStore";

interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

const DashboardHeader = ({ toggleSidebar }: DashboardHeaderProps) => {
  const user = useUser();
  const isRecruiter = user?.role === 'recruiter';

  const recruiterBgUrl = '/assets/images/recurities.jpeg';
  const jobSeekerBgUrl = '/assets/images/employer.jpeg';

  const subHeaderStyle: React.CSSProperties = {
    // Adding a semi-transparent black overlay to ensure text is readable over any image
    backgroundImage: `url(${isRecruiter ? recruiterBgUrl : jobSeekerBgUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <header className="shadow-md">
      {/* Top Header */}
      <div className="bg-white px-6 py-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-8">
          <Link to="/">
            <img src={logo} alt="SquadGoo Logo" className="h-8" />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/documentation" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Document
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium text-gray-600 hover:text-gray-900 p-0">
                  Help
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem>FAQ</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {isRecruiter && (
            <Link to="/dashboard/find-staff">
              <Button variant="orange" size="sm" className="mr-4">
                Find Staff
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MessageSquare className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5 text-gray-600" />
          </Button>
        
          <Link to="/" className="rounded-full">
            <LuLayoutDashboard className="h-5 w-5 text-gray-600" />
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Sub Header */}
      <div 
        className="px-6 py-3 flex items-center text-white" 
        style={subHeaderStyle}
      >
        <Button variant="ghost" size="icon" className="mr-4 text-white hover:bg-white/20 " onClick={toggleSidebar}>
            <MenuIcon className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
    </header>
  );
};

export default DashboardHeader;
