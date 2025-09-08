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
const ProfileLayout = lazy(() => import("./pages/Profile/ProfileLayout"));
const BasicDetails = lazy(() => import("./pages/Profile/BasicDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
                <Route path="experience" element={<div className="p-8">Experience Page - Coming Soon</div>} />
                <Route path="preferences" element={<div className="p-8">Preferences Page - Coming Soon</div>} />
                <Route path="education" element={<div className="p-8">Education Page - Coming Soon</div>} />
                <Route path="tax" element={<div className="p-8">Tax Information Page - Coming Soon</div>} />
                <Route path="social" element={<div className="p-8">Social Media Page - Coming Soon</div>} />
                <Route path="kyc" element={<div className="p-8">KYC Verification Page - Coming Soon</div>} />
                <Route path="documents" element={<div className="p-8">Documents Page - Coming Soon</div>} />
              </Route>
              
              {/* Other main routes */}
              <Route path="job-seeker" element={<div className="p-8 min-h-screen flex items-center justify-center">Job Seeker Portal - Coming Soon</div>} />
              <Route path="recruiter" element={<div className="p-8 min-h-screen flex items-center justify-center">Recruiter Portal - Coming Soon</div>} />
              <Route path="about" element={<div className="p-8 min-h-screen flex items-center justify-center">About Us - Coming Soon</div>} />
              <Route path="contact" element={<div className="p-8 min-h-screen flex items-center justify-center">Contact Us - Coming Soon</div>} />
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
