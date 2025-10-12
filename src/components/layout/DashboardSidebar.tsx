
import { NavLink } from "react-router-dom";
import { Home, DollarSign, Settings, LifeBuoy, MessageSquare, Wallet, Users, Briefcase, BarChart2, Star, FileText } from "lucide-react";
import { useUser } from "@/stores/authStore";

interface DashboardSidebarProps {
  isOpen: boolean;
}

const DashboardSidebar = ({ isOpen }: DashboardSidebarProps) => {
  const user = useUser();
  const isRecruiter = user?.role === 'recruiter';

  const recruiterNav = [
    { name: "Dashboard", path: "/dashboard", icon: Home, end: true },
    { name: "Find Staff", path: "/dashboard/find-staff", icon: Users },
    { name: "Applications", path: "/dashboard/applications", icon: FileText },
    { name: "Candidates", path: "/dashboard/candidates", icon: Users },
    { name: "Chat", path: "/dashboard/chat", icon: MessageSquare },
    { name: "Wallet", path: "/dashboard/wallet", icon: Wallet },
    { name: "Account Upgrade", path: "/dashboard/upgrades", icon: Star },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
    { name: "Support", path: "/dashboard/support", icon: LifeBuoy },
  ];

  const jobSeekerNav = [
    { name: "Dashboard", path: "/dashboard", icon: Home, end: true },
    { name: "Find Jobs", path: "/dashboard/find-jobs", icon: Briefcase },
    { name: "Job Pool", path: "/dashboard/job-pool", icon: Briefcase },
    { name: "Applications", path: "/dashboard/applications", icon: FileText },
    { name: "Chat", path: "/dashboard/chat", icon: MessageSquare },
    { name: "Wallet", path: "/dashboard/wallet", icon: Wallet },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
    { name: "Support", path: "/dashboard/support", icon: LifeBuoy },
  ];

  const sidebarItems = isRecruiter ? recruiterNav : jobSeekerNav;

  return (
    <aside className={`w-[260px] bg-gray-100 border-r flex-col justify-between md:flex ${isOpen ? 'flex' : 'hidden'}`}>
      <nav className="p-4">
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.name} className={`mb-1`}>
              <NavLink
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center p-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-white shadow-md text-gray-900 font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }>
                <item.icon className="w-5 h-5 mr-4" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
   
    </aside>
  );
};

export default DashboardSidebar;
