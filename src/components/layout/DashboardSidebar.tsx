
import { Link, useLocation } from "react-router-dom";
import { Home, DollarSign, Settings, LifeBuoy, MessageSquare, Wallet, Users, Briefcase, BarChart2, Star, FileText } from "lucide-react";
import { useUser } from "@/stores/authStore";

const DashboardSidebar = () => {
  const location = useLocation();
  const user = useUser();
  const isRecruiter = user?.role === 'recruiter';

  const isActive = (path: string) => location.pathname.startsWith(path);

  const recruiterNav = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Account Upgrade", path: "/dashboard/account-upgrade", icon: Briefcase },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
    { name: "Supports", path: "/dashboard/supports", icon: LifeBuoy },
    { name: "Chat", path: "/dashboard/chat", icon: MessageSquare },
    { name: "Wallet", path: "/dashboard/wallet", icon: Wallet },
    { name: "Job Pool", path: "/dashboard/job-pool", icon: Wallet },
    { name: "Timesheets", path: "/dashboard/timesheets", icon: FileText },
    { name: "Reports", path: "/dashboard/reports", icon: DollarSign },
    { name: "Marketplace", path: "/dashboard/marketplace", icon: Star },
  ];

  const jobSeekerNav = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Account Upgrade", path: "/dashboard/account-upgrade", icon: Briefcase },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
    { name: "Supports", path: "/dashboard/supports", icon: LifeBuoy },
    { name: "Chat", path: "/dashboard/chat", icon: MessageSquare },
    { name: "Wallet", path: "/dashboard/wallet", icon: Wallet },
    { name: "Job Pool", path: "/dashboard/job-pool", icon: Wallet },
    { name: "Timesheets", path: "/dashboard/timesheets", icon: FileText },
    { name: "Reports", path: "/dashboard/reports", icon: DollarSign },
    { name: "Marketplace", path: "/dashboard/marketplace", icon: Star },
  ];


  const sidebarItems = isRecruiter ? recruiterNav : jobSeekerNav;

  return (
    <aside className="w-[260px] bg-gray-100 border-r flex flex-col justify-between">
      <nav className="p-4">
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.name} className={`mb-1`}>
              <Link
                to={item.path}
                className={`flex items-center p-3 text-sm font-medium rounded-lg transition-colors ${isActive(item.path)
                    ? "bg-white shadow-md text-gray-900 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                  }`}>
                <item.icon className="w-5 h-5 mr-4" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
   
    </aside>
  );
};

export default DashboardSidebar;
