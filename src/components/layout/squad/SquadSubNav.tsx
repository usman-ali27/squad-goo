
import { NavLink } from "react-router-dom";

const subNavLinks = [
  { name: "Squad Dashboard", href: "/squad-dashboard", exact: true },
  { name: "Squad Settings", href: "/squad-dashboard/settings" },
  { name: "Squad Chat", href: "/squad-dashboard/chat" },
  { name: "Squad Wallet", href: "/squad-dashboard/wallet" },
  { name: "Squad Profile", href: "/squad-dashboard/profile" },
];

const SquadSubNav = () => {
  return (
    <nav className="max-w-7xl my-4 rounded-md  bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start h-14">
          <div className="flex space-x-2">
            {subNavLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                end={link.exact}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SquadSubNav;
