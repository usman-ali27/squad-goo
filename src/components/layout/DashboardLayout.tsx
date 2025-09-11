import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel,
  SidebarTrigger,
  useSidebar 
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Search, 
  Users, 
  Briefcase, 
  Wallet, 
  Settings, 
  HelpCircle, 
  User, 
  CreditCard,
  UserCheck,
  FileText,
  MessageSquare,
  Crown
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock user type - in real app this would come from auth context
const USER_TYPE = "jobseeker"; // or "recruiter"

const jobSeekerMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    exact: true
  },
  {
    title: "Find Jobs",
    url: "/dashboard/find-jobs",
    icon: Search
  },
  {
    title: "Applications",
    url: "/dashboard/applications", 
    icon: FileText
  },
  {
    title: "Messages",
    url: "/dashboard/messages",
    icon: MessageSquare
  },
  {
    title: "Wallet",
    url: "/dashboard/wallet",
    icon: Wallet
  }
];

const recruiterMenuItems = [
  {
    title: "Dashboard", 
    url: "/dashboard",
    icon: LayoutDashboard,
    exact: true
  },
  {
    title: "Find Staff",
    url: "/dashboard/find-staff",
    icon: UserCheck
  },
  {
    title: "Job Pool",
    url: "/dashboard/job-pool", 
    icon: Briefcase
  },
  {
    title: "Candidates",
    url: "/dashboard/candidates",
    icon: Users
  },
  {
    title: "Messages",
    url: "/dashboard/messages",
    icon: MessageSquare
  },
  {
    title: "Wallet",
    url: "/dashboard/wallet",
    icon: Wallet
  }
];

const settingsItems = [
  {
    title: "Account Settings",
    url: "/dashboard/settings",
    icon: Settings
  },
  {
    title: "Account Upgrades",
    url: "/dashboard/upgrades",
    icon: Crown
  },
  {
    title: "Support",
    url: "/dashboard/support",
    icon: HelpCircle
  }
];

function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";
  
  const menuItems = USER_TYPE === "jobseeker" ? jobSeekerMenuItems : recruiterMenuItems;
  
  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback className="bg-primary text-primary-foreground">PG</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                Pusparaj Giri
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {USER_TYPE === "jobseeker" ? "Job Seeker" : "Recruiter"}
              </p>
            </div>
          </div>
        )}
        {collapsed && (
          <Avatar className="h-8 w-8 mx-auto">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">PG</AvatarFallback>
          </Avatar>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url, item.exact)}>
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/profile")}>
                  <Link to="/profile" className="flex items-center gap-3">
                    <User className="h-4 w-4" />
                    {!collapsed && <span>Profile</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Dashboard Header */}
          <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="flex h-16 items-center px-4 gap-4">
              <SidebarTrigger className="md:hidden" />
              <div className="flex-1" />
              
              {/* Quick Actions */}
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">View Profile</span>
                  </Link>
                </Button>
                <Badge variant="secondary" className="hidden sm:inline-flex">
                  {USER_TYPE === "jobseeker" ? "Job Seeker" : "Recruiter"}
                </Badge>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;