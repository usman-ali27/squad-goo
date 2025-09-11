import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/ui/LoadingSpinner";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Layout components
const DashboardLayout = lazy(() => import("./components/layout/DashboardLayout"));

// Dashboard components
const DashboardHome = lazy(() => import("./pages/Dashboard/DashboardHome"));
const Settings = lazy(() => import("./pages/Dashboard/Settings"));
const AccountUpgrades = lazy(() => import("./pages/Dashboard/AccountUpgrades"));
const Support = lazy(() => import("./pages/Dashboard/Support"));

// Profile components
const ProfileLayout = lazy(() => import("./pages/Profile/ProfileLayout"));
const BasicDetails = lazy(() => import("./pages/Profile/BasicDetails"));
const CompanyDetails = lazy(() => import("./pages/Profile/CompanyDetails"));
const JobExperience = lazy(() => import("./pages/Profile/JobExperience"));
const JobPreferences = lazy(() => import("./pages/Profile/JobPreferences"));
const Education = lazy(() => import("./pages/Profile/Education"));
const TaxInformation = lazy(() => import("./pages/Profile/TaxInformation"));
const SocialMediaLinks = lazy(() => import("./pages/Profile/SocialMediaLinks"));
const KYCVerification = lazy(() => import("./pages/Profile/KYCVerification"));
const Documents = lazy(() => import("./pages/Profile/Documents"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes with layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              
              {/* Profile routes */}
              <Route path="profile" element={<ProfileLayout />}>
                <Route index element={<BasicDetails />} />
                <Route path="company" element={<CompanyDetails />} />
                <Route path="experience" element={<JobExperience />} />
                <Route path="preferences" element={<JobPreferences />} />
                <Route path="education" element={<Education />} />
                <Route path="tax" element={<TaxInformation />} />
                <Route path="social" element={<SocialMediaLinks />} />
                <Route path="kyc" element={<KYCVerification />} />
                <Route path="documents" element={<Documents />} />
              </Route>
              
              {/* Other main routes */}
              <Route path="about" element={<div className="p-8 min-h-screen flex items-center justify-center">About Us - Coming Soon</div>} />
              <Route path="contact" element={<div className="p-8 min-h-screen flex items-center justify-center">Contact Us - Coming Soon</div>} />
            </Route>

            {/* Dashboard section with nested routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="find-jobs" element={<div className="p-8 text-center">Find Jobs Page Coming Soon</div>} />
              <Route path="find-staff" element={<div className="p-8 text-center">Find Staff Page Coming Soon</div>} />
              <Route path="job-pool" element={<div className="p-8 text-center">Job Pool Page Coming Soon</div>} />
              <Route path="applications" element={<div className="p-8 text-center">Applications Page Coming Soon</div>} />
              <Route path="candidates" element={<div className="p-8 text-center">Candidates Page Coming Soon</div>} />
              <Route path="messages" element={<div className="p-8 text-center">Messages Page Coming Soon</div>} />
              <Route path="wallet" element={<div className="p-8 text-center">Wallet Page Coming Soon</div>} />
              <Route path="settings" element={<Settings />} />
              <Route path="upgrades" element={<AccountUpgrades />} />
              <Route path="support" element={<Support />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
