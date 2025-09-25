import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "/assets/images/logo.png";
import { AiOutlineDashboard, AiOutlineSearch } from 'react-icons/ai';
import { BsCartCheck, BsListCheck, BsChatDots, BsBell } from 'react-icons/bs';
import { BiSupport } from 'react-icons/bi';
import { IoWalletOutline, IoExitOutline } from 'react-icons/io5';
import { FaBars, FaTimes } from 'react-icons/fa';

const MarketplaceHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-3 gap-2 ${
      isActive
        ? "bg-purple-600 text-white hover:bg-purple-700"
        : ""
    }`;

  const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block text-center text-lg py-2 rounded-md transition-colors ${
      isActive
        ? "bg-purple-600 text-white"
        : "text-gray-800 hover:bg-gray-200"
    }`;

  return (
    <header className="bg-white shadow-md px-4 sm:px-6 py-3 relative z-20">
      <div className="flex items-center justify-between">
        <Link to="/marketplace">
          <img src={logo} alt="SquadGoo Logo" className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/marketplace" end className={getNavLinkClass}>
            <AiOutlineDashboard /> Dashboard
          </NavLink>
          <NavLink
            to="/marketplace/buy"
            end
            className={getNavLinkClass}
          >
            <BsCartCheck /> BUY NOW
          </NavLink>
          <NavLink to="/marketplace/list" className={getNavLinkClass}>
            <BsListCheck /> List Now
          </NavLink>
          <NavLink to="/marketplace/wallet" end className={getNavLinkClass}>
            <IoWalletOutline /> Wallet
          </NavLink>
          <NavLink to="/marketplace/chat" end className={getNavLinkClass}>
            <BsChatDots /> Chat <span className="bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </NavLink>
          <NavLink to="/marketplace/support" end className={getNavLinkClass}>
            <BiSupport /> Support
          </NavLink>
        </nav>

        {/* Right side icons and hamburger menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative hidden sm:block">
            <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search items.." className="pl-10 w-48 lg:w-64" />
          </div>
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <BsBell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
          <Button variant="destructive" size="sm" asChild className="hidden sm:flex">
            <Link to="/" className="flex items-center gap-2">
              <IoExitOutline /> Exit
            </Link>
          </Button>
          <div className="md:hidden">
            <Button onClick={() => setIsMobileMenuOpen(true)} variant="ghost" size="icon">
              <FaBars className="h-6 w-6 text-gray-700" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-in-out md:hidden ${ 
          isMobileMenuOpen ? "bg-opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 flex flex-col p-4 transform transition-transform duration-300 ease-in-out md:hidden ${ 
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <img src={logo} alt="SquadGoo Logo" className="h-10" />
          <Button onClick={() => setIsMobileMenuOpen(false)} variant="ghost" size="icon">
            <FaTimes className="h-7 w-7 text-gray-800" />
          </Button>
        </div>
        <nav className="flex flex-col gap-4" onClick={() => setIsMobileMenuOpen(false)}>
          <NavLink to="/marketplace" end className={getMobileNavLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/marketplace/buy" end className={({ isActive }) => `block text-center text-lg py-2 rounded-md transition-colors text-white ${isActive ? "bg-purple-600" : "bg-orange-500"}`}>
            BUY NOW
          </NavLink>
          <NavLink to="/marketplace/list" className={getMobileNavLinkClass}>
            List Now
          </NavLink>
          <NavLink to="/marketplace/wallet" end className={getMobileNavLinkClass}>
            Wallet
          </NavLink>
          <NavLink to="/marketplace/chat" end className={getMobileNavLinkClass}>
            Chat
          </NavLink>
          <NavLink to="/marketplace/support" end className={getMobileNavLinkClass}>
            Support
          </NavLink>
          <div className="border-t border-gray-200 my-4"></div>
          <Button variant="destructive" size="lg" asChild>
            <Link to="/" className="flex items-center justify-center gap-2">
              <IoExitOutline /> Exit
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default MarketplaceHeader;
