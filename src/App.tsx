import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import ErrorFallback from "./components/ui/ErrorFallback";
import PrivateRoute from "./components/ui/PrivateRoute";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Layout components
const DashboardLayout = lazy(() => import("./components/layout/DashboardLayout"));
// Dashboard components
const DashboardHome = lazy(() => import("./pages/Dashboard/DashboardHome"));
import Settings from "./pages/Dashboard/Settings";
import AccountUpgrades from "./pages/Dashboard/AccountUpgrades";
import Support from "./pages/Dashboard/Support";
import Wallet from "./pages/Dashboard/Wallet";
import FindStaffPage from "./pages/Dashboard/FindStaff";
import JobPool from "./pages/Dashboard/JobPool";
// Profile components
import ProfileLayout from "./pages/Profile/ProfileLayout";
import BasicDetails from "./pages/Profile/BasicDetails";
import CompanyDetails from "./pages/Profile/CompanyDetails";
import JobExperience from "./pages/Profile/JobExperience";
import JobPreferences from "./pages/Profile/JobPreferences";
import Education from "./pages/Profile/Education";
import TaxInformation from "./pages/Profile/TaxInformation";
import SocialMediaLinks from "./pages/Profile/SocialMediaLinks";
import KYCVerification from "./pages/Profile/KYCVerification";
import Documents from "./pages/Profile/Documents";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "profile",
        element: <ProfileLayout />,
        children: [
          { index: true, element: <BasicDetails /> },
          { path: "company", element: <CompanyDetails /> },
          { path: "experience", element: <JobExperience /> },
          { path: "preferences", element: <JobPreferences /> },
          { path: "education", element: <Education /> },
          { path: "tax", element: <TaxInformation /> },
          { path: "social", element: <SocialMediaLinks /> },
          { path: "kyc", element: <KYCVerification /> },
          { path: "documents", element: <Documents /> },
        ],
      },
      {
        path: "about",
        element: <div className="p-8 min-h-screen flex items-center justify-center">About Us - Coming Soon</div>,
      },
      {
        path: "contact",
        element: <div className="p-8 min-h-screen flex items-center justify-center">Contact Us - Coming Soon</div>,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "find-jobs", element: <div className="p-8 text-center">Find Jobs Page Coming Soon</div> },
          { path: "find-staff", element: <FindStaffPage />},
          { path: "job-pool", element: <JobPool /> },
          { path: "applications", element: <div className="p-8 text-center">Applications Page Coming Soon</div> },
          { path: "candidates", element: <div className="p-8 text-center">Candidates Page Coming Soon</div> },
          { path: "chat", element: <div className="p-8 text-center">Messages Page Coming Soon</div> },
          { path: "wallet", element: <Wallet /> },
          { path: "settings", element: <Settings /> },
          { path: "upgrades", element: <AccountUpgrades /> },
          { path: "support", element: <Support /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner text="Loading..." />}>
          <RouterProvider router={router} />
        </Suspense>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
