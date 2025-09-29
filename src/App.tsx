
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

// Lazy load pages
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Layouts
const DashboardLayout = lazy(() => import("./components/layout/DashboardLayout"));
const MarketplaceLayout = lazy(() => import("./components/layout/MarketplaceLayout"));
const SquadLayout = lazy(() => import("./components/layout/squad/SquadLayout"));

// Dashboard Pages
const DashboardHome = lazy(() => import("./pages/Dashboard/DashboardHome"));
const Settings = lazy(() => import("./pages/Dashboard/Settings"));
const AccountUpgrades = lazy(() => import("./pages/Dashboard/AccountUpgrades"));
const Support = lazy(() => import("./pages/Dashboard/Support"));
const Wallet = lazy(() => import("./pages/Dashboard/Wallet"));
const FindStaffPage = lazy(() => import("./pages/Dashboard/FindStaff"));
const JobPool = lazy(() => import("./pages/Dashboard/JobPool"));

// Marketplace Pages
const MarketplaceDashboard = lazy(() => import("./pages/Marketplace/Dashboard"));
const BuyNow = lazy(() => import("./pages/Marketplace/BuyNow"));
const ListNow = lazy(() => import("./pages/Marketplace/ListNow"));
const MarketplaceWallet = lazy(() => import("./pages/Marketplace/Wallet"));
const MarketplaceChat = lazy(() => import("./pages/Marketplace/Chat"));
const MarketplaceSupport = lazy(() => import("./pages/Marketplace/Support"));
import CreateNewListingForm from "./pages/Marketplace/CreateNewListingForm";
import ManageListings from "./pages/Marketplace/ManageListings";

// Profile Pages
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

// Squad Pages
const SquadDashboard = lazy(() => import("./pages/Squad/SquadDashboard"));
import SquadSettings from "./pages/Squad/SquadSettings";
import SquadChat from "./pages/Squad/SquadChat";
import SquadWallet from "./pages/Squad/SquadWallet";
import SquadProfile from "./pages/Squad/SquadProfile";

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
      {
        path: "/marketplace",
        element: <MarketplaceLayout />,
        children: [
          { index: true, element: <MarketplaceDashboard /> },
          { path: "buy", element: <BuyNow /> },
          {
            path: "list",
            element: <ListNow />,
            children: [
              { path: "new", element: <CreateNewListingForm /> },
              { path: "manage", element: <ManageListings /> },
            ]
          },
          { path: "wallet", element: <MarketplaceWallet /> },
          { path: "chat", element: <MarketplaceChat /> },
          { path: "support", element: <MarketplaceSupport /> },
        ]
      },
      {
        path: "/squad-dashboard",
        element: <SquadLayout />,
        children: [
          { index: true, element: <SquadDashboard /> },
          { path: "settings", element: <SquadSettings /> },
          { path: "chat", element: <SquadChat /> },
          { path: "wallet", element: <SquadWallet /> },
          { path: "profile", element: <SquadProfile /> },
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
